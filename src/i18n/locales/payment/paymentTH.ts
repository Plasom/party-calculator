export const paymentTH = {
  header: "สถานะการชำระเงิน",
  labels: {
    scanQR: "สแกน QR เพื่อโอนเข้าบัญชี",
    promptPayNumber: "เบอร์พร้อมเพย์",
    amount: "ยอดที่ต้องจ่าย",
    account: "บัญชี:",
    name: "ชื่อ",
    totalInclFee: "รวมทั้งหมด",
  },
  buttons: {
    downloadQR: "ดาวน์โหลด QR",
    complete: "เสร็จสิ้น",
    backToMainPage: "กลับหน้าหลัก",
  },
  messages: {
    generatingQR: "กำลังสร้าง QR code...",
    paymentSuccessful: "โอนเงินสำเร็จ",
    paymentCompletedSuccessfully: "ชำระเงินเรียบร้อยแล้ว",
    feedbackLink: "แสดงความคิดเห็น: Party Calculator",
  },
  modals: {
    completePayment: {
      title: "จบการชำระเงิน?",
      message: "จะจบการชำระเงินเลยไหม? ข้อมูลทั้งหมดจะถูกล้างออก",
      actionText: "ยืนยัน",
    },
  },
  promptpay: {
    enterPromptPay: "ใส่เบอร์พร้อมเพย์",
    placeholder: "เช่น 08x-xxx-xxxx",
    error: "ไม่พบเบอร์พร้อมเพย์ ลองใหม่อีกครั้ง",
  },
};
