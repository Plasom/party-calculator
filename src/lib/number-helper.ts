export class NumberHelper {
    public static toFixed(value: number, decimals: number): string {
        return value.toFixed(decimals);
    }

    public static parse(value: string): number {
        return parseFloat(value);
    }

    public static multiply(a: number, b: number): number {
        const cleanResult = Math.round(a * b);
        return cleanResult;
    }
}
