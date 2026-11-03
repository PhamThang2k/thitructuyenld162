/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Database, 
  HelpCircle, 
  FileCheck2, 
  ShieldCheck, 
  ExternalLink
} from 'lucide-react';
import { CONTEST_CONFIG } from '../data/mockData';
import { getGasWebAppUrl } from '../services/gasApi';

interface HeaderProps {
  currentTab: 'exam' | 'history';
  onSelectTab: (tab: 'exam' | 'history') => void;
  onOpenGasModal: () => void;
  isExamInProgress: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenGasModal,
  isExamInProgress
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [hasGasUrl, setHasGasUrl] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const dayName = days[now.getDay()];
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentDateTime(`${dayName}, ${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setHasGasUrl(Boolean(getGasWebAppUrl()));
  }, []);

  return (
    <header className="w-full bg-[#0B2545] text-white shadow-xl border-b-4 border-[#D4AF37]">
      {/* Top Banner Ribbon */}
      <div className="bg-[#07192F] py-1.5 px-4 text-xs border-b border-blue-900/40 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-amber-300 uppercase tracking-wider">{CONTEST_CONFIG.organizer}</span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">Cổng thông tin thi trực tuyến chính thức</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentDateTime || 'Đang cập nhật thời gian...'}</span>
          </div>
        </div>
      </div>

      {/* Main Brand & Emblem Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Emblem & Title */}
        <div className="flex items-center gap-4 text-center md:text-left">
          {/* Vietnam Naval Stylized Crest */}
          <div className="relative shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-700 via-[#0B2545] to-amber-700 p-1 shadow-lg ring-2 ring-[#D4AF37]">
            <div className="w-full h-full rounded-full border border-amber-300/80 flex flex-col items-center justify-center bg-[#07192F] shadow-inner relative overflow-hidden">
              {/* Naval anchor & gold star emblem */}
              <svg className="w-8 h-8 md:w-9 md:h-9 text-amber-300 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="5" r="2.5" />
                <path d="M12 7.5V20" />
                <path d="M5 12H19" />
                <path d="M5 16C5 19.866 8.134 23 12 23C15.866 23 19 19.866 19 16" />
                <polygon points="12,1.5 13.5,4.5 17,4.8 14.5,7 15.2,10.2 12,8.5 8.8,10.2 9.5,7 7,4.8 10.5,4.5" fill="#FBBF24" stroke="none" />
              </svg>
              <div className="text-[7px] md:text-[8px] uppercase tracking-tighter font-black text-amber-200 mt-0.5">
                LỮ ĐOÀN 162
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="bg-gradient-to-r from-red-700 to-amber-600 text-amber-100 text-[10px] md:text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider border border-amber-400/60 shadow-sm">
                VÙNG 4 HẢI QUÂN • LỮ ĐOÀN 162
              </span>
              <span className="text-amber-300 text-xs font-bold font-mono">{CONTEST_CONFIG.edition}</span>
            </div>
            <h1 className="text-lg md:text-2xl font-black uppercase text-amber-300 tracking-wide mt-1 drop-shadow-sm font-['Playfair_Display',serif]">
              {CONTEST_CONFIG.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-200 font-medium line-clamp-1 max-w-2xl">
              {CONTEST_CONFIG.subTitle}
            </p>
          </div>
        </div>

        {/* Quick Actions & GAS Sync Badge */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          <button
            onClick={onOpenGasModal}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all border shadow-sm ${
              hasGasUrl
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 hover:bg-emerald-900'
                : 'bg-amber-950/60 border-amber-500/60 text-amber-200 hover:bg-amber-900/80'
            }`}
            title="Quản lý kết nối Google Sheets qua GAS Web App"
          >
            <Database className="w-4 h-4 text-[#D4AF37]" />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span>Google Sheet API</span>
                <span className={`w-2 h-2 rounded-full ${hasGasUrl ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              </div>
              <div className="text-[10px] opacity-80 font-normal">
                {hasGasUrl ? 'Đã liên kết Sheet' : 'Dùng kho câu hỏi mẫu'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#133E87] border-t border-blue-800/80 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1 text-sm font-semibold">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => !isExamInProgress && onSelectTab('exam')}
              disabled={isExamInProgress}
              className={`px-3.5 py-2 rounded-md transition-all flex items-center gap-2 text-xs sm:text-sm ${
                currentTab === 'exam'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-200 hover:bg-blue-800/60 hover:text-white'
              } ${isExamInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Vào Thi Trực Tuyến</span>
            </button>

            <button
              onClick={() => !isExamInProgress && onSelectTab('history')}
              disabled={isExamInProgress}
              className={`px-3.5 py-2 rounded-md transition-all flex items-center gap-2 text-xs sm:text-sm ${
                currentTab === 'history'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-200 hover:bg-blue-800/60 hover:text-white'
              } ${isExamInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Lịch Sử Bài Thi</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs text-amber-200/90 pr-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Thời gian làm bài: 15 phút
            </span>
            <span>•</span>
            <span>Quy mô: 4 Tuần thi</span>
          </div>
        </div>
      </nav>
    </header>
  );
};
