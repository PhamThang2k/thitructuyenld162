/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Phone, 
  Play, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { Candidate, WeekInfo } from '../types';
import { MILITARY_UNITS } from '../data/mockData';

interface RegistrationCardProps {
  week: WeekInfo;
  onStartExam: (candidate: Candidate) => void;
  isLoadingQuestions: boolean;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  week,
  onStartExam,
  isLoadingQuestions
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>(MILITARY_UNITS[0]);
  const [customUnit, setCustomUnit] = useState<string>('');
  const [phoneOrId, setPhoneOrId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Vui lòng nhập Họ và tên của đồng chí!');
      return;
    }

    if (selectedUnit === 'Đơn vị khác (tự điền)' && !customUnit.trim()) {
      setError('Vui lòng nhập tên đơn vị của đồng chí!');
      return;
    }

    if (!agreeTerms) {
      setError('Vui lòng đồng ý với thể lệ cuộc thi trước khi làm bài!');
      return;
    }

    setError('');
    const finalUnit = selectedUnit === 'Đơn vị khác (tự điền)' ? customUnit.trim() : selectedUnit;

    onStartExam({
      fullName: fullName.trim(),
      unit: finalUnit,
      phoneOrId: phoneOrId.trim()
    });
  };

  const isUpcoming = week.status === 'upcoming';
  const isClosed = week.status === 'closed';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
      {/* Left Column: Contest Rules & Information */}
      <div className="lg:col-span-7 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between">
        <div>
          <div className="bg-[#0B2545] text-white px-5 py-3.5 border-b-2 border-amber-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-sm md:text-base uppercase tracking-wider text-amber-100">
                THÔNG TIN VÀ THỂ LỆ TUẦN {week.weekNumber}
              </h2>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-400/40">
              {week.startDate} - {week.endDate}
            </span>
          </div>

          <div className="p-5 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1">
                {week.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {week.theme}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-blue-700 mx-auto mb-1" />
                <div className="text-[11px] text-slate-500 font-medium">Thời gian thi</div>
                <div className="text-base font-bold text-blue-900">{week.timeLimitMinutes} Phút</div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <FileText className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                <div className="text-[11px] text-slate-500 font-medium">Số lượng câu</div>
                <div className="text-base font-bold text-amber-900">{week.totalQuestions} Câu hỏi</div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
                <div className="text-[11px] text-slate-500 font-medium">Hình thức</div>
                <div className="text-base font-bold text-emerald-900">20 câu TN + 1 dự đoán</div>
              </div>
            </div>

            <div className="space-y-2 text-xs md:text-sm text-slate-700 pt-2 border-t border-slate-100">
              <h4 className="font-bold text-[#0B2545] uppercase tracking-wider text-xs">
                Quy định & Lưu ý khi làm bài:
              </h4>
              <ul className="space-y-1.5 list-disc pl-5 text-slate-600 leading-relaxed">
                <li>Bộ đề gồm <strong>21 câu hỏi</strong>: 20 câu trắc nghiệm kiến thức và <strong>01 câu dự đoán số người trả lời đúng tất cả 20 câu</strong> ở cuối bài.</li>
                <li>Câu 21 (dự đoán số người trả lời đúng 20 câu) là câu hỏi phụ quan trọng để <strong>phân định thứ hạng giải thưởng</strong> khi có nhiều bài thi đạt cùng điểm số và thời gian.</li>
                <li>Thí sinh có thể chuyển đổi qua lại giữa các câu hỏi bất kỳ lúc nào qua <strong>Bản đồ câu hỏi (21 câu)</strong>.</li>
                <li>Tính năng <strong>Đánh dấu xem lại</strong> giúp thí sinh rà soát lại các câu chưa chắc chắn.</li>
                <li>Hệ thống <strong>tự động lưu trạng thái</strong> vào thiết bị; bài làm và dữ liệu dự đoán được tổng hợp an toàn về Google Sheets cho Ban Quản trị.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Mọi thắc mắc về kỹ thuật xin liên hệ Ban Chỉ đạo Hội thi - Lữ đoàn 162 (Vùng 4 Hải quân).</span>
        </div>
      </div>

      {/* Right Column: Candidate Registration Form */}
      <div className="lg:col-span-5 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between">
        <div>
          <div className="bg-[#133E87] text-white px-5 py-3.5 border-b-2 border-amber-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-sm md:text-base uppercase tracking-wider text-amber-100">
                ĐĂNG KÝ THÔNG TIN DỰ THI
              </h2>
            </div>
            <span className="text-[11px] text-slate-300">Bước 1 / 2</span>
          </div>

          <div className="p-5">
            {isUpcoming ? (
              <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-lg p-5 text-center">
                <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                <h3 className="font-bold text-base mb-1">Tuần thi này chưa mở!</h3>
                <p className="text-xs text-amber-800 leading-relaxed mb-3">
                  Tuần {week.weekNumber} sẽ chính thức bắt đầu vào lúc 08:00 ngày {week.startDate}. Cán bộ, chiến sĩ vui lòng quay lại sau hoặc chọn tham gia tuần đang mở.
                </p>
                <div className="inline-block bg-amber-200/70 text-amber-900 font-mono text-xs px-3 py-1 rounded-full font-bold">
                  Khai mạc: {week.startDate}
                </div>
              </div>
            ) : isClosed ? (
              <div className="bg-slate-100 border border-slate-300 text-slate-800 rounded-lg p-5 text-center">
                <AlertTriangle className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                <h3 className="font-bold text-base mb-1">Tuần thi đã kết thúc!</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Tuần {week.weekNumber} đã đóng cổng nộp bài vào ngày {week.endDate}. Đồng chí có thể xem lại bảng xếp hạng hoặc chuyển sang tuần thi hiện tại.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 text-xs rounded-lg p-3 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Họ và tên */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Họ và tên thí sinh <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Đại úy Nguyễn Văn An"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#133E87] focus:border-[#133E87] outline-none transition-all font-medium"
                      autoFocus
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Ghi rõ cấp bậc, họ tên có dấu (Ví dụ: Thượng úy Trần Minh Tuấn).
                  </span>
                </div>

                {/* Đơn vị */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Tàu / Hải đội / Phòng ban / Cơ quan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#133E87] focus:border-[#133E87] outline-none transition-all font-medium bg-white"
                    >
                      {MILITARY_UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedUnit === 'Đơn vị khác (tự điền)' && (
                    <input
                      type="text"
                      value={customUnit}
                      onChange={(e) => setCustomUnit(e.target.value)}
                      placeholder="Nhập tên tàu, đơn vị, ngành công tác của bạn..."
                      className="w-full mt-2 px-3 py-2 text-sm border border-amber-300 bg-amber-50/50 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  )}
                </div>

                {/* SĐT hoặc Mã quân nhân */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Số điện thoại / Mã quân nhân (CCCD)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={phoneOrId}
                      onChange={(e) => setPhoneOrId(e.target.value)}
                      placeholder="Ví dụ: 0912345678 hoặc QN-2026-X"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#133E87] focus:border-[#133E87] outline-none transition-all font-medium"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Dùng để đối chiếu và vinh danh trao giải thưởng khi đạt thứ hạng cao.
                  </span>
                </div>

                {/* Điều khoản */}
                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded text-[#0B2545] focus:ring-[#0B2545]"
                    />
                    <span>
                      Tôi cam kết tuân thủ nghiêm túc quy chế thi, tự lực làm bài và trung thực trong suốt quá trình tham gia.
                    </span>
                  </label>
                </div>

                {/* Nút Bắt đầu thi */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoadingQuestions}
                    className="w-full py-3.5 px-4 rounded-xl font-black text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-amber-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 border border-amber-500/80 cursor-pointer animate-pulse-gold"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>{isLoadingQuestions ? 'ĐANG CHUẨN BỊ ĐỀ THI...' : 'BẮT ĐẦU THI NGAY'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 text-[11px] text-slate-500 text-center">
          Dữ liệu kết quả được mã hóa và đồng bộ tự động lên hệ thống Google Sheets.
        </div>
      </div>
    </div>
  );
};
