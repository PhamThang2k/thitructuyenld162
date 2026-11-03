/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question, Candidate, AnswerRecord, SubmissionResult, LeaderboardEntry, WeekId } from '../types';
import { MOCK_QUESTIONS, MOCK_LEADERBOARD, WEEKS_DATA } from '../data/mockData';

const GAS_URL_STORAGE_KEY = 'ld162_gas_webapp_url';
const LOCAL_RESULTS_KEY = 'ld162_local_submissions';

export function getGasWebAppUrl(): string {
  return localStorage.getItem(GAS_URL_STORAGE_KEY) || localStorage.getItem('baocaovien_gas_webapp_url') || '';
}

export function setGasWebAppUrl(url: string): void {
  const trimmed = url.trim();
  if (trimmed) {
    localStorage.setItem(GAS_URL_STORAGE_KEY, trimmed);
  } else {
    localStorage.removeItem(GAS_URL_STORAGE_KEY);
    localStorage.removeItem('baocaovien_gas_webapp_url');
  }
}

/**
 * Kiểm tra kết nối tới GAS Web App
 */
export async function testGasConnection(url?: string): Promise<{ success: boolean; message: string; latencyMs?: number }> {
  const targetUrl = url || getGasWebAppUrl();
  if (!targetUrl) {
    return {
      success: false,
      message: 'Chưa cấu hình URL Google Apps Script Web App.'
    };
  }

  const start = Date.now();
  try {
    const pingUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}action=ping&_t=${Date.now()}`;
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const latencyMs = Date.now() - start;
    if (!response.ok) {
      return {
        success: false,
        message: `Máy chủ trả về mã lỗi HTTP ${response.status}`,
        latencyMs
      };
    }

    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        message: data.message || 'Kết nối Google Apps Script thành công!',
        latencyMs
      };
    } else {
      return {
        success: false,
        message: data.error || 'Google Apps Script trả về lỗi logic.',
        latencyMs
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message?.includes('Failed to fetch')
        ? 'Không thể kết nối (CORS hoặc URL chưa bật quyền "Anyone / Bất kỳ ai"). Hãy kiểm tra lại phân quyền deploy!'
        : `Lỗi kết nối: ${error.message || 'Không xác định'}`
    };
  }
}

/**
 * Tự động yêu cầu GAS tạo bảng tính mẫu
 */
export async function requestInitSheets(url?: string): Promise<{ success: boolean; message: string }> {
  const targetUrl = url || getGasWebAppUrl();
  if (!targetUrl) {
    return { success: false, message: 'Vui lòng nhập URL Google Apps Script trước!' };
  }

  try {
    const initUrl = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}action=initSheets&_t=${Date.now()}`;
    const response = await fetch(initUrl);
    const data = await response.json();
    return {
      success: data.success,
      message: data.message || data.details || 'Khởi tạo thành công!'
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Lỗi khởi tạo sheet: ${error.message}`
    };
  }
}

/**
 * Lấy danh sách câu hỏi cho tuần thi
 */
export async function fetchQuestions(weekId: WeekId): Promise<{ questions: Question[]; fromLiveGas: boolean }> {
  const gasUrl = getGasWebAppUrl();

  if (gasUrl) {
    try {
      const url = `${gasUrl}${gasUrl.includes('?') ? '&' : '?'}action=getQuestions&week=${weekId}&_t=${Date.now()}`;
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.questions) && json.questions.length > 0) {
          return {
            questions: json.questions,
            fromLiveGas: true
          };
        }
      }
    } catch (err) {
      console.warn('Lỗi tải câu hỏi từ GAS Web App, chuyển sang ngân hàng dự phòng:', err);
    }
  }

  // Fallback sang ngân hàng câu hỏi tích hợp sẵn
  const fallback = MOCK_QUESTIONS[weekId] || MOCK_QUESTIONS['Tuan_1'] || [];
  return {
    questions: fallback,
    fromLiveGas: false
  };
}

/**
 * Nộp bài thi
 */
export async function submitQuizAnswers(params: {
  weekId: WeekId;
  candidate: Candidate;
  answers: AnswerRecord;
  timeTakenSeconds: number;
  questions: Question[];
}): Promise<SubmissionResult> {
  const { weekId, candidate, answers, timeTakenSeconds, questions } = params;
  const gasUrl = getGasWebAppUrl();
  const weekInfo = WEEKS_DATA.find(w => w.id === weekId);
  const weekTitle = weekInfo ? weekInfo.title : weekId;
  const rawPred = answers[21] !== undefined ? answers[21] : answers[20];
  const predictedCorrectAnswers = rawPred ? parseInt(String(rawPred), 10) || 0 : undefined;

  // Nếu có cấu hình GAS URL, thử nộp bài qua GAS để ghi vào Google Sheet
  if (gasUrl) {
    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' // GAS Web App hoạt động tốt nhất với text/plain tránh CORS preflight OPTIONS
        },
        body: JSON.stringify({
          week: weekId,
          candidate,
          answers,
          timeTakenSeconds,
          predictedCorrectAnswers,
          predictedParticipants: predictedCorrectAnswers // Tương thích ngược
        })
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.result) {
          const res = json.result;
          const finalResult: SubmissionResult = {
            candidate,
            weekId,
            weekTitle,
            score: res.score,
            maxScore: res.maxScore || 100,
            correctCount: res.correctCount,
            totalQuestions: res.totalQuestions || 21,
            timeTakenSeconds: res.timeTakenSeconds,
            submittedAt: res.submittedAt || new Date().toLocaleString('vi-VN'),
            predictedCorrectAnswers: res.predictedCorrectAnswers || res.predictedParticipants || predictedCorrectAnswers,
            rank: res.rank,
            reviews: res.reviews,
            syncedToGoogleSheet: true
          };
          saveLocalSubmission(finalResult);
          return finalResult;
        }
      }
    } catch (e) {
      console.warn('Không thể gửi bài lên GAS, chuyển sang chấm điểm cục bộ:', e);
    }
  }

  // Chấm điểm cục bộ khi không có GAS hoặc khi GAS bị lỗi mạng
  let correctCount = 0;
  const choiceQuestions = questions.filter(q => q.type !== 'prediction');
  
  const reviews = questions.map(q => {
    if (q.type === 'prediction' || q.id === 21) {
      const predVal = answers[q.id] ? parseInt(String(answers[q.id]), 10) || 0 : 0;
      return {
        questionId: q.id,
        question: q.question,
        type: 'prediction' as const,
        userAnswer: `${predVal.toLocaleString('vi-VN')} người`,
        correctAnswer: 'Số lượng thực tế do BTC công bố',
        isCorrect: true,
        predictedValue: predVal,
        explanation: q.explanation || 'Câu dự đoán số người trả lời đúng 20 câu trắc nghiệm dùng để xếp hạng phân định giải thưởng.'
      };
    }

    const userAns = answers[q.id];
    const correctAns = q.correctOption || 'A';
    const isCorrect = userAns === correctAns;
    if (isCorrect) correctCount++;
    return {
      questionId: q.id,
      question: q.question,
      type: 'choice' as const,
      options: q.options,
      userAnswer: userAns,
      correctAnswer: correctAns,
      isCorrect,
      explanation: q.explanation || 'Đáp án chính xác theo tài liệu Lịch sử truyền thống Lữ đoàn 162 (Vùng 4 Hải quân).'
    };
  });

  const totalChoiceQuestions = choiceQuestions.length > 0 ? choiceQuestions.length : 20;
  const score = Math.round((correctCount / totalChoiceQuestions) * 100);
  const now = new Date();
  const submittedAt = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN')}`;

  const localResult: SubmissionResult = {
    candidate,
    weekId,
    weekTitle,
    score,
    maxScore: 100,
    correctCount,
    totalQuestions: questions.length,
    timeTakenSeconds,
    submittedAt,
    predictedCorrectAnswers,
    reviews,
    rank: estimateRank(weekId, score, timeTakenSeconds),
    syncedToGoogleSheet: false
  };

  saveLocalSubmission(localResult);
  return localResult;
}

/**
 * Lấy bảng xếp hạng (kết hợp dữ liệu từ GAS nếu có + dữ liệu mẫu và nộp gần đây)
 */
export async function fetchLeaderboard(weekId: WeekId): Promise<LeaderboardEntry[]> {
  const gasUrl = getGasWebAppUrl();

  if (gasUrl) {
    try {
      const url = `${gasUrl}${gasUrl.includes('?') ? '&' : '?'}action=getLeaderboard&week=${weekId}&_t=${Date.now()}`;
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.leaderboard) && json.leaderboard.length > 0) {
          return json.leaderboard;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc bảng xếp hạng từ GAS, dùng dữ liệu mẫu:', e);
    }
  }

  // Kết hợp mock data và bài thi vừa nộp cục bộ
  const localList = getLocalSubmissions().filter(s => s.weekId === weekId);
  const localEntries: LeaderboardEntry[] = localList.map((s, idx) => ({
    rank: idx + 1,
    fullName: s.candidate.fullName,
    unit: s.candidate.unit,
    score: s.score,
    correctCount: s.correctCount,
    totalQuestions: s.totalQuestions,
    timeTakenSeconds: s.timeTakenSeconds,
    submittedAt: s.submittedAt,
    weekId: s.weekId,
    predictedCorrectAnswers: s.predictedCorrectAnswers || (s as any).predictedParticipants
  }));

  const mockFiltered = MOCK_LEADERBOARD.filter(m => m.weekId === weekId);
  const combined = [...localEntries, ...mockFiltered];

  // Sắp xếp điểm cao -> thấp, thời gian ít -> nhiều
  combined.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTakenSeconds - b.timeTakenSeconds;
  });

  // Đánh lại rank 1..N
  return combined.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

function saveLocalSubmission(result: SubmissionResult) {
  try {
    const list = getLocalSubmissions();
    list.unshift(result);
    localStorage.setItem(LOCAL_RESULTS_KEY, JSON.stringify(list.slice(0, 30)));
  } catch (e) {
    console.error('Không thể lưu kết quả vào localStorage:', e);
  }
}

export function getLocalSubmissions(): SubmissionResult[] {
  try {
    const raw = localStorage.getItem(LOCAL_RESULTS_KEY) || localStorage.getItem('baocaovien_local_submissions');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function clearLocalSubmissions(): void {
  localStorage.removeItem(LOCAL_RESULTS_KEY);
  localStorage.removeItem('baocaovien_local_submissions');
}

function estimateRank(weekId: WeekId, score: number, timeTakenSeconds: number): number {
  const mockEntries = MOCK_LEADERBOARD.filter(m => m.weekId === weekId);
  let countBetter = 0;
  for (const m of mockEntries) {
    if (m.score > score || (m.score === score && m.timeTakenSeconds < timeTakenSeconds)) {
      countBetter++;
    }
  }
  return countBetter + 1;
}
