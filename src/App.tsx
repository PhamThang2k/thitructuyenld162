/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WeekTabs } from './components/WeekTabs';
import { RegistrationCard } from './components/RegistrationCard';
import { QuizExam } from './components/QuizExam';
import { ResultView } from './components/ResultView';
import { ExamHistory } from './components/ExamHistory';
import { GasGuideModal } from './components/GasGuideModal';
import { WEEKS_DATA, CONTEST_CONFIG } from './data/mockData';
import { 
  WeekId, 
  WeekInfo, 
  Candidate, 
  Question, 
  AnswerRecord, 
  SubmissionResult 
} from './types';
import { 
  fetchQuestions, 
  submitQuizAnswers, 
  getGasWebAppUrl 
} from './services/gasApi';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'exam' | 'history'>('exam');
  const [selectedWeekId, setSelectedWeekId] = useState<WeekId>('Tuan_1');
  const [examStatus, setExamStatus] = useState<'ready' | 'taking' | 'result'>('ready');
  
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<SubmissionResult | null>(null);
  
  const [isGasModalOpen, setIsGasModalOpen] = useState<boolean>(false);
  const [gasUrlConfigured, setGasUrlConfigured] = useState<boolean>(false);

  useEffect(() => {
    setGasUrlConfigured(Boolean(getGasWebAppUrl()));
  }, []);

  const currentWeek = WEEKS_DATA.find(w => w.id === selectedWeekId) || WEEKS_DATA[0];

  // Bắt đầu làm bài thi
  const handleStartExam = async (candidate: Candidate) => {
    setIsLoadingQuestions(true);
    setCurrentCandidate(candidate);

    try {
      const { questions } = await fetchQuestions(selectedWeekId);
      setCurrentQuestions(questions);
      setExamStatus('taking');
    } catch (e) {
      console.error('Lỗi chuẩn bị đề thi:', e);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Nộp bài thi
  const handleSubmitExam = async (answers: AnswerRecord, timeTakenSeconds: number) => {
    if (!currentCandidate) return;
    setIsSubmitting(true);

    try {
      const result = await submitQuizAnswers({
        weekId: selectedWeekId,
        candidate: currentCandidate,
        answers,
        timeTakenSeconds,
        questions: currentQuestions
      });

      setCurrentResult(result);
      setExamStatus('result');
    } catch (e) {
      console.error('Lỗi nộp bài thi:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thi lại
  const handleRetake = () => {
    setExamStatus('ready');
    setCurrentResult(null);
  };

  // Chuyển tuần
  const handleSelectWeek = (weekId: WeekId) => {
    if (examStatus === 'taking') {
      if (!window.confirm('Đồng chí đang trong quá trình làm bài thi. Chuyển tuần khác sẽ hủy bài thi hiện tại. Đồng chí có chắc chắn?')) {
        return;
      }
    }
    setSelectedWeekId(weekId);
    setExamStatus('ready');
    setCurrentResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Be_Vietnam_Pro',sans-serif]">
      {/* Official Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (examStatus === 'taking') {
            if (!window.confirm('Đồng chí đang làm bài thi. Rời trang sẽ làm gián đoạn thời gian làm bài!')) {
              return;
            }
          }
          setCurrentTab(tab);
        }}
        onOpenGasModal={() => setIsGasModalOpen(true)}
        isExamInProgress={examStatus === 'taking'}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-16">
        {currentTab === 'exam' && (
          <div className="space-y-6">
            {/* Week navigation (only when not actively in exam) */}
            {examStatus !== 'taking' && (
              <WeekTabs
                weeks={WEEKS_DATA}
                selectedWeekId={selectedWeekId}
                onSelectWeek={handleSelectWeek}
                disabled={false}
              />
            )}

            {/* Sub-view: Ready / Register */}
            {examStatus === 'ready' && (
              <RegistrationCard
                week={currentWeek}
                onStartExam={handleStartExam}
                isLoadingQuestions={isLoadingQuestions}
              />
            )}

            {/* Sub-view: Taking exam */}
            {examStatus === 'taking' && currentCandidate && (
              <QuizExam
                week={currentWeek}
                questions={currentQuestions}
                candidate={currentCandidate}
                onSubmit={handleSubmitExam}
                isSubmitting={isSubmitting}
              />
            )}

            {/* Sub-view: Result & Certificate */}
            {examStatus === 'result' && currentResult && (
              <ResultView
                result={currentResult}
                onRetake={handleRetake}
                onViewHistory={() => setCurrentTab('history')}
                onSwitchWeek={() => {
                  setExamStatus('ready');
                  setCurrentResult(null);
                }}
              />
            )}
          </div>
        )}

        {currentTab === 'history' && (
          <ExamHistory
            onSelectResult={(res) => {
              setCurrentResult(res);
              setSelectedWeekId(res.weekId);
              setExamStatus('result');
              setCurrentTab('exam');
            }}
            onGoToContest={() => {
              setCurrentTab('exam');
              setExamStatus('ready');
            }}
          />
        )}
      </main>

      {/* Google Apps Script Integration Modal */}
      <GasGuideModal
        isOpen={isGasModalOpen}
        onClose={() => setIsGasModalOpen(false)}
        onSaved={() => {
          setGasUrlConfigured(Boolean(getGasWebAppUrl()));
        }}
      />

      {/* Official Institutional Footer */}
      <footer className="bg-[#0B2545] text-slate-300 border-t-4 border-[#D4AF37] py-6 px-4 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-bold text-amber-300 uppercase tracking-wider text-sm">
              {CONTEST_CONFIG.title}
            </div>
            <p className="text-amber-200/90 font-medium">
              Cơ quan chỉ đạo: Bộ Tư lệnh Vùng 4 Hải quân • Đơn vị tổ chức: Lữ đoàn 162 ("Lữ đoàn Thép")
            </p>
            <p className="text-slate-400 text-[11px]">
              Khẩu hiệu: <strong className="text-amber-300">"{CONTEST_CONFIG.traditionMotto}"</strong>
            </p>
            <p className="text-slate-500 text-[11px]">
              Tích hợp Google Sheets API qua Google Apps Script Web App (Bảo mật chấm điểm tại máy chủ).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setIsGasModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-900/80 hover:bg-blue-800 text-amber-300 font-bold border border-blue-700 transition-all cursor-pointer"
            >
              Xem hướng dẫn & Mã nguồn GAS
            </button>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 font-mono">Bản quyền © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
