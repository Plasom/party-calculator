export const paymentEN = {
  header: "Payment Status",
  labels: {
    scanQR: "สแกน QR เพื่อโอนเข้าบัญชี",
    promptPayNumber: "PromptPay Number",
    amount: "Amount to Pay",
    account: "บัญชี:",
    name: "Name",
    totalInclFee: "Total incl. fee",
  },
  buttons: {
    downloadQR: "Download QR Code",
    complete: "Complete",
    backToMainPage: "Back to main page",
  },
  messages: {
    generatingQR: "กำลังสร้าง QR code...",
    paymentSuccessful: "Payment successful",
    paymentCompletedSuccessfully: "Payment completed successfully.",
    feedbackLink: "Feedback: Party Calculator",
  },
  modals: {
    completePayment: {
      title: "Complete payment?",
      message: "Complete the payment? This will clear all saved payment records.",
      actionText: "Confirm",
    },
  },
  promptpay: {
    enterPromptPay: "Enter PromptPay",
    placeholder: "e.g. 08x-xxx-xxxx",
    error: "PromptPay ID not found. please try again.",
  },
};
