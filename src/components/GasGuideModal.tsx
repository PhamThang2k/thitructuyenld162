/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Database, 
  Download, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  FileCode,
  Table,
  Zap,
  ArrowRight
} from 'lucide-react';
import { GAS_SCRIPT_SOURCE } from '../gas/gasScriptCode';
import { 
  getGasWebAppUrl, 
  setGasWebAppUrl, 
  testGasConnection, 
  requestInitSheets 
} from '../services/gasApi';

interface GasGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const GasGuideModal: React.FC<GasGuideModalProps> = ({
  isOpen,
  onClose,
  onSaved
}) => {
  const [urlInput, setUrlInput] = useState<string>(getGasWebAppUrl());
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [testing, setTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'config' | 'code' | 'structure' | 'guide'>('config');
  const [initingSheets, setInitingSheets] = useState<boolean>(false);
  const [initResult, setInitResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveUrl = () => {
    setGasWebAppUrl(urlInput);
    onSaved();
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testGasConnection(urlInput);
      setTestResult(res);
      if (res.success) {
        handleSaveUrl();
      }
    } catch (e: any) {
      setTestResult({
        success: false,
        message: e.message || 'Lỗi kết nối không xác định'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleInitSheets = async () => {
    setInitingSheets(true);
    setInitResult(null);
    try {
      const res = await requestInitSheets(urlInput);
      setInitResult(res.message);
    } catch (e: any) {
      setInitResult('Lỗi khởi tạo: ' + e.message);
    } finally {
      setInitingSheets(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(GAS_SCRIPT_SOURCE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([GAS_SCRIPT_SOURCE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white px-6 py-4 border-b-2 border-amber-500 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base md:text-lg uppercase text-amber-200">
                TÍCH HỢP GOOGLE SHEETS QUA GOOGLE APPS SCRIPT (GAS)
              </h3>
              <p className="text-xs text-slate-300">
                Lưu trữ đề thi, chấm điểm bảo mật tại máy chủ, đồng bộ kết quả trực tuyến miễn phí
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'config'
                ? 'border-amber-500 text-[#0B2545] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Cài đặt & Kết nối URL</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'border-amber-500 text-[#0B2545] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Hướng dẫn 5 bước</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-amber-500 text-[#0B2545] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-emerald-600" />
            <span>Mã nguồn Code.gs (GAS)</span>
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'structure'
                ? 'border-amber-500 text-[#0B2545] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-4 h-4 text-purple-600" />
            <span>Cấu trúc Cột Google Sheet</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: CẤU HÌNH & KẾT NỐI */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 leading-relaxed space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Cơ chế hoạt động của Google Apps Script Web App:
                </div>
                <p>
                  Google Apps Script biến Google Sheet của bạn thành một REST API máy chủ hoàn toàn miễn phí, không giới hạn số lượng bài thi, không cần cấu hình database phức tạp.
                </p>
                <p>
                  <strong>Tính năng bảo mật chống gian lận F12:</strong> Đáp án đúng được lưu giữ an toàn trên Sheet và chấm điểm trực tiếp tại máy chủ Apps Script, không gửi lộ key đáp án về trình duyệt của thí sinh!
                </p>
              </div>

              {/* Input URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                  URL Ứng dụng Web Google Apps Script (Web App URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 px-4 py-2.5 text-xs md:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#133E87] outline-none font-mono"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleTestConnection}
                      disabled={testing || !urlInput.trim()}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#133E87] hover:bg-[#0B2545] text-white transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                    >
                      <Zap className={`w-3.5 h-3.5 ${testing ? 'animate-bounce' : ''}`} />
                      <span>{testing ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}</span>
                    </button>

                    <button
                      onClick={handleSaveUrl}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer"
                    >
                      Lưu URL
                    </button>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Định dạng URL hợp lệ: Bắt đầu bằng <code>https://script.google.com/macros/s/</code> và kết thúc bằng <code>/exec</code>.
                </span>
              </div>

              {/* Ping Test Feedback */}
              {testResult && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                  testResult.success 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                    : 'bg-red-50 border-red-300 text-red-900'
                }`}>
                  {testResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold">
                      {testResult.success ? 'KẾT NỐI GOOGLE SHEETS THÀNH CÔNG!' : 'KẾT NỐI THẤT BẠI!'}
                    </div>
                    <div className="mt-1">{testResult.message}</div>
                    {testResult.latencyMs && (
                      <div className="mt-1 font-mono text-[11px] opacity-80">
                        Độ trễ phản hồi máy chủ: {testResult.latencyMs}ms
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Sheet Initializer */}
              {urlInput.trim() && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-slate-800">
                      Tự động khởi tạo cấu trúc Sheet & Câu hỏi mẫu
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Tự động tạo 4 tab Tuan_1, Tuan_2, Tuan_3, Tuan_4 và KetQua nếu Sheet của bạn đang trắng.
                    </div>
                  </div>
                  <button
                    onClick={handleInitSheets}
                    disabled={initingSheets}
                    className="px-4 py-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all cursor-pointer shrink-0"
                  >
                    {initingSheets ? 'Đang khởi tạo...' : 'Khởi tạo cấu trúc mẫu'}
                  </button>
                </div>
              )}

              {initResult && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                  {initResult}
                </div>
              )}

              {/* Reset to Built-in Bank */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Muốn quay lại sử dụng kho câu hỏi mặc định không cần Google Sheets?
                </span>
                <button
                  onClick={() => {
                    setUrlInput('');
                    setGasWebAppUrl('');
                    setTestResult(null);
                    onSaved();
                  }}
                  className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Xóa liên kết Google Sheets
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: HƯỚNG DẪN 5 BƯỚC */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {/* Step 1 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0B2545] text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs md:text-sm text-slate-900">
                      Tạo trang tính Google Sheet mới
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Truy cập <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline inline-flex items-center gap-1">sheets.new <ExternalLink className="w-3 h-3" /></a> trên trình duyệt để tạo một bảng tính Google Sheet mới cho hội thi. Đặt tên trang tính ví dụ: <em>"Hội thi Tìm hiểu Lữ đoàn 162"</em>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0B2545] text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs md:text-sm text-slate-900">
                      Mở Trình biên tập Google Apps Script
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Trên thanh menu của Google Sheet, chọn: <strong>Tiện ích mở rộng</strong> (Extensions) &rarr; <strong>Apps Script</strong>. Một tab trình soạn thảo mã nguồn sẽ mở ra.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0B2545] text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs md:text-sm text-slate-900">
                      Dán mã nguồn Code.gs
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Xóa toàn bộ mã mặc định trong file <code>Code.gs</code>. Chuyển sang tab <strong>"Mã nguồn Code.gs"</strong> trên cửa sổ này, bấm <strong>"Sao chép toàn bộ mã"</strong> và dán vào Apps Script. Nhấn <strong>Lưu</strong> (Ctrl + S hoặc biểu tượng đĩa mềm).
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl border-2 border-amber-400 bg-amber-50/50 shadow-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                    4
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-black text-xs md:text-sm text-amber-950 uppercase">
                      Triển khai Ứng dụng Web (Web App) - RẤT QUAN TRỌNG!
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Bấm nút màu xanh <strong>Triển khai (Deploy)</strong> ở góc trên bên phải &rarr; Chọn <strong>Tùy chọn triển khai mới (New deployment)</strong>.
                    </p>
                    <ul className="text-xs text-slate-700 list-disc pl-5 space-y-1">
                      <li>Loại triển khai: Chọn biểu tượng bánh răng &rarr; <strong>Ứng dụng web (Web app)</strong>.</li>
                      <li>Thực thi dưới dạng (Execute as): <strong>Tôi (Me)</strong>.</li>
                      <li>
                        <strong className="text-red-700 bg-red-100 px-1 py-0.5 rounded">
                          Ai có quyền truy cập (Who has access): BẤT KỲ AI (ANYONE)
                        </strong> (Nếu để mặc định "Chỉ mình tôi" thì hệ thống web thi sẽ bị chặn quyền truy cập).
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#0B2545] text-amber-300 font-bold flex items-center justify-center shrink-0 text-sm">
                    5
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs md:text-sm text-slate-900">
                      Sao chép URL và Dán vào Hệ thống
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sao chép dòng <strong>URL Ứng dụng web (Web App URL)</strong> (dạng <code>https://script.google.com/macros/s/.../exec</code>) &rarr; Quay lại tab <strong>"Cài đặt & Kết nối URL"</strong> và dán vào ô nhập. Bấm <strong>"Kiểm tra kết nối"</strong> để hoàn tất!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MÃ NGUỒN CODE.GS */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-600">
                  Dán trọn bộ mã nguồn này vào file <code>Code.gs</code> trong Google Apps Script của bạn:
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải file .gs</span>
                  </button>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'ĐÃ SAO CHÉP MÃ!' : 'SAO CHÉP TOÀN BỘ MÃ'}</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#07192F]">
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto max-h-96 leading-relaxed">
                  <code>{GAS_SCRIPT_SOURCE}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CẤU TRÚC SHEET */}
          {activeTab === 'structure' && (
            <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
              <p>
                Nếu đồng chí muốn tự tạo các cột bằng tay trên Google Sheet mà không dùng nút tự động, hãy tạo đúng tên các tab và thứ tự cột như sau:
              </p>

              {/* Question Sheets Structure */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="font-bold text-sm text-[#0B2545] flex items-center gap-2">
                  <Table className="w-4 h-4 text-amber-500" />
                  <span>4 Sheet Câu hỏi: Tuan_1, Tuan_2, Tuan_3, Tuan_4</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-300 text-[11px] font-mono">
                    <thead>
                      <tr className="bg-[#0B2545] text-white">
                        <th className="border p-1.5">Cột A: ID</th>
                        <th className="border p-1.5">Cột B: CauHoi</th>
                        <th className="border p-1.5">Cột C: DapAnA</th>
                        <th className="border p-1.5">Cột D: DapAnB</th>
                        <th className="border p-1.5">Cột E: DapAnC</th>
                        <th className="border p-1.5">Cột F: DapAnD</th>
                        <th className="border p-1.5 bg-amber-600">Cột G: DapAnDung</th>
                        <th className="border p-1.5">Cột H: GiaiThich</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border p-1.5 text-center">1</td>
                        <td className="border p-1.5">Lữ đoàn 162 thành lập ngày nào?</td>
                        <td className="border p-1.5">09/01/2002</td>
                        <td className="border p-1.5">22/12/2000</td>
                        <td className="border p-1.5">07/05/2005</td>
                        <td className="border p-1.5">19/05/2003</td>
                        <td className="border p-1.5 text-center font-bold text-amber-700">A</td>
                        <td className="border p-1.5">Ngày truyền thống Lữ đoàn 162...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Results Sheet Structure */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="font-bold text-sm text-[#133E87] flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-500" />
                  <span>1 Sheet Kết quả: KetQua (Tự động ghi khi thí sinh nộp bài)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-300 text-[11px] font-mono">
                    <thead>
                      <tr className="bg-[#133E87] text-white">
                        <th className="border p-1.5">Thời gian</th>
                        <th className="border p-1.5">Tuần thi</th>
                        <th className="border p-1.5">Họ và tên</th>
                        <th className="border p-1.5">Tàu / Đơn vị</th>
                        <th className="border p-1.5">SĐT/Mã QN</th>
                        <th className="border p-1.5">Điểm số</th>
                        <th className="border p-1.5">Số câu đúng (trên 20)</th>
                        <th className="border p-1.5">Tổng số câu (21)</th>
                        <th className="border p-1.5">Thời gian (giây)</th>
                        <th className="border p-1.5 bg-amber-600 text-white">Dự đoán đúng 20 câu (C21)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border p-1.5">2026-11-02 14:30:10</td>
                        <td className="border p-1.5">Tuan_1</td>
                        <td className="border p-1.5">Nguyễn Tuấn Anh</td>
                        <td className="border p-1.5">Tàu 015 Trần Hưng Đạo</td>
                        <td className="border p-1.5">0912345678</td>
                        <td className="border p-1.5 text-center font-bold text-blue-900">100</td>
                        <td className="border p-1.5 text-center font-bold text-emerald-700">20</td>
                        <td className="border p-1.5 text-center">21</td>
                        <td className="border p-1.5 text-center">135</td>
                        <td className="border p-1.5 text-center font-bold text-amber-900 bg-amber-50">125</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Hỗ trợ kết nối chuẩn CORS theo định dạng phản hồi JSON
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#133E87] text-amber-300 transition-all cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
