/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  History, 
  Award, 
  Clock, 
  Calendar, 
  Eye, 
  Trash2, 
  Building2, 
  User, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SubmissionResult } from '../types';
import { getLocalSubmissions, clearLocalSubmissions } from '../services/gasApi';

interface ExamHistoryProps {
  onSelectResult: (res: SubmissionResult) => void;
  onGoToContest: () => void;
}

export const ExamHistory: React.FC<ExamHistoryProps> = ({
  onSelectResult,
  onGoToContest
}) => {
  const [history, setHistory] = useState<SubmissionResult[]>([]);

  useEffect(() => {
    setHistory(getLocalSubmissions());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Đồng chí có chắc chắn muốn xóa toàn bộ lịch sử thi đã lưu trên trình duyệt?')) {
      clearLocalSubmissions();
      setHistory([]);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m > 0 ? `${m} phút ` : ''}${s} giây`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133E87] text-white rounded-xl shadow-lg border-2 border-amber-500 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-400/40">
            <History className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase text-amber-300 tracking-wide font-['Playfair_Display',serif]">
              LỊCH SỬ BÀI THI CỦA ĐỒNG CHÍ
            </h2>
            <p className="text-xs md:text-sm text-slate-200 mt-0.5">
              Danh sách các lượt dự thi đã hoàn thành trên thiết bị này
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white transition-all border border-red-500/40 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa lịch sử</span>
          </button>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center space-y-4">
          <Award className="w-16 h-16 text-slate-300 mx-auto" />
          <div>
            <h3 className="font-bold text-base text-slate-800">Chưa có bài thi nào được ghi nhận</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Đồng chí chưa hoàn thành bài thi nào trên trình duyệt này. Hãy bắt đầu tham gia một tuần thi để kiểm tra kiến thức!
            </p>
          </div>
          <button
            onClick={onGoToContest}
            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase bg-[#0B2545] hover:bg-[#133E87] text-amber-300 transition-all cursor-pointer shadow"
          >
            Vào thi ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item, idx) => {
            const isPassed = item.score >= 70;
            return (
              <div 
                key={`${item.submittedAt}-${idx}`}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-amber-400 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs px-2.5 py-0.5 rounded uppercase bg-[#0B2545] text-amber-300">
                      {item.weekId.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.submittedAt}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">
                    {item.weekTitle}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <strong>{item.candidate.fullName}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.candidate.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className={`text-xl font-black ${isPassed ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {item.score}
                      </span>
                      <span className="text-xs text-slate-400">/100đ</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {item.correctCount}/20 đúng • {formatSeconds(item.timeTakenSeconds)}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectResult(item)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#133E87] hover:bg-[#0B2545] text-amber-300 transition-all shadow-sm cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem lại kết quả</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
