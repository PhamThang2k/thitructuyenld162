/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WeekId = 'Tuan_1' | 'Tuan_2' | 'Tuan_3' | 'Tuan_4';

export type WeekStatus = 'open' | 'upcoming' | 'closed';

export interface WeekInfo {
  id: WeekId;
  weekNumber: number;
  title: string;
  theme: string;
  startDate: string;
  endDate: string;
  status: WeekStatus;
  timeLimitMinutes: number;
  totalQuestions: number; // 21 câu (20 câu trắc nghiệm + 1 câu dự đoán)
  bannerSubtitle: string;
}

export type QuestionType = 'choice' | 'prediction';

export interface Question {
  id: number;
  question: string;
  type?: QuestionType; // 'choice' (câu 1-20) hoặc 'prediction' (câu 21)
  options?: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption?: 'A' | 'B' | 'C' | 'D'; // Server-side or client fallback
  explanation?: string;
  topic?: string;
  predictionPrompt?: string;
}

export interface Candidate {
  fullName: string;
  unit: string;
  phoneOrId: string;
}

export interface AnswerRecord {
  [questionId: number]: string; // 'A' | 'B' | 'C' | 'D' hoặc số người dự đoán cho câu 21
}

export interface ExamReviewItem {
  questionId: number;
  question: string;
  type?: QuestionType;
  options?: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  userAnswer?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
  explanation?: string;
  predictedValue?: number;
}

export interface SubmissionResult {
  candidate: Candidate;
  weekId: WeekId;
  weekTitle: string;
  score: number;
  maxScore: number;
  correctCount: number; // Trên 20 câu trắc nghiệm
  totalQuestions: number; // 21 câu
  timeTakenSeconds: number;
  submittedAt: string;
  predictedCorrectAnswers?: number; // Số người dự đoán trả lời đúng (Câu 21)
  predictedParticipants?: number; // Alias tương thích ngược
  reviews?: ExamReviewItem[];
  rank?: number;
  syncedToGoogleSheet: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  fullName: string;
  unit: string;
  score: number;
  correctCount: number; // Trên 20 câu
  totalQuestions: number;
  timeTakenSeconds: number;
  submittedAt: string;
  weekId: WeekId;
  predictedCorrectAnswers?: number; // Số người dự đoán trả lời đúng (Câu 21)
  predictedParticipants?: number; // Alias tương thích ngược
}

export interface GasApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
