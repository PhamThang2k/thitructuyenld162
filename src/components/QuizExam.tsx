/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  User, 
  Building2, 
  Info,
  HelpCircle,
  RotateCcw,
  Users,
  Sparkles
} from 'lucide-react';
import { Question, Candidate, AnswerRecord, WeekInfo } from '../types';

interface QuizExamProps {
  week: WeekInfo;
  questions: Question[];
  candidate: Candidate;
  onSubmit: (answers: AnswerRecord, timeTakenSeconds: number) => void;
  isSubmitting: boolean;
}

export const QuizExam: React.FC<QuizExamProps> = ({
  week,
  questions,
  candidate,
  onSubmit,
  isSubmitting
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerRecord>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  
  // Total seconds calculation (e.g. 20 mins = 1200s)
  const totalDurationSeconds = (week.timeLimitMinutes || 20) * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalDurationSeconds);
  const [timeTakenSeconds, setTimeTakenSeconds] = useState<number>(0);

  const storageKey = `ld162_draft_${week.id}_${candidate.phoneOrId || candidate.fullName}`;

  // Restore draft state from localStorage if available
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.flagged) setFlagged(parsed.flagged);
        if (parsed.secondsRemaining && parsed.secondsRemaining > 0) {
          setSecondsRemaining(parsed.secondsRemaining);
          setTimeTakenSeconds(totalDurationSeconds - parsed.secondsRemaining);
        }
      }
    } catch (e) {
      console.warn('Không thể đọc draft từ localStorage:', e);
    }
  }, [storageKey, totalDurationSeconds]);

  // Save draft periodically
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        answers,
        flagged,
        secondsRemaining,
        lastUpdated: Date.now()
      }));
    } catch (e) {
      // Storage error
    }
  }, [answers, flagged, secondsRemaining, storageKey]);

  // Handle countdown timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
      setTimeTakenSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const handleFinalSubmit = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {}
    setShowSubmitModal(false);
    onSubmit(answers, timeTakenSeconds);
  }, [answers, timeTakenSeconds, onSubmit, storageKey]);

  // Select an option or update prediction value
  const handleSelectOption = (value: string) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  // Toggle flag
  const handleToggleFlag = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setFlagged(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Current question
  const currentQ = questions[currentIndex] || questions[0];

  // Keyboard navigation shortcuts (disabled when user is in input box or modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSubmitModal) return;

      // Don't hijack keystrokes if typing inside prediction number input
      if (currentQ?.type === 'prediction' && (e.target as HTMLElement)?.tagName === 'INPUT') {
        return;
      }

      const key = e.key.toUpperCase();
      if (currentQ?.type !== 'prediction') {
        if (['A', 'B', 'C', 'D'].includes(key)) {
          handleSelectOption(key);
        } else if (key === '1') {
          handleSelectOption('A');
        } else if (key === '2') {
          handleSelectOption('B');
        } else if (key === '3') {
          handleSelectOption('C');
        } else if (key === '4') {
          handleSelectOption('D');
        }
      }

      if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, showSubmitModal, currentQ]);

  // Count answered questions (non-empty string)
  const answeredCount = Object.values(answers).filter(v => v !== undefined && String(v).trim() !== '').length;
  const totalCount = questions.length;
  const progressPercent = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;
  const unansweredCount = totalCount - answeredCount;

  // Remaining time
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isUrgent = secondsRemaining < 120; // Dưới 2 phút

  // Check prediction answer for Question 21 (or fallback 20)
  const predictionAnswer = answers[21] || answers[20];

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {/* Top Sticky Bar: Timer, Candidate Info & Progress */}
      <div className="sticky top-2 z-30 bg-[#0B2545] text-white rounded-xl shadow-xl border-2 border-amber-500/80 p-3 md:p-4 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Candidate badge */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm shadow">
                {candidate.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-xs md:text-sm font-bold text-amber-200 line-clamp-1">
                  {candidate.fullName}
                </div>
                <div className="text-[11px] text-slate-300 flex items-center gap-1 line-clamp-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>{candidate.unit}</span>
                </div>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nộp bài</span>
              </button>
            </div>
          </div>

          {/* Center: Progress Bar */}
          <div className="w-full md:max-w-xs flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Tiến độ làm bài:</span>
              <span className="font-bold text-amber-300">{answeredCount}/{totalCount} câu ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-blue-950 rounded-full overflow-hidden border border-blue-900">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Right: Countdown Timer & Submit Button */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono font-bold text-base md:text-lg border ${
              isUrgent
                ? 'bg-red-600/90 text-white border-red-400 animate-pulse'
                : 'bg-blue-950/90 text-amber-300 border-amber-500/50'
            }`}>
              <Clock className={`w-5 h-5 ${isUrgent ? 'text-white' : 'text-amber-400'}`} />
              <span>{formattedTime}</span>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              disabled={isSubmitting}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all border border-red-400 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'ĐANG NỘP...' : 'NỘP BÀI THI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Question Area (Col 8) & Question Palette (Col 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question Card & Navigation */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            {/* Question Card Header */}
            <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`font-extrabold text-xs px-2.5 py-1 rounded ${
                  currentQ.type === 'prediction'
                    ? 'bg-gradient-to-r from-amber-500 to-red-600 text-slate-950 font-black'
                    : 'bg-[#0B2545] text-amber-300'
                }`}>
                  CÂU HỎI {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                  {currentQ.type === 'prediction' && ' (CÂU DỰ ĐOÁN)'}
                </span>

                {currentQ.topic && (
                  <span className="text-[11px] font-semibold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200 hidden sm:inline">
                    {currentQ.topic}
                  </span>
                )}
              </div>

              {/* Bookmark / Flag Button */}
              <button
                onClick={handleToggleFlag}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  flagged[currentQ.id]
                    ? 'bg-amber-100 text-amber-900 border-amber-400'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? 'fill-amber-500 text-amber-600' : ''}`} />
                <span>{flagged[currentQ.id] ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</span>
              </button>
            </div>

            {/* Question Body */}
            <div className="p-6 md:p-8 space-y-6">
              <h3 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* CASE 1: PREDICTION QUESTION (Câu 21) */}
              {currentQ.type === 'prediction' ? (
                <div className="space-y-4 bg-amber-50/60 p-6 rounded-2xl border-2 border-amber-300">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>CÂU DỰ ĐOÁN SỐ NGƯỜI TRẢ LỜI ĐÚNG 20 CÂU TRẮC NGHIỆM (CÂU PHỤ PHÂN ĐỊNH THỨ HẠNG)</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dự đoán tổng số cán bộ, chiến sĩ và đoàn viên trả lời đúng tất cả 20 câu hỏi trắc nghiệm kiến thức trong tuần thi này. Con số dự đoán này là tiêu chí phụ đặc biệt quan trọng để Ban Tổ chức và Google Sheets tự động xếp hạng phân định giải thưởng khi các bài thi có cùng điểm số và thời gian làm bài.
                  </p>

                  <div className="max-w-md space-y-3 pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                      Dự đoán của đồng chí (Số người trả lời đúng 20/20 câu):
                    </label>
                    <div className="relative">
                      <Users className="w-5 h-5 text-amber-600 absolute left-3.5 top-3.5" />
                      <input
                        type="number"
                        min="1"
                        max="100000"
                        value={answers[currentQ.id] || ''}
                        onChange={(e) => handleSelectOption(e.target.value)}
                        placeholder="Ví dụ: 125"
                        className="w-full pl-11 pr-4 py-3 text-lg font-bold font-mono text-[#0B2545] border-2 border-amber-400 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-[#0B2545] outline-none bg-white shadow-inner"
                        autoFocus
                      />
                    </div>

                    {/* Quick Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
                      <span className="text-slate-500 font-medium">Chọn nhanh:</span>
                      {[50, 100, 125, 150, 200, 250].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleSelectOption(String(val))}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-100 text-slate-700 font-mono font-bold transition-all cursor-pointer text-xs"
                        >
                          {val.toLocaleString('vi-VN')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* CASE 2: STANDARD MULTIPLE CHOICE (Câu 1 - 20) */
                <div className="space-y-3">
                  {currentQ.options && (['A', 'B', 'C', 'D'] as const).map((key) => {
                    const optionText = currentQ.options?.[key];
                    if (!optionText) return null;
                    const isSelected = answers[currentQ.id] === key;

                    return (
                      <button
                        key={key}
                        onClick={() => handleSelectOption(key)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 cursor-pointer relative group ${
                          isSelected
                            ? 'bg-blue-50/80 border-[#133E87] shadow-md ring-1 ring-[#133E87]'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                        }`}
                      >
                        {/* Letter Badge */}
                        <div className={`w-8 h-8 rounded-full font-black text-sm flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-[#0B2545] text-amber-300 shadow'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                        }`}>
                          {key}
                        </div>

                        {/* Option Text */}
                        <div className="flex-1 text-sm md:text-base font-medium text-slate-800 pt-0.5 leading-relaxed">
                          {optionText}
                        </div>

                        {/* Selected Radio Indicator */}
                        <div className="shrink-0 pt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[#0B2545] bg-[#0B2545]'
                              : 'border-slate-300 group-hover:border-slate-400'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-bold border transition-all ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-slate-400 border-slate-200'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 cursor-pointer shadow-sm'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
                {currentQ.type !== 'prediction' ? (
                  <>
                    <span>Phím tắt:</span>
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-bold">1/2/3/4</span>
                    <span>hoặc</span>
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-bold">A/B/C/D</span>
                  </>
                ) : (
                  <span className="text-amber-700 font-medium">Nhập số người dự đoán và bấm nộp bài</span>
                )}
              </div>

              {currentIndex < totalCount - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(totalCount - 1, prev + 1))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-bold bg-[#133E87] hover:bg-[#0B2545] text-white transition-all shadow-sm cursor-pointer"
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-black bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white transition-all shadow-md cursor-pointer animate-pulse-gold"
                >
                  <Send className="w-4 h-4" />
                  <span>Nộp bài ngay</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden sticky top-24">
            <div className="bg-[#0B2545] text-white px-4 py-3 border-b-2 border-amber-500 flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-200">
                BẢN ĐỒ CÂU HỎI (21 CÂU)
              </h4>
              <span className="text-xs font-mono text-amber-400">
                {answeredCount}/{totalCount} ĐÃ LÀM
              </span>
            </div>

            <div className="p-4 space-y-4">
              {/* Question Grid (7 columns x 3 rows = 21 questions) */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = answers[q.id] !== undefined && String(answers[q.id]).trim() !== '';
                  const isFlag = Boolean(flagged[q.id]);
                  const isPrediction = q.type === 'prediction';

                  let btnStyle = 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200';
                  if (isAnswered) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-700 shadow-sm';
                  }
                  if (isFlag) {
                    btnStyle = 'bg-amber-400 text-slate-950 border-amber-500 font-bold';
                  }
                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-offset-1 ring-[#0B2545] font-black scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-11 rounded-lg border text-xs font-bold flex flex-col items-center justify-center relative transition-all cursor-pointer ${btnStyle}`}
                      title={
                        isPrediction
                          ? `Câu ${idx + 1} (Câu dự đoán số người đúng 20/20 câu): ${isAnswered ? answers[q.id] + ' người' : 'Chưa nhập'}`
                          : `Câu ${idx + 1}${isAnswered ? ' - Đã chọn ' + answers[q.id] : ' - Chưa trả lời'}`
                      }
                    >
                      <span className="flex items-center gap-0.5">
                        {idx + 1}
                        {isPrediction && <span className="text-[10px] text-amber-300">★</span>}
                      </span>
                      {isAnswered && (
                        <span className="text-[9px] opacity-90 leading-none truncate max-w-[2.2rem]">
                          {isPrediction ? '✓' : answers[q.id]}
                        </span>
                      )}
                      {isFlag && (
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-emerald-600 border border-emerald-700"></div>
                  <span>Đã trả lời ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300"></div>
                  <span>Chưa làm ({unansweredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-amber-400 border border-amber-500"></div>
                  <span>Đã đánh dấu ({Object.values(flagged).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-600">★</span>
                  <span>Câu 21 (Dự đoán)</span>
                </div>
              </div>

              {/* Big Submit Button in Sidebar */}
              <div className="pt-2">
                <button
                  onClick={() => setShowSubmitModal(true)}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-500"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'ĐANG XỬ LÝ...' : 'NỘP BÀI THI'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="bg-[#0B2545] text-white px-5 py-4 border-b-2 border-amber-500 flex items-center justify-between">
              <h3 className="font-bold text-base uppercase text-amber-200">
                XÁC NHẬN NỘP BÀI THI
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg">
                  Đồng chí có chắc chắn muốn nộp bài?
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Kết quả sẽ được tổng hợp tự động về bảng điều khiển quản trị và đồng bộ lên Google Sheets!
                </p>
              </div>

              {/* Statistics summary */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Tổng số câu hỏi:</span>
                  <span className="font-bold text-slate-900">{totalCount} câu (20 trắc nghiệm + 1 dự đoán)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Số câu đã hoàn thành:</span>
                  <span className="font-bold text-emerald-700">{answeredCount}/{totalCount} câu</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Dự đoán người đúng 20 câu (Câu 21):</span>
                  <span className={`font-mono font-bold ${predictionAnswer ? 'text-[#0B2545]' : 'text-red-600'}`}>
                    {predictionAnswer ? `${Number(predictionAnswer).toLocaleString('vi-VN')} người` : 'Chưa nhập'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-600">Thời gian còn lại:</span>
                  <span className="font-mono font-bold text-[#0B2545]">{formattedTime}</span>
                </div>
              </div>

              {(!predictionAnswer || unansweredCount > 0) && (
                <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs rounded-lg p-3 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Lưu ý trước khi nộp:</span>
                  </div>
                  {unansweredCount > 0 && (
                    <p>• Đồng chí còn <strong>{unansweredCount} câu</strong> chưa hoàn thành.</p>
                  )}
                  {!predictionAnswer && (
                    <p>• Đồng chí chưa nhập <strong>Câu 21 (Dự đoán số người trả lời đúng 20 câu)</strong>!</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="py-2.5 px-4 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer"
                >
                  Tiếp tục làm bài
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="py-2.5 px-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-md transition-all cursor-pointer border border-red-500"
                >
                  {isSubmitting ? 'Đang gửi bài...' : 'Xác nhận nộp bài'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
