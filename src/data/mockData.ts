/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WeekInfo, Question, LeaderboardEntry } from '../types';

export const CONTEST_CONFIG = {
  title: 'HỘI THI TRẮC NGHIỆM TRỰC TUYẾN TÌM HIỂU TRUYỀN THỐNG LỮ ĐOÀN 162',
  subTitle: '"LỮ ĐOÀN THÉP" - ĐƠN VỊ TÀU CHIẾN ĐẤU MẶT NƯỚC HIỆN ĐẠI NHẤT QUÂN CHỦNG HẢI QUÂN',
  organizer: 'BỘ TƯ LỆNH VÙNG 4 HẢI QUÂN - LỮ ĐOÀN 162',
  edition: 'NĂM 2026',
  passScorePercent: 70,
  defaultTimeLimitMinutes: 20,
  traditionMotto: 'SẴN SÀNG CHIẾN ĐẤU, KIÊN QUYẾT TIẾN CÔNG, LÀM CHỦ VÙNG BIỂN, QUYẾT CHIẾN QUYẾT THẮNG',
};

export const MILITARY_UNITS: string[] = [
  'Tàu 011 Đinh Tiên Hoàng (Gepard 3.9)',
  'Tàu 012 Lý Thái Tổ (Gepard 3.9)',
  'Tàu 015 Trần Hưng Đạo (Gepard 3.9)',
  'Tàu 016 Quang Trung (Gepard 3.9)',
  'Hải đội 412 - Ban Chỉ huy Hải đội',
  'Tàu 375 (Hải đội 412)',
  'Tàu 376 (Hải đội 412)',
  'Tàu 381 (Hải đội 412)',
  'Hải đội 414 - Ban Chỉ huy Hải đội',
  'Tàu 377 (Hải đội 414)',
  'Tàu 378 (Hải đội 414)',
  'Phòng Tham mưu Lữ đoàn 162',
  'Phòng Chính trị Lữ đoàn 162',
  'Phòng Hậu cần - Kỹ thuật Lữ đoàn 162',
  'Đại đội Thông tin - Tác chiến điện tử',
  'Trạm Kỹ thuật Lữ đoàn 162',
  'Cơ quan Bộ Tư lệnh Vùng 4 Hải quân',
  'Đơn vị kết nghĩa / Đơn vị trực thuộc Vùng 4',
  'Đơn vị khác (tự điền)'
];

export const WEEKS_DATA: WeekInfo[] = [
  {
    id: 'Tuan_1',
    weekNumber: 1,
    title: 'Tuần 1: Lịch sử thành lập và chặng đường phát triển của Lữ đoàn 162',
    theme: 'Ngày truyền thống 09/01/2002, quá trình hình thành "Lữ đoàn Thép" tại Căn cứ Quân sự Cam Ranh',
    startDate: '01/11/2026',
    endDate: '07/11/2026',
    status: 'open',
    timeLimitMinutes: 20,
    totalQuestions: 21,
    bannerSubtitle: 'Đang diễn ra sôi nổi tại toàn Lữ đoàn 162 và Vùng 4'
  },
  {
    id: 'Tuan_2',
    weekNumber: 2,
    title: 'Tuần 2: Làm chủ vũ khí trang bị kỹ thuật và các thế hệ tàu chiến',
    theme: 'Tàu hộ vệ tên lửa tàng hình Gepard 3.9, tàu tên lửa tấn công nhanh Molniya 1241.8 và công tác huấn luyện làm chủ',
    startDate: '08/11/2026',
    endDate: '14/11/2026',
    status: 'open',
    timeLimitMinutes: 20,
    totalQuestions: 21,
    bannerSubtitle: 'Sẵn sàng tranh tài tuần 2'
  },
  {
    id: 'Tuan_3',
    weekNumber: 3,
    title: 'Tuần 3: Đối ngoại quốc phòng, Diễn tập quốc tế và Bảo vệ chủ quyền',
    theme: 'Những chuyến hải trình vươn khơi xa, duyệt binh tàu quốc tế, diễn tập Komodo, Kakadu, MILAN và tuần tra quản lý biển',
    startDate: '15/11/2026',
    endDate: '21/11/2026',
    status: 'upcoming',
    timeLimitMinutes: 20,
    totalQuestions: 21,
    bannerSubtitle: 'Mở cổng thi vào 08:00 ngày 15/11/2026'
  },
  {
    id: 'Tuan_4',
    weekNumber: 4,
    title: 'Tuần 4: Xây dựng Lữ đoàn vững mạnh toàn diện "Mẫu mực, tiêu biểu"',
    theme: 'Truyền thống vẻ vang, học tập làm theo tư tưởng Hồ Chí Minh và Cuộc vận động 50 trong toàn Lữ đoàn',
    startDate: '22/11/2026',
    endDate: '28/11/2026',
    status: 'closed',
    timeLimitMinutes: 20,
    totalQuestions: 21,
    bannerSubtitle: 'Tổng kết đợt thi đua cao điểm'
  }
];

export const MOCK_QUESTIONS: Record<string, Question[]> = {
  Tuan_1: [
    {
      id: 1,
      type: 'choice',
      question: 'Lữ đoàn 162 (Vùng 4 Hải quân) được thành lập vào ngày tháng năm nào?',
      options: {
        A: 'Ngày 09 tháng 01 năm 2002',
        B: 'Ngày 22 tháng 12 năm 2000',
        C: 'Ngày 07 tháng 5 năm 2005',
        D: 'Ngày 19 tháng 5 năm 2003'
      },
      correctOption: 'A',
      explanation: 'Ngày 09/01/2002, Bộ trưởng Bộ Quốc phòng ra Quyết định thành lập Lữ đoàn 162 trực thuộc Vùng 4 Hải quân. Ngày 09/01 hằng năm trở thành ngày truyền thống vẻ vang của Lữ đoàn.',
      topic: 'Lịch sử thành lập'
    },
    {
      id: 2,
      type: 'choice',
      question: 'Lữ đoàn 162 được cán bộ, chiến sĩ và nhân dân tin yêu gọi bằng danh xưng tự hào nào?',
      options: {
        A: '"Lữ đoàn Thép" của Quân chủng Hải quân',
        B: '"Đoàn tàu Không số" thời kỳ mới',
        C: '"Cú đấm thép" phòng không không quân',
        D: '"Bức tường thép" biên cương'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn 162 được mệnh danh là "Lữ đoàn Thép" - đơn vị tàu chiến đấu mặt nước hiện đại nhất của Quân chủng Hải quân nhân dân Việt Nam.',
      topic: 'Danh xưng truyền thống'
    },
    {
      id: 3,
      type: 'choice',
      question: 'Sở chỉ huy và căn cứ đóng quân chính của Lữ đoàn 162 thuộc địa bàn chiến lược nào?',
      options: {
        A: 'Căn cứ Quân sự Cam Ranh, tỉnh Khánh Hòa (thuộc Vùng 4 Hải quân)',
        B: 'Bán đảo Sơn Trà, thành phố Đà Nẵng',
        C: 'Căn cứ Vũng Tàu, tỉnh Bà Rịa - Vũng Tàu',
        D: 'Căn cứ Phú Quốc, tỉnh Kiên Giang'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn 162 đóng quân tại Căn cứ Quân sự Cam Ranh, tỉnh Khánh Hòa, nơi có vị trí địa - chính trị và quân sự đặc biệt quan trọng bảo vệ vùng biển Nam Trung Bộ và quần đảo Trường Sa.',
      topic: 'Địa bàn đóng quân'
    },
    {
      id: 4,
      type: 'choice',
      question: 'Truyền thống tiêu biểu được đúc kết qua hơn 20 năm xây dựng, phát triển của Lữ đoàn 162 là gì?',
      options: {
        A: '"Sẵn sàng chiến đấu, kiên quyết tiến công, làm chủ vùng biển, quyết chiến quyết thắng"',
        B: '"Đoàn kết, kỷ luật, bí mật, bất ngờ"',
        C: '"Thần tốc, táo bạo, quyết thắng giặc thù"',
        D: '"Vượt mọi khó khăn, bám biển kiên cường"'
      },
      correctOption: 'A',
      explanation: 'Truyền thống vẻ vang của Lữ đoàn 162 được cô đọng trong 16 chữ vàng: "Sẵn sàng chiến đấu, kiên quyết tiến công, làm chủ vùng biển, quyết chiến quyết thắng".',
      topic: 'Truyền thống Lữ đoàn'
    },
    {
      id: 5,
      type: 'choice',
      question: 'Vùng 4 Hải quân - đơn vị cấp trên trực tiếp của Lữ đoàn 162 đảm nhiệm quản lý, bảo vệ vùng biển nào?',
      options: {
        A: 'Vùng biển từ Phú Yên đến Bắc Bình Thuận, trọng tâm là quần đảo Trường Sa và thềm lục địa phía Nam',
        B: 'Vùng biển Vịnh Bắc Bộ từ Quảng Ninh đến Hà Tĩnh',
        C: 'Vùng biển Tây Nam từ Cà Mau đến Kiên Giang',
        D: 'Toàn bộ vùng nội thủy vịnh Thái Lan'
      },
      correctOption: 'A',
      explanation: 'Vùng 4 Hải quân quản lý vùng biển trọng yếu Nam Trung Bộ, trong đó có quần đảo Trường Sa thiêng liêng của Tổ quốc.',
      topic: 'Địa bàn chiến lược'
    },
    {
      id: 6,
      type: 'choice',
      question: 'Đơn vị tiền thân khi thành lập Lữ đoàn 162 tiếp nhận quản lý các loại tàu chiến đấu nào?',
      options: {
        A: 'Các tàu tên lửa tấn công nhanh đề án 1241.RE và tàu phóng lôi, pháo tuần tiễu',
        B: 'Tàu ngầm Kilo 636 hiện đại',
        C: 'Tàu đổ bộ cỡ lớn LST',
        D: 'Tàu buồm huấn luyện Lê Quý Đôn'
      },
      correctOption: 'A',
      explanation: 'Giai đoạn đầu thành lập, Lữ đoàn 162 tiếp nhận và nhanh chóng làm chủ các tàu tên lửa đề án 1241.RE, tạo tiền đề làm chủ các thế hệ tàu hiện đại sau này.',
      topic: 'Quá trình phát triển'
    },
    {
      id: 7,
      type: 'choice',
      question: 'Các Hải đội chiến đấu trực thuộc Lữ đoàn 162 gồm những đơn vị hải đội nào?',
      options: {
        A: 'Hải đội 412 và Hải đội 414',
        B: 'Hải đội 511 và Hải đội 512',
        C: 'Hải đội 131 và Hải đội 132',
        D: 'Hải đội 171 và Hải đội 172'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn 162 có cơ cấu lực lượng chiến đấu nòng cốt gồm Hải đội 412, Hải đội 414 cùng các tàu hộ vệ tên lửa trực thuộc Lữ đoàn.',
      topic: 'Tổ chức biên chế'
    },
    {
      id: 8,
      type: 'choice',
      question: 'Phần thưởng cao quý nào đã được Đảng, Nhà nước trao tặng cho Lữ đoàn 162 nhân dịp kỷ niệm 20 năm ngày truyền thống?',
      options: {
        A: 'Huân chương Bảo vệ Tổ quốc hạng Nhất',
        B: 'Huân chương Lao động hạng Ba',
        C: 'Huân chương Độc lập hạng Nhất',
        D: 'Cờ thi đua của Bộ Giáo dục và Đào tạo'
      },
      correctOption: 'A',
      explanation: 'Ghi nhận những thành tích đặc biệt xuất sắc trong huấn luyện, SSCĐ và bảo vệ chủ quyền biển, đảo, Lữ đoàn 162 vinh dự được tặng thưởng Huân chương Bảo vệ Tổ quốc hạng Nhất.',
      topic: 'Khen thưởng'
    },
    {
      id: 9,
      type: 'choice',
      question: 'Phương châm huấn luyện chiến đấu hàng đầu của cán bộ, chiến sĩ Lữ đoàn 162 là gì?',
      options: {
        A: '"Cơ bản, thiết thực, vững chắc", coi trọng huấn luyện đồng bộ, chuyên sâu, sát thực tế chiến trường',
        B: 'Chỉ huấn luyện lý thuyết trong giảng đường',
        C: 'Huấn luyện nhanh gọn, bỏ qua quy trình an toàn',
        D: 'Huấn luyện theo phương thức tự phát'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn quán triệt nghiêm túc phương châm: "Cơ bản, thiết thực, vững chắc", lấy nhiệm vụ bảo vệ chủ quyền biển, đảo và mục tiêu "Tàu là nhà, biển cả là quê hương" làm mệnh lệnh.',
      topic: 'Công tác huấn luyện'
    },
    {
      id: 10,
      type: 'choice',
      question: 'Mục tiêu xây dựng Lữ đoàn 162 theo tinh thần Nghị quyết Đại hội Đảng bộ Quân chủng Hải quân là gì?',
      options: {
        A: 'Xây dựng Lữ đoàn cách mạng, chính quy, tinh nhuệ, hiện đại, làm nòng cốt bảo vệ vững chắc chủ quyền biển, đảo',
        B: 'Xây dựng lực lượng chuyển sang làm kinh tế đơn thuần',
        C: 'Giảm biên chế tàu chiến đấu mặt nước',
        D: 'Chỉ duy trì tuần tra ven bờ'
      },
      correctOption: 'A',
      explanation: 'Xây dựng Lữ đoàn 162 chính quy, tinh nhuệ, hiện đại, là quả đấm thép trên biển bảo vệ vững chắc chủ quyền biển, đảo của Tổ quốc.',
      topic: 'Định hướng phát triển'
    },
    {
      id: 11,
      type: 'choice',
      question: 'Tàu hộ vệ tên lửa Gepard 3.9 mang số hiệu 011 của Lữ đoàn 162 vinh dự mang tên vị anh hùng dân tộc nào?',
      options: {
        A: 'Đinh Tiên Hoàng (Đinh Bộ Lĩnh)',
        B: 'Lý Thái Tổ (Lý Công Uẩn)',
        C: 'Trần Hưng Đạo (Trần Quốc Tuấn)',
        D: 'Quang Trung (Nguyễn Huệ)'
      },
      correctOption: 'A',
      explanation: 'Tàu 011 mang tên Hoàng đế Đinh Tiên Hoàng - người có công dẹp loạn 12 sứ quân, thống nhất non sông, lập nên nhà nước Đại Cồ Việt.',
      topic: 'Tên gọi tàu chiến'
    },
    {
      id: 12,
      type: 'choice',
      question: 'Tàu hộ vệ tên lửa Gepard 3.9 mang số hiệu 012 của Lữ đoàn 162 mang tên vị vua sáng lập triều đại nào?',
      options: {
        A: 'Lý Thái Tổ - Nhà Lý (Người định đô Thăng Long năm 1010)',
        B: 'Lê Thái Tổ - Nhà Hậu Lê',
        C: 'Ngô Quyền - Nhà Ngô',
        D: 'Trần Thái Tông - Nhà Trần'
      },
      correctOption: 'A',
      explanation: 'Tàu 012 mang tên vua Lý Thái Tổ, vị vua khởi dựng vương triều Lý và ban Chiếu dời đô về Thăng Long Hà Nội.',
      topic: 'Tên gọi tàu chiến'
    },
    {
      id: 13,
      type: 'choice',
      question: 'Tàu hộ vệ tên lửa Gepard 3.9 mang số hiệu 015 của Lữ đoàn 162 mang tên danh tướng ba lần đánh thắng quân Nguyên Mông nào?',
      options: {
        A: 'Quốc công Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn',
        B: 'Thái sư Trần Thủ Độ',
        C: 'Chiêu Minh Đại vương Trần Quang Khải',
        D: 'Bảo Nghĩa Vương Trần Bình Trọng'
      },
      correctOption: 'A',
      explanation: 'Tàu 015 mang tên Anh hùng dân tộc Trần Hưng Đạo - vị tướng kiệt xuất với chiến thắng Bạch Đằng lừng lẫy năm 1288.',
      topic: 'Tên gọi tàu chiến'
    },
    {
      id: 14,
      type: 'choice',
      question: 'Tàu hộ vệ tên lửa Gepard 3.9 mang số hiệu 016 của Lữ đoàn 162 mang tên vị Hoàng đế bách chiến bách thắng nào?',
      options: {
        A: 'Hoàng đế Quang Trung (Nguyễn Huệ)',
        B: 'Hoàng đế Gia Long',
        C: 'Hoàng đế Lê Thánh Tông',
        D: 'Bố Cái Đại Vương Phùng Hưng'
      },
      correctOption: 'A',
      explanation: 'Tàu 016 mang tên người anh hùng áo vải cờ đào Quang Trung - Nguyễn Huệ với chiến công Ngọc Hồi - Đống Đa đại phá 29 vạn quân Thanh.',
      topic: 'Tên gọi tàu chiến'
    },
    {
      id: 15,
      type: 'choice',
      question: 'Cuộc vận động nào được triển khai thường xuyên, liên tục nhằm nâng cao chất lượng quản lý, khai thác VKTBKT tại Lữ đoàn 162?',
      options: {
        A: 'Cuộc vận động 50 "Quản lý, khai thác VKTBKT tốt, bền, an toàn, tiết kiệm và an toàn giao thông"',
        B: 'Cuộc vận động Toàn dân đoàn kết xây dựng đời sống văn hóa',
        C: 'Cuộc vận động Vì người nghèo',
        D: 'Cuộc vận động Ngày thứ 7 tình nguyện'
      },
      correctOption: 'A',
      explanation: 'Cuộc vận động 50 là linh hồn trong công tác kỹ thuật, bảo đảm hệ số kỹ thuật cho tàu thuyền Lữ đoàn 162 luôn sẵn sàng rời bến làm nhiệm vụ.',
      topic: 'Cuộc vận động 50'
    },
    {
      id: 16,
      type: 'choice',
      question: 'Khẩu hiệu gắn bó máu thịt, thắm tình đồng đội của cán bộ, chiến sĩ hải quân trên các con tàu Lữ đoàn 162 là gì?',
      options: {
        A: '"Tàu là nhà, biển cả là quê hương, đồng đội là anh em ruột thịt"',
        B: '"Vượt nắng thắng mưa, say sưa rèn luyện"',
        C: '"Kỷ luật là sức mạnh quân đội"',
        D: '"Bám biển, giữ bờ, chắc tay súng"'
      },
      correctOption: 'A',
      explanation: 'Câu nói "Tàu là nhà, biển cả là quê hương, đồng đội là anh em ruột thịt" đã trở thành phương châm sống và chiến đấu của mỗi thủy thủ Lữ đoàn 162.',
      topic: 'Văn hóa tàu chiến'
    },
    {
      id: 17,
      type: 'choice',
      question: 'Năm 2021, Lữ đoàn 162 đã cử kíp tàu nào đại diện cho Hải quân Việt Nam tham gia môn thi "Cúp biển" tại Army Games (Nga)?',
      options: {
        A: 'Tàu 016 Quang Trung',
        B: 'Tàu 011 Đinh Tiên Hoàng',
        C: 'Tàu 012 Lý Thái Tổ',
        D: 'Tàu 375'
      },
      correctOption: 'A',
      explanation: 'Tàu 016 Quang Trung đã đại diện cho QĐND Việt Nam thi đấu xuất sắc môn Cúp biển tại TP Vladivostok (Nga) và giành Huy chương Bạc toàn đoàn.',
      topic: 'Hội thao quốc tế'
    },
    {
      id: 18,
      type: 'choice',
      question: 'Các tàu tên lửa tấn công nhanh đề án 1241.8 Molniya thuộc Hải đội 412 được trang bị tối đa bao nhiêu quả tên lửa chống hạm Uran-E?',
      options: {
        A: '16 quả tên lửa bố trí ở 4 cụm bệ phóng hai bên mạn',
        B: '8 quả tên lửa',
        C: '4 quả tên lửa',
        D: '24 quả tên lửa'
      },
      correctOption: 'A',
      explanation: 'Tàu Molniya 1241.8 mang tới 16 tên lửa Uran-E, tạo mật độ hỏa lực công kích hạm đội đối phương cực kỳ mạnh mẽ.',
      topic: 'Vũ khí tàu Molniya'
    },
    {
      id: 19,
      type: 'choice',
      question: 'Tiêu chuẩn xây dựng tổ chức Đảng "4 tốt" trong toàn Đảng bộ Lữ đoàn 162 gồm những nội dung nào?',
      options: {
        A: 'Hoàn thành tốt nhiệm vụ; sinh hoạt tốt; đoàn kết kỷ luật tốt; cán bộ, đảng viên tốt',
        B: 'Học tập tốt, lao động tốt, rèn luyện tốt, chiến đấu tốt',
        C: 'Tác chiến tốt, kỹ thuật tốt, hậu cần tốt, chính trị tốt',
        D: 'Giữ tốt, dùng bền, an toàn, tiết kiệm'
      },
      correctOption: 'A',
      explanation: 'Nghị quyết Trung ương xác định tiêu chí "Chi bộ bốn tốt", "Đảng bộ cơ sở bốn tốt": Hoàn thành tốt nhiệm vụ chính trị; Chất lượng sinh hoạt tốt; Đoàn kết, kỷ luật tốt; Cán bộ, đảng viên tốt.',
      topic: 'Xây dựng Đảng'
    },
    {
      id: 20,
      type: 'choice',
      question: 'Trong suốt quá trình xây dựng, chiến đấu và trưởng thành, Lữ đoàn 162 vinh dự được Đảng và Nhà nước trao tặng phần thưởng cao quý nào?',
      options: {
        A: 'Huân chương Bảo vệ Tổ quốc hạng Nhất, Huân chương Bảo vệ Tổ quốc hạng Nhì và Huân chương Quân công',
        B: 'Huân chương Sao vàng',
        C: 'Huân chương Lao động hạng Nhất',
        D: 'Huân chương Độc lập hạng Ba'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn 162 đã vinh dự được Chủ tịch nước trao tặng Huân chương Bảo vệ Tổ quốc hạng Nhất, Huân chương Bảo vệ Tổ quốc hạng Nhì, Huân chương Quân công cùng nhiều Cờ thi đua của Thủ tướng Chính phủ và Bộ Quốc phòng.',
      topic: 'Phần thưởng cao quý'
    },
    {
      id: 21,
      type: 'prediction',
      question: 'CÂU DỰ ĐOÁN (CÂU PHỤ PHÂN ĐỊNH GIẢI THƯỞNG): Theo đồng chí, có bao nhiêu người trả lời đúng tất cả 20 câu hỏi trắc nghiệm trong tuần này?',
      predictionPrompt: 'Nhập số người dự đoán trả lời đúng 20/20 câu (Ví dụ: 125)',
      topic: 'Dự đoán số người trả lời đúng',
      explanation: 'Câu hỏi phụ bắt buộc dùng để phân định giải thưởng khi có nhiều thí sinh đạt cùng điểm số và thời gian làm bài.'
    }
  ],
  Tuan_2: [
    {
      id: 1,
      type: 'choice',
      question: 'Cặp tàu hộ vệ tên lửa Gepard 3.9 (Project 11661E) đầu tiên của Hải quân Việt Nam mang số hiệu nào?',
      options: {
        A: 'Tàu 011 Đinh Tiên Hoàng và Tàu 012 Lý Thái Tổ',
        B: 'Tàu 015 Trần Hưng Đạo và Tàu 016 Quang Trung',
        C: 'Tàu 375 và Tàu 376',
        D: 'Tàu 186 Đà Nẵng và Tàu 187 Bà Rịa - Vũng Tàu'
      },
      correctOption: 'A',
      explanation: 'Cặp tàu hộ vệ tên lửa Gepard 3.9 đầu tiên gia nhập biên chế Lữ đoàn 162 năm 2011 mang số hiệu 011 Đinh Tiên Hoàng và 012 Lý Thái Tổ.',
      topic: 'Trang bị tàu chiến'
    },
    {
      id: 2,
      type: 'choice',
      question: 'Cặp tàu hộ vệ tên lửa Gepard 3.9 thứ hai được trang bị hệ thống săn ngầm hiện đại mang tên hai vị anh hùng dân tộc nào?',
      options: {
        A: 'Tàu 015 Trần Hưng Đạo và Tàu 016 Quang Trung',
        B: 'Tàu 011 Đinh Tiên Hoàng và Tàu 012 Lý Thái Tổ',
        C: 'Tàu 013 Ngô Quyền và Tàu 014 Lê Lợi',
        D: 'Tàu 017 Phan Bội Châu và Tàu 018 Phan Chu Trinh'
      },
      correctOption: 'A',
      explanation: 'Tàu 015 Trần Hưng Đạo và 016 Quang Trung được tiếp nhận đầu năm 2018, trang bị bổ sung hệ thống vũ khí chống ngầm chuyên dụng.',
      topic: 'Vũ khí trang bị'
    },
    {
      id: 3,
      type: 'choice',
      question: 'Các tàu tên lửa tấn công nhanh được đóng trong nước thuộc biên chế Hải đội 412, Lữ đoàn 162 thuộc đề án (project) nào?',
      options: {
        A: 'Đề án 1241.8 (Tàu tên lửa lớp Molniya trang bị 16 quả tên lửa Uran-E)',
        B: 'Đề án 11661E',
        C: 'Đề án TT-400TP',
        D: 'Đề án 1241.RE'
      },
      correctOption: 'A',
      explanation: 'Tàu tên lửa Molniya 1241.8 (như Tàu 375, 376, 381...) được mệnh danh là "Tia chớp", trang bị 16 quả tên lửa hành trình chống hạm Uran-E với hỏa lực cực mạnh.',
      topic: 'Tàu tên lửa Molniya'
    },
    {
      id: 4,
      type: 'choice',
      question: 'Hệ thống tên lửa hành trình chống hạm chủ lực trang bị trên các tàu hộ vệ Gepard 3.9 và Molniya 1241.8 của Lữ đoàn 162 có tên là gì?',
      options: {
        A: 'Tên lửa Uran-E (Kh-35E)',
        B: 'Tên lửa Kalibr-NK',
        C: 'Tên lửa Exocet',
        D: 'Tên lửa Harpoon'
      },
      correctOption: 'A',
      explanation: 'Tên lửa chống hạm Uran-E (Kh-35E) là vũ khí công kích uy lực với khả năng bay bám mặt sóng và độ chính xác rất cao.',
      topic: 'Vũ khí tên lửa'
    },
    {
      id: 5,
      type: 'choice',
      question: 'Pháo hạm chính đặt ở mũi tàu hộ vệ tên lửa Gepard 3.9 của Lữ đoàn 162 có cỡ nòng bao nhiêu mm?',
      options: {
        A: 'Cỡ nòng 76,2 mm (Pháo tự động AK-176M)',
        B: 'Cỡ nòng 100 mm',
        C: 'Cỡ nòng 57 mm',
        D: 'Cỡ nòng 130 mm'
      },
      correctOption: 'A',
      explanation: 'Pháo hạm AK-176M cỡ nòng 76,2 mm có tốc độ bắn lên tới 120 phát/phút, tiêu diệt mục tiêu trên mặt nước, trên bờ và mục tiêu bay.',
      topic: 'Hỏa lực pháo hạm'
    },
    {
      id: 6,
      type: 'choice',
      question: 'Tổ hợp pháo - tên lửa phòng không tầm gần cực kỳ lợi hại bảo vệ đuôi tàu Gepard 3.9 có tên là gì?',
      options: {
        A: 'Tổ hợp Palma-SU (trang bị pháo bắn nhanh 30mm và tên lửa Sosna-R)',
        B: 'Tổ hợp Phalanx CIWS',
        C: 'Tổ hợp Pantsir-S1',
        D: 'Tổ hợp S-300'
      },
      correctOption: 'A',
      explanation: 'Tổ hợp Palma-SU tích hợp 2 pháo AO-18KD 30mm và tên lửa Sosna-R, đánh chặn tên lửa diệt hạm và phương tiện bay tiếp cận.',
      topic: 'Phòng không tầm gần'
    },
    {
      id: 7,
      type: 'choice',
      question: 'Loại trực thăng săn ngầm nào thường xuyên phối thuộc cất, hạ cánh trên sàn đỗ của tàu Gepard 3.9 Lữ đoàn 162?',
      options: {
        A: 'Trực thăng Ka-28 (thuộc Lữ đoàn Không quân Hải quân 954)',
        B: 'Trực thăng Mi-8',
        C: 'Trực thăng CH-47',
        D: 'Trực thăng UH-1'
      },
      correctOption: 'A',
      explanation: 'Trực thăng săn ngầm Ka-28 phối hợp hiệp đồng tác chiến và cất hạ cánh thành thục trên sàn đỗ các tàu 011, 012, 015, 016.',
      topic: 'Hiệp đồng quân binh chủng'
    },
    {
      id: 8,
      type: 'choice',
      question: 'Pháo bắn nhanh 6 nòng 30mm phòng không tầm cực gần trang bị trên tàu Molniya 1241.8 mang ký hiệu gì?',
      options: {
        A: 'Pháo AK-630M (tốc độ bắn 4.000 - 5.000 phát/phút)',
        B: 'Pháo ZU-23-2',
        C: 'Pháo 37mm hai nòng',
        D: 'Pháo 57mm'
      },
      correctOption: 'A',
      explanation: 'Pháo AK-630M với 6 nòng xoay 30mm tạo lưới lửa đánh chặn tên lửa chống hạm và mục tiêu bay tầm thấp.',
      topic: 'Pháo bắn nhanh AK-630M'
    },
    {
      id: 9,
      type: 'choice',
      question: 'Tàu 015 Trần Hưng Đạo và 016 Quang Trung được trang bị thêm hệ thống vũ khí gì so với cặp tàu 011, 012?',
      options: {
        A: 'Ngư lôi chống ngầm 533mm và hệ thống định vị thủy âm (sonar) phát hiện tàu ngầm',
        B: 'Tên lửa hành trình mặt đất',
        C: 'Hệ thống phóng lôi 400mm',
        D: 'Thủy lôi đáy biển'
      },
      correctOption: 'A',
      explanation: 'Cặp tàu Gepard thứ hai được tích hợp 4 ống phóng ngư lôi 533mm và sonar săn ngầm hiện đại.',
      topic: 'Vũ khí chống ngầm'
    },
    {
      id: 10,
      type: 'choice',
      question: 'Hệ thống radar giám sát mục tiêu bề mặt và trên không chủ lực trên đỉnh tháp radar tàu Gepard 3.9 có tên là gì?',
      options: {
        A: 'Radar Pozitiv-ME (Positiv-ME1.2)',
        B: 'Radar AN/SPY-1',
        C: 'Radar P-18',
        D: 'Radar Kolchuga'
      },
      correctOption: 'A',
      explanation: 'Radar Pozitiv-ME hình vòm cầu búp sóng quét 3D phát hiện cùng lúc nhiều mục tiêu trên không và trên biển.',
      topic: 'Khí tài radar'
    },
    {
      id: 11,
      type: 'choice',
      question: 'Vận tốc tối đa của các tàu tên lửa tấn công nhanh Molniya 1241.8 có thể đạt tới bao nhiêu hải lý/giờ?',
      options: {
        A: 'Gần 40 hải lý/giờ (khoảng 70 km/h)',
        B: 'Khoảng 20 hải lý/giờ',
        C: 'Khoảng 15 hải lý/giờ',
        D: 'Khoảng 60 hải lý/giờ'
      },
      correctOption: 'A',
      explanation: 'Nhờ động cơ turbine khí công suất cực lớn, tàu Molniya có thể lao đi như tia chớp trên biển với vận tốc xấp xỉ 38-40 hải lý/giờ.',
      topic: 'Đặc tính kỹ chiến thuật'
    },
    {
      id: 12,
      type: 'choice',
      question: 'Nhiệm vụ tác chiến chủ yếu của lực lượng tàu chiến đấu mặt nước Lữ đoàn 162 là gì?',
      options: {
        A: 'Tác chiến độc lập hoặc hiệp đồng tiêu diệt tàu mặt nước, tàu ngầm địch; bảo vệ tuyến hàng hải và chi viện đảo',
        B: 'Chỉ làm nhiệm vụ vận tải hàng hóa',
        C: 'Chỉ rải dây cáp thông tin ngầm',
        D: 'Chỉ cứu hộ ngư dân ven bờ'
      },
      correctOption: 'A',
      explanation: 'Nhiệm vụ tác chiến cốt lõi của Lữ đoàn 162 là đòn tấn công uy lực mặt nước, chống ngầm, phòng không bảo vệ sườn biển đảo.',
      topic: 'Nhiệm vụ tác chiến'
    },
    {
      id: 13,
      type: 'choice',
      question: 'Mô hình sáng kiến cải tiến kỹ thuật ở Lữ đoàn 162 đã tập trung giải quyết vấn đề cấp thiết nào?',
      options: {
        A: 'Nội địa hóa vật tư phụ tùng, làm chủ phần mềm điều khiển và bảo dưỡng trang thiết bị hiện đại',
        B: 'Nhập khẩu 100% không cần nghiên cứu',
        C: 'Cắt giảm quy trình bảo dưỡng định kỳ',
        D: 'Chỉ bảo dưỡng phần vỏ tàu'
      },
      correctOption: 'A',
      explanation: 'Cán bộ kỹ thuật Lữ đoàn 162 đã có hàng chục sáng kiến cải tiến kỹ thuật đạt giải thưởng Tuổi trẻ sáng tạo Quân đội.',
      topic: 'Sáng kiến cải tiến'
    },
    {
      id: 14,
      type: 'choice',
      question: 'Để chuẩn bị cho chuyến đi biển dài ngày, công tác bảo đảm hậu cần - kỹ thuật của tàu phải đạt yêu cầu gì?',
      options: {
        A: '100% vũ khí trang bị đồng bộ; đủ dự trữ lương thực, thực phẩm, nhiên liệu, nước ngọt theo định mức',
        B: 'Chỉ cần đủ nhiên liệu dầu diesel',
        C: 'Không cần kiểm tra vũ khí đạn dược',
        D: 'Chỉ mang theo lương khô'
      },
      correctOption: 'A',
      explanation: 'Trước mỗi chuyến rời bến, công tác chuẩn bị xuất phát chiến đấu được kiểm tra nghiêm ngặt qua 3 giai đoạn độc lập.',
      topic: 'Chuẩn bị chiến đấu'
    },
    {
      id: 15,
      type: 'choice',
      question: 'Các tàu hộ vệ tên lửa Gepard 3.9 của Lữ đoàn 162 có lượng giãn nước đầy tải khoảng bao nhiêu tấn?',
      options: {
        A: 'Khoảng 2.100 tấn',
        B: 'Khoảng 500 tấn',
        C: 'Khoảng 8.000 tấn',
        D: 'Khoảng 10.000 tấn'
      },
      correctOption: 'A',
      explanation: 'Tàu Gepard 3.9 có lượng giãn nước tiêu chuẩn 1.900 tấn và đầy tải khoảng 2.100 tấn, chiều dài hơn 102 mét.',
      topic: 'Thông số kỹ thuật'
    },
    {
      id: 16,
      type: 'choice',
      question: 'Công tác huấn luyện bơi và rèn luyện thể lực của thủy thủ Lữ đoàn 162 yêu cầu tiêu chuẩn nào?',
      options: {
        A: '100% cán bộ, chiến sĩ biết bơi giỏi, có sức bền chịu sóng gió cấp 6, cấp 7',
        B: 'Chỉ yêu cầu bơi cơ bản 25 mét',
        C: 'Không bắt buộc đối với khối kỹ thuật',
        D: 'Chỉ rèn luyện khi có hội thao'
      },
      correctOption: 'A',
      explanation: 'Thủy thủ Lữ đoàn 162 được rèn luyện thể lực đặc chủng: bơi biển, bơi vũ trang, đu quay hàng hải, chống say sóng.',
      topic: 'Rèn luyện thể lực'
    },
    {
      id: 17,
      type: 'choice',
      question: 'Biện pháp cơ bản để nâng cao chất lượng huấn luyện làm chủ trang bị kỹ thuật mới tại Lữ đoàn 162 là gì?',
      options: {
        A: 'Gắn lý thuyết với thực hành thao tác trên trang thiết bị thật; phân loại đối tượng, cấp trên bồi dưỡng cấp dưới',
        B: 'Chỉ học trên mô hình giấy',
        C: 'Khoán trắng cho từng cá nhân',
        D: 'Học vẹt không cần hiểu nguyên lý'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn áp dụng phương pháp "Cầm tay chỉ việc", huấn luyện tại vị trí chiến đấu và kiểm tra sát hạch nghiêm túc.',
      topic: 'Phương pháp huấn luyện'
    },
    {
      id: 18,
      type: 'choice',
      question: 'Quy trình kiểm tra tình trạng vũ khí, khí tài, máy móc trên tàu hằng ngày được gọi là gì?',
      options: {
        A: 'Chế độ sấy máy, thông điện kiểm tra vũ khí trang bị kỹ thuật',
        B: 'Chế độ vệ sinh thông thường',
        C: 'Chế độ bảo dưỡng quý',
        D: 'Chế độ tuần tra ca kíp'
      },
      correctOption: 'A',
      explanation: 'Mỗi sáng, các ngành trên tàu đều thực hiện chế độ sấy máy, thông điện khí tài đúng quy trình công nghệ nghiêm ngặt.',
      topic: 'Quy trình kỹ thuật'
    },
    {
      id: 19,
      type: 'choice',
      question: 'Hệ thống phân chia các ngành chuyên môn kỹ thuật trên tàu chiến đấu mặt nước bao gồm bao nhiêu ngành chính?',
      options: {
        A: '5 ngành: Ngành 1 (Hàng hải), Ngành 2 (Vũ khí), Ngành 3 (Vũ khí dưới nước), Ngành 4 (Thông tin - Radar), Ngành 5 (Cơ điện)',
        B: '2 ngành: Lái tàu và Máy tàu',
        C: '3 ngành: Boong, Máy, Bếp',
        D: '8 ngành độc lập'
      },
      correctOption: 'A',
      explanation: 'Tổ chức ngành trên tàu Hải quân chuẩn hóa theo 5 ngành nghiệp vụ hiệp đồng chặt chẽ dưới sự chỉ huy của Thuyền trưởng.',
      topic: 'Tổ chức ngành trên tàu'
    },
    {
      id: 20,
      type: 'choice',
      question: 'Phương châm cốt lõi trong công tác huấn luyện làm chủ trang bị kỹ thuật mới, hiện đại của Lữ đoàn 162 là gì?',
      options: {
        A: '"Cơ bản, thiết thực, vững chắc", coi trọng huấn luyện đồng bộ, chuyên sâu, sát thực tế chiến đấu',
        B: '"Đốt cháy giai đoạn, làm nhanh bỏ bớt quy trình"',
        C: '"Chỉ huấn luyện lý thuyết trong phòng học"',
        D: '"Huấn luyện theo cảm tính, tùy tiện"'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn 162 luôn kiên định phương châm huấn luyện "Cơ bản, thiết thực, vững chắc", đột phá vào làm chủ chuyên sâu VKTBKT mới, lấy nhiệm vụ bảo vệ chủ quyền biển đảo làm mục tiêu huấn luyện.',
      topic: 'Phương châm huấn luyện'
    },
    {
      id: 21,
      type: 'prediction',
      question: 'CÂU DỰ ĐOÁN (CÂU PHỤ PHÂN ĐỊNH GIẢI THƯỞNG): Theo đồng chí, có bao nhiêu người trả lời đúng tất cả 20 câu hỏi trắc nghiệm trong tuần này?',
      predictionPrompt: 'Nhập số người dự đoán trả lời đúng 20/20 câu (Ví dụ: 145)',
      topic: 'Dự đoán số người trả lời đúng',
      explanation: 'Câu hỏi phụ bắt buộc dùng để phân định giải thưởng khi có nhiều thí sinh đạt cùng điểm số và thời gian làm bài.'
    }
  ],
  Tuan_3: [
    {
      id: 1,
      type: 'choice',
      question: 'Năm 2019, Tàu 016 Quang Trung (Lữ đoàn 162) đã vượt hàng ngàn hải lý tham gia sự kiện đối ngoại quốc phòng nào tại Liên bang Nga?',
      options: {
        A: 'Lễ Duyệt binh kỷ niệm 323 năm thành lập Hải quân Liên bang Nga tại Vladivostok',
        B: 'Lễ Duyệt binh tại Saint Petersburg',
        C: 'Diễn tập RIMPAC tại Hawaii',
        D: 'Diễn tập Malabar tại Ấn Độ'
      },
      correctOption: 'A',
      explanation: 'Tháng 7/2019, Tàu 016 Quang Trung vượt gần 5.000 hải lý tham gia Lễ duyệt binh tàu Hải quân quốc tế tại Vladivostok (Nga).',
      topic: 'Duyệt binh Nga'
    },
    {
      id: 2,
      type: 'choice',
      question: 'Tại Hội thao Quân sự quốc tế (Army Games) 2021 tổ chức tại Liên bang Nga, Tàu 016 Quang Trung đã xuất sắc giành giải gì ở môn "Cúp biển"?',
      options: {
        A: 'Huy chương Bạc toàn đoàn (xếp thứ Hai chung cuộc)',
        B: 'Huy chương Vàng tuyệt đối',
        C: 'Huy chương Đồng',
        D: 'Giải phong cách'
      },
      correctOption: 'A',
      explanation: 'Kíp tàu 016 Quang Trung đại diện Hải quân Việt Nam đã thi đấu kiên cường, xuất sắc giành Huy chương Bạc môn "Cúp biển" tại Army Games 2021.',
      topic: 'Army Games'
    },
    {
      id: 3,
      type: 'choice',
      question: 'Tàu 015 Trần Hưng Đạo từng đại diện Hải quân Việt Nam tham gia Diễn tập đa phương Kakadu tại quốc gia nào?',
      options: {
        A: 'Australia (Úc)',
        B: 'Hoa Kỳ',
        C: 'Nhật Bản',
        D: 'Vương quốc Anh'
      },
      correctOption: 'A',
      explanation: 'Năm 2018, Tàu 015 Trần Hưng Đạo thực hiện chuyến hải trình lịch sử tham gia Diễn tập Kakadu tại Darwin, Australia cùng hơn 20 quốc gia.',
      topic: 'Hải trình quốc tế'
    },
    {
      id: 4,
      type: 'choice',
      question: 'Diễn tập đa phương MILAN mà các tàu của Lữ đoàn 162 nhiều lần tham dự do Hải quân nước nào chủ trì tổ chức?',
      options: {
        A: 'Hải quân Ấn Độ',
        B: 'Hải quân Singapore',
        C: 'Hải quân Thái Lan',
        D: 'Hải quân Pháp'
      },
      correctOption: 'A',
      explanation: 'Diễn tập MILAN tại Ấn Độ quy tụ lực lượng hải quân hùng hậu hàng chục quốc gia, tàu Lữ đoàn 162 luôn hoàn thành xuất sắc các nội dung.',
      topic: 'Diễn tập MILAN'
    },
    {
      id: 5,
      type: 'choice',
      question: 'Diễn tập hải quân đa phương mang tên KOMODO do quốc gia nào trong khối ASEAN đăng cai tổ chức?',
      options: {
        A: 'Indonesia',
        B: 'Malaysia',
        C: 'Philippines',
        D: 'Brunei'
      },
      correctOption: 'A',
      explanation: 'Diễn tập Komodo do Hải quân Indonesia tổ chức định kỳ 2 năm một lần, tập trung vào an ninh hàng hải và tìm kiếm cứu nạn.',
      topic: 'Diễn tập Komodo'
    },
    {
      id: 6,
      type: 'choice',
      question: 'Khi thực hiện các chuyến hải trình đối ngoại quốc phòng vượt đại dương, thủy thủ Lữ đoàn 162 sử dụng ngôn ngữ liên lạc quốc tế chủ yếu nào?',
      options: {
        A: 'Tiếng Anh chuyên ngành hàng hải (SMCP) theo quy chuẩn quốc tế',
        B: 'Tiếng Pháp',
        C: 'Tiếng Nga',
        D: 'Chỉ dùng cờ hiệu hàng hải'
      },
      correctOption: 'A',
      explanation: 'Sĩ quan và kíp lái Lữ đoàn 162 sử dụng thành thạo tiếng Anh chuẩn hàng hải SMCP để tác nghiệp và chỉ huy cùng tàu bè quốc tế.',
      topic: 'Ngoại ngữ chuyên ngành'
    },
    {
      id: 7,
      type: 'choice',
      question: 'Ý nghĩa to lớn của các hoạt động đối ngoại quốc phòng và duyệt binh tàu quốc tế của Lữ đoàn 162 là gì?',
      options: {
        A: 'Khẳng định vị thế, bản lĩnh Hải quân Việt Nam, tăng cường tin cậy chiến lược và bảo vệ Tổ quốc từ sớm, từ xa',
        B: 'Chỉ đơn thuần là chuyến du lịch đường biển',
        C: 'Quảng bá dịch vụ vận tải hàng hải',
        D: 'Thay thế nhiệm vụ trực sẵn sàng chiến đấu'
      },
      correctOption: 'A',
      explanation: 'Mỗi chuyến hải trình là một sứ giả hòa bình, nâng cao uy tín Quân đội nhân dân Việt Nam, xây dựng vùng biển hòa bình, hữu nghị, hợp tác.',
      topic: 'Ý nghĩa đối ngoại'
    },
    {
      id: 8,
      type: 'choice',
      question: 'Trong tuần tra bảo vệ chủ quyền, biên đội tàu Lữ đoàn 162 luôn kiên định nguyên tắc đối sách nào trên biển?',
      options: {
        A: 'Kiên quyết, kiên trì, bình tĩnh, khôn khéo, xử lý đúng đối sách, giữ vững chủ quyền và môi trường hòa bình',
        B: 'Sử dụng vũ lực khi chưa có chỉ lệnh',
        C: 'Rời bỏ vị trí chốt trực',
        D: 'Không báo cáo về Sở chỉ huy'
      },
      correctOption: 'A',
      explanation: 'Cán bộ, chiến sĩ Lữ đoàn 162 luôn nắm chắc đối sách, xử lý khôn khéo các tình huống phức tạp trên biển, bảo vệ vững chắc từng tấc biển thiêng liêng.',
      topic: 'Xử lý đối sách'
    },
    {
      id: 9,
      type: 'choice',
      question: 'Bộ quy tắc ứng xử cho các cuộc chạm trán ngoài ý muốn trên biển mà Hải quân các nước áp dụng có tên là gì?',
      options: {
        A: 'Quy tắc CUES (Code for Unplanned Encounters at Sea)',
        B: 'Hiệp ước Warsaw',
        C: 'Quy chuẩn SOLAS',
        D: 'Quy tắc MARPOL'
      },
      correctOption: 'A',
      explanation: 'Bộ quy tắc CUES giúp tàu thuyền hải quân các nước tránh nguy cơ va chạm và hiểu lầm khi gặp nhau trên vùng biển quốc tế.',
      topic: 'Quy tắc CUES'
    },
    {
      id: 10,
      type: 'choice',
      question: 'Tàu 015 Trần Hưng Đạo từng thăm hữu nghị thành phố Trạm Giang và Thanh Đảo của nước nào trong hoạt động giao lưu hải quân?',
      options: {
        A: 'Trung Quốc',
        B: 'Hàn Quốc',
        C: 'Nhật Bản',
        D: 'Ấn Độ'
      },
      correctOption: 'A',
      explanation: 'Tàu 015 Trần Hưng Đạo đã có các chuyến thăm và tham gia duyệt binh kỷ niệm 70 năm Hải quân Trung Quốc tại Thanh Đảo.',
      topic: 'Giao lưu hữu nghị'
    },
    {
      id: 11,
      type: 'choice',
      question: 'Tàu 012 Lý Thái Tổ từng vượt xích đạo tới đảo quốc nào để tham gia Triển lãm Quốc phòng và Hàng hải Quốc tế IMDEX?',
      options: {
        A: 'Singapore',
        B: 'Philippines',
        C: 'Thái Lan',
        D: 'Campuchia'
      },
      correctOption: 'A',
      explanation: 'Tàu 012 Lý Thái Tổ đại diện Hải quân Việt Nam tham dự Triển lãm IMDEX tại Căn cứ Changi, Singapore.',
      topic: 'Triển lãm IMDEX'
    },
    {
      id: 12,
      type: 'choice',
      question: 'Vùng biển nào là hướng bảo vệ chủ quyền trọng yếu, thường xuyên có sự hiện diện của các biên đội tàu Lữ đoàn 162?',
      options: {
        A: 'Vùng biển quần đảo Trường Sa, DK1 và thềm lục địa phía Nam',
        B: 'Vịnh Lan Hạ',
        C: 'Sông Lô',
        D: 'Hồ Ba Bể'
      },
      correctOption: 'A',
      explanation: 'Các tàu Lữ đoàn 162 thường xuyên thực hiện nhiệm vụ trực chốt, tuần tra trinh sát bảo vệ chủ quyền Trường Sa và nhà giàn DK1.',
      topic: 'Tuần tra Trường Sa'
    },
    {
      id: 13,
      type: 'choice',
      question: 'Hành động đẹp thể hiện tinh thần nhân đạo của các tàu Lữ đoàn 162 đối với ngư dân Việt Nam vươn khơi bám biển là gì?',
      options: {
        A: 'Hỗ trợ nước ngọt, lương thực, cấp phát thuốc miễn phí và cứu nạn ngư dân khi gặp sự cố bão gió trên biển xa',
        B: 'Kiểm tra giấy tờ gây khó khăn',
        C: 'Không cho tiếp cận mạn tàu',
        D: 'Yêu cầu ngư dân về bờ sớm'
      },
      correctOption: 'A',
      explanation: 'Chương trình "Hải quân Việt Nam làm điểm tựa cho ngư dân vươn khơi, bám biển" luôn được các kíp tàu Lữ đoàn 162 thực hiện chu đáo.',
      topic: 'Điểm tựa ngư dân'
    },
    {
      id: 14,
      type: 'choice',
      question: 'Trang bị thông tin liên lạc vệ tinh trên các tàu Gepard 3.9 giúp tàu kết nối thông suốt với Sở chỉ huy nào?',
      options: {
        A: 'Sở chỉ huy Lữ đoàn 162, Sở chỉ huy Vùng 4 và Sở chỉ huy Quân chủng Hải quân ở mọi vùng biển',
        B: 'Chỉ liên lạc nội bộ trong tàu',
        C: 'Chỉ liên lạc khi về đến cảng',
        D: 'Chỉ liên lạc qua bưu điện'
      },
      correctOption: 'A',
      explanation: 'Hệ thống thông tin vệ tinh băng rộng bảo đảm mệnh lệnh chỉ huy tác chiến thông suốt 24/24 giờ ở mọi tọa độ biển.',
      topic: 'Thông tin liên lạc'
    },
    {
      id: 15,
      type: 'choice',
      question: 'Phương châm xây dựng nền quốc phòng của Việt Nam theo Sách trắng Quốc phòng là "Bốn không", trong đó điểm đầu tiên là gì?',
      options: {
        A: 'Không tham gia liên minh quân sự',
        B: 'Không mua sắm vũ khí mới',
        C: 'Không xây dựng lực lượng vũ trang',
        D: 'Không cho tàu thuyền nước ngoài ghé cảng'
      },
      correctOption: 'A',
      explanation: 'Nguyên tắc quốc phòng "4 không": Không liên minh quân sự; không cho nước ngoài đặt căn cứ; không liên kết chống nước thứ ba; không dùng vũ lực.',
      topic: 'Chính sách quốc phòng'
    },
    {
      id: 16,
      type: 'choice',
      question: 'Hằng năm, Lữ đoàn 162 phối hợp luyện tập chung trên biển với lực lượng nào của Bộ Công an và Bộ Tư lệnh Cảnh sát biển?',
      options: {
        A: 'Luyện tập phương án chống cướp biển, bảo đảm an ninh hàng hải và tìm kiếm cứu nạn',
        B: 'Chỉ huấn luyện trên bộ',
        C: 'Không phối hợp tác chiến',
        D: 'Chỉ kiểm tra hộ khẩu ven biển'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn thường xuyên hiệp đồng diễn tập bảo vệ an ninh trật tự, chống cướp biển và cứu hộ cứu nạn với các lực lượng chấp pháp trên biển.',
      topic: 'Hiệp đồng an ninh'
    },
    {
      id: 17,
      type: 'choice',
      question: 'Chuyến hải trình dài ngày trên biển xa của kíp tàu Lữ đoàn 162 thường kéo dài bao nhiêu ngày đêm?',
      options: {
        A: 'Hàng chục ngày đêm liên tục trên biển, vượt hàng nghìn hải lý trong điều kiện sóng gió khắc nghiệt',
        B: 'Chỉ 2 tiếng trong ngày',
        C: 'Chỉ đi trong tầm nhìn thấy bờ',
        D: 'Chỉ neo đậu tại vịnh'
      },
      correctOption: 'A',
      explanation: 'Các chuyến đi biển đối ngoại quốc phòng hay tuần tra Trường Sa đòi hỏi sức chịu đựng phi thường của cán bộ, thủy thủ.',
      topic: 'Hải trình vượt trùng khơi'
    },
    {
      id: 18,
      type: 'choice',
      question: 'Khi chào đón đoàn ngoại giao hoặc chỉ huy quân đội quốc tế lên thăm tàu, nghi thức hàng hải nào được thực hiện trang trọng?',
      options: {
        A: 'Nghi thức thổi còi tàu, hàng tiêu binh danh dự bồng súng và kéo cờ quốc gia theo điều lệnh hải quân',
        B: 'Chỉ bắt tay xã giao',
        C: 'Không đón tiếp trên boong',
        D: 'Chỉ bật nhạc qua loa'
      },
      correctOption: 'A',
      explanation: 'Nghi lễ đón tiếp trên tàu chiến Hải quân Việt Nam tuân theo Điều lệnh Quân đội và tập quán lễ tân ngoại giao hàng hải quốc tế.',
      topic: 'Nghi lễ hàng hải'
    },
    {
      id: 19,
      type: 'choice',
      question: 'Hình ảnh người lính thủy Lữ đoàn 162 trong mắt bạn bè quốc tế sau các chuyến thăm ngoại giao là gì?',
      options: {
        A: 'Chính quy, tinh nhuệ, thân thiện, bản lĩnh, tinh thần kỷ luật cao và mến khách',
        B: 'Khép kín, ngại giao tiếp',
        C: 'Thiếu tự tin trong tác nghiệp',
        D: 'Không am hiểu luật pháp quốc tế'
      },
      correctOption: 'A',
      explanation: 'Sĩ quan, thủy thủ Lữ đoàn 162 luôn để lại ấn tượng tốt đẹp, khẳng định hình ảnh Bộ đội Cụ Hồ - Người chiến sĩ Hải quân thời kỳ mới.',
      topic: 'Hình ảnh chiến sĩ Hải quân'
    },
    {
      id: 20,
      type: 'choice',
      question: 'Trong các chuyến tuần tra liên hợp và hoạt động đối ngoại quốc phòng trên biển, cán bộ, chiến sĩ Lữ đoàn 162 luôn quán triệt và thực hiện nghiêm túc nguyên tắc chỉ đạo nào?',
      options: {
        A: 'Kiên quyết, kiên trì đấu tranh bảo vệ chủ quyền, giữ vững môi trường hòa bình, ổn định, xử lý chuẩn xác theo luật pháp Việt Nam và luật pháp quốc tế (UNCLOS 1982)',
        B: 'Tự ý nổ súng không theo mệnh lệnh cấp trên',
        C: 'Lùi bước khi gặp tình huống phức tạp',
        D: 'Không tuân thủ các quy tắc an toàn hàng hải quốc tế'
      },
      correctOption: 'A',
      explanation: 'Cán bộ, thủy thủ Lữ đoàn 162 luôn đề cao tính kỷ luật, mưu trí, kiên quyết, kiên trì, bình tĩnh xử trí các tình huống theo đúng đối sách, tôn trọng Công ước LHQ về Luật Biển 1982 (UNCLOS 1982).',
      topic: 'Nguyên tắc đấu tranh'
    },
    {
      id: 21,
      type: 'prediction',
      question: 'CÂU DỰ ĐOÁN (CÂU PHỤ PHÂN ĐỊNH GIẢI THƯỞNG): Theo đồng chí, có bao nhiêu người trả lời đúng tất cả 20 câu hỏi trắc nghiệm trong tuần này?',
      predictionPrompt: 'Nhập số người dự đoán trả lời đúng 20/20 câu (Ví dụ: 160)',
      topic: 'Dự đoán số người trả lời đúng',
      explanation: 'Câu hỏi phụ bắt buộc dùng để phân định giải thưởng khi có nhiều thí sinh đạt cùng điểm số và thời gian làm bài.'
    }
  ],
  Tuan_4: [
    {
      id: 1,
      type: 'choice',
      question: 'Tiêu chuẩn xây dựng đơn vị Vững mạnh toàn diện "Mẫu mực, tiêu biểu" ở Lữ đoàn 162 bao gồm bao nhiêu tiêu chuẩn?',
      options: {
        A: '5 tiêu chuẩn toàn diện theo Chỉ thị của Bộ trưởng Bộ Quốc phòng',
        B: '2 tiêu chuẩn đơn lẻ',
        C: '7 tiêu chuẩn riêng biệt',
        D: 'Không có tiêu chuẩn cố định'
      },
      correctOption: 'A',
      explanation: '5 tiêu chuẩn VMTD "Mẫu mực, tiêu biểu": Chính trị vững mạnh; Tổ chức biên chế tốt, huấn luyện giỏi; Xây dựng chính quy, rèn luyện kỷ luật nghiêm; Công tác hậu cần - kỹ thuật tốt; Tài chính công khai, minh bạch.',
      topic: 'Mẫu mực tiêu biểu'
    },
    {
      id: 2,
      type: 'choice',
      question: 'Khẩu hiệu thi đua xuyên suốt trong xây dựng chính quy, rèn luyện kỷ luật tại Lữ đoàn 162 là gì?',
      options: {
        A: '"Đoàn kết, mẫu mực, kỷ cương, sáng tạo, quyết thắng"',
        B: '"Làm việc theo cảm hứng"',
        C: '"Tự do trong giờ nghỉ"',
        D: '"Đơn giản hóa điều lệnh"'
      },
      correctOption: 'A',
      explanation: 'Khẩu hiệu thi đua rèn luyện kỷ luật đã tạo nên nếp sống quân nhân chuẩn mực cho cán bộ, chiến sĩ Lữ đoàn 162.',
      topic: 'Kỷ luật chính quy'
    },
    {
      id: 3,
      type: 'choice',
      question: 'Mô hình học tập ngoại ngữ tiêu biểu nào đã trở thành điểm sáng của Lữ đoàn 162 trong toàn Quân chủng?',
      options: {
        A: 'Mô hình "Câu lạc bộ tiếng Anh hàng hải", mỗi ngày học 5 từ mới chuyên ngành',
        B: 'Mô hình tự phát không có người hướng dẫn',
        C: 'Chỉ học ngữ pháp không giao tiếp',
        D: 'Chỉ học trên tài liệu cũ'
      },
      correctOption: 'A',
      explanation: 'Mô hình Câu lạc bộ tiếng Anh giúp thủy thủ tự tin giao tiếp và vận hành trơn tru trang bị hiện đại bằng tiếng Anh.',
      topic: 'Câu lạc bộ tiếng Anh'
    },
    {
      id: 4,
      type: 'choice',
      question: 'Nội dung cốt lõi của việc "Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh" ở Lữ đoàn 162 là gì?',
      options: {
        A: 'Gắn với chức trách, nhiệm vụ từng vị trí chiến đấu; nêu gương của cán bộ chỉ huy; cần, kiệm, liêm, chính',
        B: 'Học tập hình thức không liên hệ thực tế',
        C: 'Chỉ viết bài thu hoạch một lần',
        D: 'Chỉ học trong hội trường'
      },
      correctOption: 'A',
      explanation: 'Cán bộ, đảng viên Lữ đoàn 162 luôn nêu cao trách nhiệm nêu gương: "Cấp trên làm gương cho cấp dưới, chỉ huy làm gương cho đơn vị".',
      topic: 'Học tập Bác Hồ'
    },
    {
      id: 5,
      type: 'choice',
      question: 'Công tác quản lý tư tưởng quân nhân ở Lữ đoàn 162 thực hiện theo mô hình quản lý nào?',
      options: {
        A: 'Mô hình "Nắm chắc, dự báo đúng, định hướng kịp thời, giải quyết hiệu quả tư tưởng bộ đội"',
        B: 'Buông lỏng quản lý ngoài giờ làm việc',
        C: 'Chỉ xử phạt khi có vi phạm',
        D: 'Không lắng nghe tâm tư cấp dưới'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn duy trì nền nếp đối thoại dân chủ định kỳ, giải quyết dứt điểm các vướng mắc của bộ đội ngay từ cơ sở.',
      topic: 'Quản lý tư tưởng'
    },
    {
      id: 6,
      type: 'choice',
      question: 'Công tác tăng gia sản xuất và chăm sóc sức khỏe bộ đội tại căn cứ đóng quân Lữ đoàn 162 nhằm bảo đảm tỷ lệ quân số khỏe bao nhiêu?',
      options: {
        A: 'Từ 98,8% trở lên, bảo đảm sức khỏe dẻo dai cho các chuyến biển dài ngày',
        B: 'Đạt khoảng 80%',
        C: 'Không quy định cụ thể',
        D: 'Chỉ cần đạt 70%'
      },
      correctOption: 'A',
      explanation: 'Nhờ tăng gia sản xuất tại chỗ và chăm sóc y tế chu đáo, tỷ lệ quân số khỏe của Lữ đoàn 162 luôn vượt chỉ tiêu quân y quy định.',
      topic: 'Bảo đảm quân y'
    },
    {
      id: 7,
      type: 'choice',
      question: 'Hội thi "Thuyền trưởng, Chính trị viên tàu giỏi" được Lữ đoàn 162 tổ chức định kỳ nhằm mục đích gì?',
      options: {
        A: 'Đánh giá thực chất năng lực chỉ huy toàn diện, tác phong chỉ huy chiến đấu và kỹ năng xử lý tình huống trên biển',
        B: 'Chỉ để trao giải thưởng phong trào',
        C: 'Chỉ thi lý thuyết trắc nghiệm',
        D: 'Không có nội dung thực hành'
      },
      correctOption: 'A',
      explanation: 'Hội thi Thuyền trưởng, Chính trị viên giỏi là cái nôi tôi luyện đội ngũ chỉ huy tàu bản lĩnh, mưu lược, quyết đoán.',
      topic: 'Hội thi cán bộ giỏi'
    },
    {
      id: 8,
      type: 'choice',
      question: 'Tiêu chuẩn về cảnh quan môi trường tại doanh trại và cầu cảng Lữ đoàn 162 được xây dựng theo tiêu chí nào?',
      options: {
        A: '"Sáng, xanh, sạch, đẹp", quy củ, thống nhất, mang đậm nét văn hóa quân sự vùng biển đảo',
        B: 'Để cỏ mọc tự nhiên',
        C: 'Không cần trồng cây xanh',
        D: 'Chỉ sơn sửa văn phòng chỉ huy'
      },
      correctOption: 'A',
      explanation: 'Doanh trại và bến đỗ tàu Lữ đoàn 162 tại Cam Ranh được quy hoạch khang trang, chính quy, xanh sạch đẹp mẫu mực.',
      topic: 'Cảnh quan môi trường'
    },
    {
      id: 9,
      type: 'choice',
      question: 'Trách nhiệm của cán bộ, chiến sĩ Lữ đoàn 162 đối với công tác bảo vệ môi trường biển Cam Ranh là gì?',
      options: {
        A: 'Tuyệt đối không xả rác thải nhựa, dầu thải xuống biển; tích cực thu gom rác bờ biển và bảo vệ hệ sinh thái vịnh',
        B: 'Xả chất thải tự do ra biển',
        C: 'Không cần quan tâm bảo vệ môi trường',
        D: 'Chỉ dọn rác khi có cấp trên kiểm tra'
      },
      correctOption: 'A',
      explanation: 'Các tàu Lữ đoàn 162 tuân thủ nghiêm ngặt công ước chống ô nhiễm biển MARPOL và phong trào nói không với rác thải nhựa.',
      topic: 'Bảo vệ môi trường biển'
    },
    {
      id: 10,
      type: 'choice',
      question: 'Đoàn Thanh niên Lữ đoàn 162 phát huy vai trò xung kích thông qua phong trào thi đua nào?',
      options: {
        A: 'Phong trào "Thanh niên Lữ đoàn 162 xung kích, sáng tạo, làm chủ vũ khí trang bị kỹ thuật mới, hiện đại"',
        B: 'Phong trào thụ động ngồi chờ chỉ thị',
        C: 'Chỉ tham gia văn nghệ thể thao',
        D: 'Không tham gia nhiệm vụ khó khăn'
      },
      correctOption: 'A',
      explanation: 'Đoàn viên thanh niên chiếm tỷ lệ lớn trên các tàu chiến đấu, là lực lượng xung kích đi đầu làm chủ công nghệ cao.',
      topic: 'Tuổi trẻ xung kích'
    },
    {
      id: 11,
      type: 'choice',
      question: 'Chế độ Ngày Kỹ thuật được các tàu Lữ đoàn 162 duy trì nghiêm túc vào ngày nào trong tuần?',
      options: {
        A: 'Thứ Sáu hằng tuần',
        B: 'Chủ Nhật',
        C: 'Thứ Hai đầu tuần',
        D: 'Chỉ làm vào cuối tháng'
      },
      correctOption: 'A',
      explanation: 'Thứ Sáu hằng tuần là Ngày Kỹ thuật toàn Lữ đoàn, toàn bộ kíp tàu tập trung bảo dưỡng, thông dầu mỡ, hiệu chỉnh máy móc.',
      topic: 'Ngày Kỹ thuật'
    },
    {
      id: 12,
      type: 'choice',
      question: 'Tổ chức quần chúng trong Lữ đoàn 162 bao gồm những tổ chức nào?',
      options: {
        A: 'Đoàn Thanh niên Cộng sản Hồ Chí Minh, Hội Phụ nữ cơ sở và Hội đồng Quân nhân',
        B: 'Chỉ có Hội đồng Quân nhân',
        C: 'Chỉ có Công đoàn',
        D: 'Không có tổ chức quần chúng'
      },
      correctOption: 'A',
      explanation: 'Các tổ chức quần chúng hoạt động hiệu quả, chăm lo đời sống vật chất tinh thần và phát huy dân chủ trong đơn vị.',
      topic: 'Tổ chức quần chúng'
    },
    {
      id: 13,
      type: 'choice',
      question: 'Quy tắc "3 dứt điểm, 3 không" trong quản lý kỷ luật của Vùng 4 Hải quân gồm những gì?',
      options: {
        A: 'Dứt điểm về tư tưởng, kỷ luật, an toàn giao thông; Không đào ngũ, không vi phạm pháp luật, không ma túy cờ bạc',
        B: 'Làm việc tùy tiện',
        C: 'Không chấp hành mệnh lệnh',
        D: 'Chỉ áp dụng với tân binh'
      },
      correctOption: 'A',
      explanation: 'Quy tắc 3 dứt điểm, 3 không tạo sự chuyển biến vững chắc về chấp hành pháp luật Nhà nước, kỷ luật Quân đội.',
      topic: 'Quy tắc 3 dứt điểm'
    },
    {
      id: 14,
      type: 'choice',
      question: 'Hành động dũng cảm cứu hộ ngư dân trong cơn bão số 9 của cán bộ, chiến sĩ Lữ đoàn 162 đã được vinh danh ra sao?',
      options: {
        A: 'Được Bộ Quốc phòng và Quân chủng Hải quân gửi thư khen, tặng Bằng khen vì hành động dũng cảm cứu dân',
        B: 'Không được nhắc đến',
        C: 'Chỉ ghi nhận trong biên bản',
        D: 'Chỉ thông báo nội bộ'
      },
      correctOption: 'A',
      explanation: 'Trong mọi hiểm nguy bão gió, tàu Lữ đoàn 162 luôn sẵn sàng xuyên bão cứu ngư dân, tô thắm hình ảnh người chiến sĩ Hải quân.',
      topic: 'Cứu hộ cứu nạn'
    },
    {
      id: 15,
      type: 'choice',
      question: 'Nền nếp báo động chiến đấu và luyện tập phương án tác chiến tại bến được kiểm tra với tần suất nào?',
      options: {
        A: 'Thường xuyên bất kể ngày đêm, ngày nghỉ, ngày lễ nhằm duy trì khả năng SSCĐ cao nhất',
        B: 'Chỉ kiểm tra khi có báo trước 1 tuần',
        C: 'Chỉ kiểm tra 1 năm 1 lần',
        D: 'Không luyện tập tại bến'
      },
      correctOption: 'A',
      explanation: 'Lữ đoàn 162 duy trì nghiêm chế độ trực sẵn sàng chiến đấu, bất kỳ lúc nào có lệnh là tàu có thể nhổ neo rời bến chiến đấu ngay.',
      topic: 'Sẵn sàng chiến đấu'
    },
    {
      id: 16,
      type: 'choice',
      question: 'Trang thông tin thi đua của Lữ đoàn 162 vinh danh các cá nhân đạt thành tích xuất sắc qua chuyên mục nào?',
      options: {
        A: 'Chuyên mục "Gương sáng Lữ đoàn Thép" và "Hoa biển Cam Ranh"',
        B: 'Chuyên mục giải trí',
        C: 'Không có chuyên mục vinh danh',
        D: 'Chỉ lưu trong sổ thi đua'
      },
      correctOption: 'A',
      explanation: 'Các tấm gương điển hình tiên tiến được tuyên dương kịp thời, lan tỏa sâu rộng tinh thần vượt khó vươn lên.',
      topic: 'Thi đua quyết thắng'
    },
    {
      id: 17,
      type: 'choice',
      question: 'Ý thức tự giác chấp hành pháp luật an toàn giao thông của quân nhân Lữ đoàn 162 được quán triệt theo chỉ thị nào?',
      options: {
        A: 'Nghiêm cấm tuyệt đối điều khiển phương tiện khi đã uống rượu, bia; chấp hành nghiêm quy định đội mũ bảo hiểm có cằm',
        B: 'Tự do lái xe sau khi liên hoan',
        C: 'Không cần mang giấy tờ xe quân sự',
        D: 'Chỉ áp dụng khi ở ngoài doanh trại'
      },
      correctOption: 'A',
      explanation: 'Chỉ thị "Đã uống rượu bia, không lái xe" và bảo đảm an toàn giao thông được thực hiện 100% không có ngoại lệ.',
      topic: 'An toàn giao thông'
    },
    {
      id: 18,
      type: 'choice',
      question: 'Thực hiện công tác dân vận "Hải quân gắn bó với đồng bào các dân tộc tỉnh Khánh Hòa", Lữ đoàn 162 đã tổ chức những hoạt động nào?',
      options: {
        A: 'Thăm hỏi gia đình chính sách, xây dựng nhà tình nghĩa, khám bệnh cấp thuốc và nhận đỡ đầu con ngư dân có hoàn cảnh khó khăn',
        B: 'Chỉ tổ chức giao lưu bóng đá',
        C: 'Không tham gia công tác địa phương',
        D: 'Chỉ tham quan du lịch'
      },
      correctOption: 'A',
      explanation: 'Hoạt động "Hải quân nhận đỡ đầu con ngư dân" là việc làm nhân văn sâu sắc, thắt chặt mối quan hệ máu thịt quân dân.',
      topic: 'Công tác dân vận'
    },
    {
      id: 19,
      type: 'choice',
      question: 'Lời hứa danh dự của mỗi cán bộ, chiến sĩ Lữ đoàn 162 trước cờ Tổ quốc và vùng biển quê hương là gì?',
      options: {
        A: 'Tuyệt đối trung thành với Đảng, với Tổ quốc và Nhân dân; quyết tâm bảo vệ vững chắc chủ quyền biển, đảo thiêng liêng',
        B: 'Chỉ hoàn thành nhiệm vụ khi thuận lợi',
        C: 'Tránh né những vùng biển sóng gió',
        D: 'Đặt quyền lợi cá nhân lên trước'
      },
      correctOption: 'A',
      explanation: 'Lời thề bảo vệ biển đảo là lý tưởng cao đẹp dẫn lối cho mọi hành động của cán bộ, thủy thủ Lữ đoàn 162 anh hùng.',
      topic: 'Lời thề danh dự'
    },
    {
      id: 20,
      type: 'choice',
      question: 'Phong trào thi đua Quyết thắng và các đợt thi đua cao điểm tại Lữ đoàn 162 hướng tới xây dựng người chiến sĩ hải quân đạt những phẩm chất chuẩn mực nào?',
      options: {
        A: 'Bản lĩnh chính trị kiên định vững vàng, giỏi chuyên môn nghiệp vụ, kỷ luật tự giác nghiêm minh, nếp sống văn hóa chuẩn mực',
        B: 'Chỉ rèn luyện thể lực, không học chính trị',
        C: 'Tác phong tự do, tùy hứng',
        D: 'Không có tiêu chí cụ thể'
      },
      correctOption: 'A',
      explanation: 'Xây dựng người chiến sĩ Lữ đoàn 162 với phẩm chất "Trung thành, dũng cảm; Tâm trong, trí sáng; Đoàn kết, kỷ cương; Làm chủ biển khơi", xứng danh người lính Bộ đội Cụ Hồ - Người chiến sĩ Hải quân.',
      topic: 'Xây dựng con người'
    },
    {
      id: 21,
      type: 'prediction',
      question: 'CÂU DỰ ĐOÁN (CÂU PHỤ PHÂN ĐỊNH GIẢI THƯỞNG): Theo đồng chí, có bao nhiêu người trả lời đúng tất cả 20 câu hỏi trắc nghiệm trong tuần này?',
      predictionPrompt: 'Nhập số người dự đoán trả lời đúng 20/20 câu (Ví dụ: 180)',
      topic: 'Dự đoán số người trả lời đúng',
      explanation: 'Câu hỏi phụ bắt buộc dùng để phân định giải thưởng khi có nhiều thí sinh đạt cùng điểm số và thời gian làm bài.'
    }
  ]
};

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    fullName: 'Đại úy Nguyễn Tuấn Anh',
    unit: 'Tàu 015 Trần Hưng Đạo (Gepard 3.9)',
    score: 100,
    correctCount: 20,
    totalQuestions: 21,
    timeTakenSeconds: 245,
    submittedAt: '02/11/2026 14:15:20',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 125
  },
  {
    rank: 2,
    fullName: 'Thượng úy Lê Hoàng Hải',
    unit: 'Tàu 016 Quang Trung (Gepard 3.9)',
    score: 100,
    correctCount: 20,
    totalQuestions: 21,
    timeTakenSeconds: 280,
    submittedAt: '02/11/2026 15:20:10',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 140
  },
  {
    rank: 3,
    fullName: 'Thiếu tá Phạm Văn Hưng',
    unit: 'Tàu 011 Đinh Tiên Hoàng (Gepard 3.9)',
    score: 100,
    correctCount: 20,
    totalQuestions: 21,
    timeTakenSeconds: 310,
    submittedAt: '02/11/2026 10:45:33',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 155
  },
  {
    rank: 4,
    fullName: 'Đại úy Trần Minh Quân',
    unit: 'Hải đội 412 - Ban Chỉ huy Hải đội',
    score: 95,
    correctCount: 19,
    totalQuestions: 21,
    timeTakenSeconds: 290,
    submittedAt: '02/11/2026 16:10:05',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 160
  },
  {
    rank: 5,
    fullName: 'Thượng úy Vũ Quốc Đạt',
    unit: 'Tàu 375 (Hải đội 412)',
    score: 95,
    correctCount: 19,
    totalQuestions: 21,
    timeTakenSeconds: 325,
    submittedAt: '02/11/2026 11:05:42',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 110
  },
  {
    rank: 6,
    fullName: 'Trung úy Đỗ Thành Long',
    unit: 'Phòng Tham mưu Lữ đoàn 162',
    score: 90,
    correctCount: 18,
    totalQuestions: 21,
    timeTakenSeconds: 340,
    submittedAt: '02/11/2026 09:30:18',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 135
  },
  {
    rank: 7,
    fullName: 'Đại úy Nguyễn Văn Khang',
    unit: 'Phòng Chính trị Lữ đoàn 162',
    score: 85,
    correctCount: 17,
    totalQuestions: 21,
    timeTakenSeconds: 360,
    submittedAt: '02/11/2026 13:50:40',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 98
  },
  {
    rank: 8,
    fullName: 'Thượng úy Hoàng Đình Nam',
    unit: 'Tàu 012 Lý Thái Tổ (Gepard 3.9)',
    score: 85,
    correctCount: 17,
    totalQuestions: 21,
    timeTakenSeconds: 410,
    submittedAt: '02/11/2026 15:40:12',
    weekId: 'Tuan_1',
    predictedCorrectAnswers: 175
  }
];
