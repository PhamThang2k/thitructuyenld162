/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, CheckCircle2, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { WeekInfo, WeekId } from '../types';

interface WeekTabsProps {
  weeks: WeekInfo[];
  selectedWeekId: WeekId;
  onSelectWeek: (weekId: WeekId) => void;
  disabled?: boolean;
}

export const WeekTabs: React.FC<WeekTabsProps> = ({
  weeks,
  selectedWeekId,
  onSelectWeek,
  disabled = false
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-6">
      {/* Title bar */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133E87] px-4 py-3 flex items-center justify-between text-white border-b-2 border-amber-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          <h2 className="font-bold text-sm md:text-base uppercase tracking-wider text-amber-100">
            CÁC ĐỢT THI TRẮC NGHIỆM TRỰC TUYẾN (4 TUẦN THI)
          </h2>
        </div>
        <span className="text-xs text-amber-300 font-medium hidden sm:inline">
          Nhấp chọn tuần thi để tham gia
        </span>
      </div>

      {/* Grid of 4 weeks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        {weeks.map((week) => {
          const isSelected = week.id === selectedWeekId;
          const isOpen = week.status === 'open';
          const isUpcoming = week.status === 'upcoming';
          const isClosed = week.status === 'closed';

          return (
            <button
              key={week.id}
              onClick={() => !disabled && onSelectWeek(week.id)}
              disabled={disabled}
              className={`p-4 text-left transition-all relative flex flex-col justify-between group ${
                isSelected
                  ? 'bg-amber-50/70 ring-2 ring-inset ring-amber-500'
                  : 'hover:bg-slate-50'
              } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Active ribbon indicator */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-3 h-3 bg-amber-500 clip-triangle"></div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-[#0B2545] text-amber-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    TUẦN {week.weekNumber}
                  </span>

                  {isOpen && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ĐANG MỞ
                    </span>
                  )}
                  {isUpcoming && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      SẮP DIỄN RA
                    </span>
                  )}
                  {isClosed && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full border border-slate-300">
                      <Lock className="w-3 h-3 text-slate-500" />
                      ĐÃ ĐÓNG
                    </span>
                  )}
                </div>

                <h3 className={`text-sm font-bold line-clamp-1 mb-1 ${
                  isSelected ? 'text-[#0B2545]' : 'text-slate-800 group-hover:text-blue-900'
                }`}>
                  {week.title.replace(/^Tuần \d+:\s*/, '')}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {week.theme}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium text-slate-600">{week.startDate} - {week.endDate}</span>
                <span className="font-semibold text-slate-700">{week.totalQuestions} câu • {week.timeLimitMinutes}p</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
