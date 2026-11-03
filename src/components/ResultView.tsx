/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  Share2, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { SubmissionResult } from '../types';

interface ResultViewProps {
  result: SubmissionResult;
  onRetake: () => void;
  onSwitchWeek: () => void;
  onViewHistory?: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onRetake,
  onSwitchWeek,
  onViewHistory
}) => {
  const [showDetailedReview, setShowDetailedReview] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const isPassed = (result.score / result.maxScore) >= 0.7; // >= 70%
  const isPerfect = result.score === 100;

  useEffect(() => {
    // Launch celebratory confetti if passed
    if (isPassed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        const timeout = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 400);
        return () => clearTimeout(timeout);
      } catch (e) {
        // Confetti optional
      }
    }
  }, [isPassed]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m > 0 ? `${m} phút ` : ''}${s} giây`;
  };

  const handleShare = () => {
    const text = `Tôi vừa hoàn thành bài thi trắc nghiệm "${result.weekTitle}" với kết quả ${result.score}/100 điểm (${result.correctCount}/${result.totalQuestions} câu đúng)!`;
    navigator.clipboard?.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Congratulatory Hero Banner */}
      <div className="bg-gradient-to-br from-[#0B2545] via-[#133E87] to-[#0B2545] text-white rounded-2xl shadow-xl border-4 border-[#D4AF37] p-6 md:p-8 text-center relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <Award className="w-80 h-80 text-amber-300" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          {/* Trophy Icon */}
          <div className="inline-flex p-3 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-lg ring-4 ring-amber-300/40">
            <Trophy className="w-10 h-10 md:w-12 md:h-12" />
          </div>

          <div>
            <div className="text-xs md:text-sm uppercase tracking-widest font-extrabold text-amber-300">
              BỘ TƯ LỆNH VÙNG 4 HẢI QUÂN • BAN CHỈ ĐẠO HỘI THI LỮ ĐOÀN 162
            </div>
            <h2 className="text-xl md:text-3xl font-black uppercase text-white mt-1 drop-shadow-md font-['Playfair_Display',serif]">
              {isPerfect
                ? 'CHÚC MỪNG ĐỒNG CHÍ ĐẠT ĐIỂM TUYỆT ĐỐI!'
                : isPassed
                ? 'HOÀN THÀNH XUẤT SẮC BÀI THI!'
                : 'ĐỒNG CHÍ ĐÃ HOÀN THÀNH BÀI THI'}
            </h2>
            <p className="text-xs md:text-sm text-slate-200 mt-1">
              Bài thi: <strong className="text-amber-200">{result.weekTitle}</strong>
            </p>
          </div>

          {/* Sync Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/80 border border-blue-400/40 text-blue-200">
            {result.syncedToGoogleSheet ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Đã ghi điểm tự động vào Google Sheets</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Lưu kết quả trên hệ thống</span>
              </>
            )}
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Điểm số</div>
              <div className="text-2xl md:text-3xl font-black text-amber-300 mt-0.5">
                {result.score}<span className="text-xs text-slate-300 font-normal">/100</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Đúng trắc nghiệm</div>
              <div className="text-2xl md:text-3xl font-black text-emerald-300 mt-0.5">
                {result.correctCount}<span className="text-xs text-slate-300 font-normal">/20</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Thời gian</div>
              <div className="text-lg md:text-xl font-bold text-white mt-1">
                {formatSeconds(result.timeTakenSeconds)}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">Dự đoán đúng 20 câu</div>
              <div className="text-lg md:text-xl font-black text-amber-300 mt-1">
                {result.predictedCorrectAnswers || result.predictedParticipants ? `${(result.predictedCorrectAnswers || result.predictedParticipants)?.toLocaleString('vi-VN')} người` : '—'}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 col-span-2 sm:col-span-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">Google Sheets</div>
              <div className="text-xs md:text-sm font-bold text-emerald-300 mt-1.5 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{result.syncedToGoogleSheet ? 'Đã gửi trực tuyến' : 'Đã lưu máy'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Card & Certificate Preview */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0B2545] text-amber-300 font-black text-lg flex items-center justify-center border-2 border-amber-500">
              {result.candidate.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm md:text-base font-bold text-slate-900">
                {result.candidate.fullName}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{result.candidate.unit}</span>
                {result.candidate.phoneOrId && (
                  <>
                    <span>•</span>
                    <span>Mã/SĐT: {result.candidate.phoneOrId}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-300 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Đã sao chép!' : 'Chia sẻ kết quả'}</span>
            </button>

            {onViewHistory && (
              <button
                onClick={onViewHistory}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0B2545] hover:bg-[#133E87] text-amber-200 transition-all shadow-sm cursor-pointer"
              >
                <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Lịch sử bài thi</span>
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onRetake}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Thi lại để rèn luyện</span>
          </button>

          <button
            onClick={onSwitchWeek}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Chuyển sang tuần thi khác</span>
          </button>
        </div>
      </div>

      {/* Detailed Review Section */}
      {result.reviews && result.reviews.length > 0 && (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div 
            onClick={() => setShowDetailedReview(prev => !prev)}
            className="bg-slate-100 px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-200/80 transition-all border-b border-slate-200 select-none"
          >
            <div className="flex items-center gap-2 font-bold text-sm md:text-base text-slate-800">
              <FileCheck className="w-5 h-5 text-blue-900" />
              <span>CHI TIẾT BÀI LÀM VÀ ĐÁP ÁN ĐÚNG ({result.reviews.length} CÂU)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{showDetailedReview ? 'Thu gọn' : 'Xem chi tiết'}</span>
              {showDetailedReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>

          {showDetailedReview && (
            <div className="divide-y divide-slate-200 p-5 space-y-6">
              {result.reviews.map((rev, index) => {
                const isCorrect = rev.isCorrect;
                return (
                  <div key={rev.questionId} className="pt-4 first:pt-0 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                          {index + 1}
                        </span>
                        <h4 className="text-sm md:text-base font-bold text-slate-900 leading-snug">
                          {rev.question}
                        </h4>
                      </div>

                      <div className="shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Đúng (+5đ)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                            <XCircle className="w-3.5 h-3.5" />
                            Sai (0đ)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Prediction Question View (Câu 21) */}
                    {rev.type === 'prediction' ? (
                      <div className="ml-9 p-4 bg-amber-50 rounded-xl border border-amber-300 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">Dự đoán số người trả lời đúng 20 câu:</span>
                          <span className="font-mono font-black text-sm text-[#0B2545] bg-white px-3 py-1 rounded-lg border border-amber-300">
                            {rev.userAnswer || 'Chưa nhập'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">
                          * Con số này đã được tổng hợp về Google Sheets của Ban Quản trị để xét giải thưởng khi các bài thi có cùng số điểm và thời gian làm bài.
                        </p>
                      </div>
                    ) : (
                      /* Multiple choice options (Câu 1 - 20) */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-9">
                        {rev.options && (['A', 'B', 'C', 'D'] as const).map((optKey) => {
                          const optText = rev.options?.[optKey];
                          if (!optText) return null;

                          const isUserChoice = rev.userAnswer === optKey;
                          const isCorrectChoice = rev.correctAnswer === optKey;

                          let style = 'bg-slate-50 border-slate-200 text-slate-700';
                          if (isCorrectChoice) {
                            style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                          } else if (isUserChoice && !isCorrect) {
                            style = 'bg-red-50 border-red-300 text-red-900 line-through';
                          }

                          return (
                            <div 
                              key={optKey}
                              className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${style}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center shrink-0 bg-white/80 border">
                                  {optKey}
                                </span>
                                <span>{optText}</span>
                              </div>

                              {isCorrectChoice && (
                                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  Đáp án đúng
                                </span>
                              )}
                              {isUserChoice && !isCorrectChoice && (
                                <span className="text-[10px] font-bold uppercase text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                                  Đã chọn
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Explanation */}
                    {rev.explanation && (
                      <div className="ml-9 p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-950">Giải thích chi tiết: </strong>
                          {rev.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
