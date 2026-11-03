/**
 * =========================================================================================
 * GOOGLE APPS SCRIPT (GAS) - HỘI THI TRỰC TUYẾN TÌM HIỂU LỮ ĐOÀN 162 (VÙNG 4 HẢI QUÂN)
 * Thiết kế 21 câu: 20 câu trắc nghiệm kiến thức + Câu 21 dự đoán số người trả lời đúng 20 câu
 * Tích hợp lưu trữ, chấm điểm máy chủ và tổng hợp về Google Sheets cho Quản trị
 * =========================================================================================
 * 
 * HƯỚNG DẪN TRIỂN KHAI NHANH:
 * 1. Mở trang tính Google Sheet mới (https://sheets.new).
 * 2. Vào menu "Tiện ích mở rộng" (Extensions) -> "Apps Script".
 * 3. Xóa hết mã mặc định, dán toàn bộ đoạn mã này vào file Code.gs.
 * 4. Nhấn nút "Triển khai" (Deploy) màu xanh góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * 5. Chọn loại "Ứng dụng web" (Web App):
 *    - Mô tả: "Hội thi tìm hiểu Lữ đoàn 162 - 20 câu trắc nghiệm + 1 câu dự đoán & Quản trị"
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone) -> RẤT QUAN TRỌNG!
 * 6. Nhấn "Triển khai" (Deploy) -> Cấp quyền cho Google Sheet nếu được hỏi.
 * 7. Sao chép "URL ứng dụng web" (dạng https://script.google.com/macros/s/.../exec) và dán vào giao diện Web thi!
 */

var CONFIG = {
  SHEET_WEEKS: ['Tuan_1', 'Tuan_2', 'Tuan_3', 'Tuan_4'],
  SHEET_RESULTS: 'KetQua',
  TOTAL_QUESTIONS: 21,
  CHOICE_QUESTIONS: 20,
  MAX_LEADERBOARD_ENTRIES: 100
};

/**
 * Xử lý yêu cầu GET
 */
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'ping';
    var week = (e && e.parameter && e.parameter.week) ? e.parameter.week : 'Tuan_1';

    // 1. Kiểm tra kết nối
    if (action === 'ping') {
      return createJsonResponse({
        success: true,
        message: 'Google Apps Script Lữ đoàn 162 (20 câu trắc nghiệm + 1 câu dự đoán) đang hoạt động bình thường!',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Tự động khởi tạo cấu trúc Sheet mẫu 21 câu kèm câu dự đoán
    if (action === 'initSheets') {
      var initResult = initializeContestSheets();
      return createJsonResponse({
        success: true,
        message: 'Đã khởi tạo thành công cấu trúc 20 câu trắc nghiệm + 1 câu dự đoán và bảng kết quả KetQua!',
        details: initResult
      });
    }

    // 3. Lấy danh sách câu hỏi theo tuần
    if (action === 'getQuestions') {
      var questions = getQuestionsFromSheet(week, false);
      return createJsonResponse({
        success: true,
        week: week,
        total: questions.length,
        questions: questions
      });
    }

    // 4. Lấy bảng xếp hạng theo tuần (kèm số người dự đoán đúng)
    if (action === 'getLeaderboard') {
      var leaderboard = getLeaderboardFromSheet(week);
      return createJsonResponse({
        success: true,
        week: week,
        leaderboard: leaderboard
      });
    }

    // 5. Lấy toàn bộ dữ liệu phục vụ Quản trị viên (Admin Dashboard)
    if (action === 'getAllSubmissions') {
      var allSubmissions = getAllSubmissionsFromSheet(week);
      return createJsonResponse({
        success: true,
        week: week,
        total: allSubmissions.length,
        submissions: allSubmissions
      });
    }

    return createJsonResponse({
      success: false,
      error: 'Hành động không hợp lệ: ' + action
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Xử lý yêu cầu POST (Nộp bài thi, chấm 20 câu trắc nghiệm + ghi nhận Câu 21 dự đoán số người trả lời đúng)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (ex) {
    return createJsonResponse({
      success: false,
      error: 'Hệ thống đang quá tải ghi dữ liệu, vui lòng thử lại sau vài giây!'
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        error: 'Dữ liệu nộp bài rỗng!'
      });
    }

    var payload = JSON.parse(e.postData.contents);
    var week = payload.week || 'Tuan_1';
    var candidate = payload.candidate || {};
    var userAnswers = payload.answers || {}; // Dạng { "1": "A", ..., "20": "A", "21": "125" }
    var timeTakenSeconds = payload.timeTakenSeconds || 0;
    var predictedCorrectAnswers = payload.predictedCorrectAnswers || payload.predictedParticipants || parseInt(userAnswers['21'] || userAnswers[21] || userAnswers['20'] || '0', 10) || 0;

    // Lấy ngân hàng câu hỏi đầy đủ từ Sheet để chấm điểm trên máy chủ
    var fullQuestions = getQuestionsFromSheet(week, true);
    if (!fullQuestions || fullQuestions.length === 0) {
      return createJsonResponse({
        success: false,
        error: 'Không tìm thấy câu hỏi của ' + week + ' để chấm điểm!'
      });
    }

    var correctCount = 0;
    var choiceCount = 0;
    var reviews = [];

    // Chấm điểm 20 câu trắc nghiệm & Ghi nhận Câu 21 dự đoán
    for (var i = 0; i < fullQuestions.length; i++) {
      var q = fullQuestions[i];
      var qId = q.id;

      if (qId === 21 || q.type === 'prediction') {
        reviews.push({
          questionId: 21,
          question: q.question,
          type: 'prediction',
          userAnswer: predictedCorrectAnswers ? predictedCorrectAnswers + ' người' : 'Chưa nhập',
          correctAnswer: 'Số lượng thực tế do BTC công bố',
          isCorrect: true,
          predictedValue: predictedCorrectAnswers,
          explanation: q.explanation || 'Câu dự đoán số người trả lời đúng 20 câu trắc nghiệm tuần thi dùng để phân định giải thưởng.'
        });
        continue;
      }

      choiceCount++;
      var userAns = (userAnswers[qId] || '').toString().trim().toUpperCase();
      var correctAns = (q.correctOption || '').toString().trim().toUpperCase();

      var isCorrect = (userAns === correctAns && correctAns !== '');
      if (isCorrect) {
        correctCount++;
      }

      reviews.push({
        questionId: qId,
        question: q.question,
        type: 'choice',
        options: q.options,
        userAnswer: userAns || null,
        correctAnswer: correctAns,
        isCorrect: isCorrect,
        explanation: q.explanation || ''
      });
    }

    // Điểm số tính trên 20 câu trắc nghiệm (thang 100)
    var divisor = choiceCount > 0 ? choiceCount : CONFIG.CHOICE_QUESTIONS;
    var score = Math.round((correctCount / divisor) * 100);

    // Ghi kết quả vào Sheet "KetQua"
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var resultSheet = ss.getSheetByName(CONFIG.SHEET_RESULTS);
    if (!resultSheet) {
      resultSheet = ss.insertSheet(CONFIG.SHEET_RESULTS);
      resultSheet.appendRow([
        'Thời gian',
        'Tuần thi',
        'Họ và tên',
        'Tàu / Đơn vị',
        'SĐT/Mã QN',
        'Điểm số',
        'Số câu đúng (trên 20)',
        'Tổng số câu (21)',
        'Thời gian làm bài (giây)',
        'Dự đoán số người đúng 20 câu (Câu 21)',
        'Chi tiết nộp'
      ]);
    }

    var nowStr = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');
    resultSheet.appendRow([
      nowStr,
      week,
      candidate.fullName || 'Ẩn danh',
      candidate.unit || 'Chưa xác định',
      candidate.phoneOrId || '',
      score,
      correctCount,
      fullQuestions.length,
      timeTakenSeconds,
      predictedCorrectAnswers,
      JSON.stringify(userAnswers)
    ]);

    var rank = calculateRank(resultSheet, week, score, timeTakenSeconds);

    return createJsonResponse({
      success: true,
      message: 'Nộp bài thành công và đã tổng hợp dữ liệu về Google Sheets!',
      result: {
        week: week,
        score: score,
        maxScore: 100,
        correctCount: correctCount,
        totalQuestions: fullQuestions.length,
        timeTakenSeconds: timeTakenSeconds,
        predictedCorrectAnswers: predictedCorrectAnswers,
        predictedParticipants: predictedCorrectAnswers,
        submittedAt: nowStr,
        rank: rank,
        reviews: reviews
      }
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: 'Lỗi xử lý nộp bài: ' + err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Đọc câu hỏi từ Sheet (Bảo mật: ẩn đáp án đúng trừ khi chấm điểm phía server)
 */
function getQuestionsFromSheet(week, includeCorrectAnswer) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(week);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var questions = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var qId = Number(row[0]) || r;
    var questionText = (row[1] || '').toString().trim();
    if (!questionText) continue;

    var isPrediction = (qId === 21 || questionText.toUpperCase().indexOf('DỰ ĐOÁN') !== -1);

    if (isPrediction) {
      questions.push({
        id: qId,
        type: 'prediction',
        question: questionText,
        predictionPrompt: 'Nhập số người dự đoán trả lời đúng tất cả 20 câu trắc nghiệm (Ví dụ: 125)',
        explanation: (row[7] || row[6] || '').toString()
      });
      continue;
    }

    var qObj = {
      id: qId,
      type: 'choice',
      question: questionText,
      options: {
        A: (row[2] || '').toString(),
        B: (row[3] || '').toString(),
        C: (row[4] || '').toString(),
        D: (row[5] || '').toString()
      }
    };

    if (includeCorrectAnswer) {
      qObj.correctOption = (row[6] || 'A').toString().trim().toUpperCase();
      qObj.explanation = (row[7] || '').toString();
    }

    questions.push(qObj);
  }

  return questions;
}

function getLeaderboardFromSheet(week) {
  var rows = getAllSubmissionsFromSheet(week);

  // Sắp xếp: Điểm cao -> Thời gian ít
  rows.sort(function(a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTakenSeconds - b.timeTakenSeconds;
  });

  var leaderboard = [];
  for (var i = 0; i < Math.min(rows.length, CONFIG.MAX_LEADERBOARD_ENTRIES); i++) {
    rows[i].rank = i + 1;
    leaderboard.push(rows[i]);
  }

  return leaderboard;
}

function getAllSubmissionsFromSheet(week) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_RESULTS);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var rows = [];
  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var rowWeek = (row[1] || '').toString().trim();
    if (week && rowWeek !== week) continue;

    var predVal = Number(row[9]) || 0;
    rows.push({
      submittedAt: row[0] ? row[0].toString() : '',
      weekId: rowWeek,
      fullName: (row[2] || '').toString(),
      unit: (row[3] || '').toString(),
      phoneOrId: (row[4] || '').toString(),
      score: Number(row[5]) || 0,
      correctCount: Number(row[6]) || 0,
      totalQuestions: Number(row[7]) || 21,
      timeTakenSeconds: Number(row[8]) || 0,
      predictedCorrectAnswers: predVal,
      predictedParticipants: predVal
    });
  }

  return rows;
}

function calculateRank(resultSheet, week, score, timeTakenSeconds) {
  try {
    var data = resultSheet.getDataRange().getValues();
    var higherCount = 0;
    for (var r = 1; r < data.length; r++) {
      var row = data[r];
      if (row[1] !== week) continue;
      var otherScore = Number(row[5]) || 0;
      var otherTime = Number(row[8]) || 0;
      if (otherScore > score || (otherScore === score && otherTime < timeTakenSeconds)) {
        higherCount++;
      }
    }
    return higherCount + 1;
  } catch (e) {
    return 1;
  }
}

function initializeContestSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sampleHeaders = ['ID', 'CauHoi', 'DapAnA', 'DapAnB', 'DapAnC', 'DapAnD', 'DapAnDung', 'GiaiThich'];

  var sampleQuestions = [
    [1, 'Lữ đoàn 162 (Vùng 4 Hải quân) được thành lập vào ngày tháng năm nào?', 'Ngày 09 tháng 01 năm 2002', 'Ngày 22 tháng 12 năm 2000', 'Ngày 07 tháng 5 năm 2005', 'Ngày 19 tháng 5 năm 2003', 'A', 'Ngày 09/01/2002 là ngày truyền thống vẻ vang của Lữ đoàn 162 - Lữ đoàn Thép'],
    [2, 'Lữ đoàn 162 được cán bộ, chiến sĩ và nhân dân tin yêu gọi bằng danh xưng nào?', 'Lữ đoàn Thép của Quân chủng Hải quân', 'Đoàn tàu Không số thời kỳ mới', 'Cú đấm thép phòng không', 'Bức tường thép biên cương', 'A', 'Lữ đoàn 162 được mệnh danh là Lữ đoàn Thép - đơn vị tàu chiến đấu mặt nước hiện đại nhất'],
    [3, 'Cặp tàu hộ vệ tên lửa Gepard 3.9 đầu tiên gia nhập biên chế Lữ đoàn 162 mang số hiệu nào?', 'Tàu 011 Đinh Tiên Hoàng và Tàu 012 Lý Thái Tổ', 'Tàu 015 Trần Hưng Đạo và Tàu 016 Quang Trung', 'Tàu 375 và Tàu 376', 'Tàu 186 và Tàu 187', 'A', 'Cặp tàu Gepard 3.9 đầu tiên gia nhập biên chế năm 2011 mang số hiệu 011 và 012'],
    [4, 'Truyền thống vẻ vang của Lữ đoàn 162 được đúc kết trong 16 chữ vàng nào?', 'Sẵn sàng chiến đấu, kiên quyết tiến công, làm chủ vùng biển, quyết chiến quyết thắng', 'Đoàn kết, kỷ luật, bí mật, bất ngờ', 'Thần tốc, táo bạo, quyết thắng giặc thù', 'Vượt mọi khó khăn, bám biển kiên cường', 'A', 'Truyền thống vẻ vang 16 chữ vàng của Lữ đoàn 162'],
    [5, 'Căn cứ đóng quân chính của Lữ đoàn 162 (Vùng 4 Hải quân) đặt tại đâu?', 'Căn cứ Quân sự Cam Ranh, tỉnh Khánh Hòa', 'Bán đảo Sơn Trà, TP Đà Nẵng', 'Căn cứ Vũng Tàu', 'Căn cứ Phú Quốc', 'A', 'Lữ đoàn 162 đóng quân tại Căn cứ Quân sự Cam Ranh, tỉnh Khánh Hòa'],
    [21, 'CÂU DỰ ĐOÁN (CÂU PHỤ PHÂN ĐỊNH GIẢI THƯỞNG): Theo đồng chí, có bao nhiêu người trả lời đúng tất cả 20 câu hỏi trắc nghiệm trong tuần này?', '', '', '', '', '', 'Câu dự đoán số người trả lời đúng tất cả 20 câu trắc nghiệm dùng để phân định giải thưởng khi đồng điểm và đồng thời gian.']
  ];

  for (var w = 0; w < CONFIG.SHEET_WEEKS.length; w++) {
    var weekName = CONFIG.SHEET_WEEKS[w];
    var sheet = ss.getSheetByName(weekName);
    if (!sheet) sheet = ss.insertSheet(weekName);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(sampleHeaders);
      for (var q = 0; q < sampleQuestions.length; q++) {
        sheet.appendRow(sampleQuestions[q]);
      }
      sheet.getRange(1, 1, 1, sampleHeaders.length).setFontWeight('bold').setBackground('#0B2545').setFontColor('#FFFFFF');
    }
  }

  // Tạo sheet KetQua với cột Dự đoán số người trả lời đúng 20 câu
  var resSheet = ss.getSheetByName(CONFIG.SHEET_RESULTS);
  if (!resSheet) resSheet = ss.insertSheet(CONFIG.SHEET_RESULTS);
  if (resSheet.getLastRow() === 0) {
    var resHeaders = [
      'Thời gian',
      'Tuần thi',
      'Họ và tên',
      'Tàu / Đơn vị',
      'SĐT/Mã QN',
      'Điểm số',
      'Số câu đúng (trên 20)',
      'Tổng số câu (21)',
      'Thời gian làm bài (giây)',
      'Dự đoán số người đúng 20 câu (Câu 21)',
      'Chi tiết nộp'
    ];
    resSheet.appendRow(resHeaders);
    resSheet.getRange(1, 1, 1, resHeaders.length).setFontWeight('bold').setBackground('#133E87').setFontColor('#FFFFFF');
  }

  return 'Đã thiết lập đầy đủ 4 sheet tuần (20 câu trắc nghiệm + 1 câu dự đoán) và sheet kết quả KetQua!';
}

function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
