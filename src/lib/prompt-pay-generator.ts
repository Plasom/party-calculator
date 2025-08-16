import promptQR from "promptpay-qr";
import QRCode from 'qrcode';

export class PromptPayGenerator {
    public static async generatePromptPayQR(id: string): Promise<string> {
        const promptPayQR = await promptQR(id, {});
        const base64 = await QRCode.toDataURL(promptPayQR);
        return base64;
    }
}
