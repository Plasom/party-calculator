export class ValidatorHelper {
  private minValue: number;
  private maxValue: number;

  constructor(minValue: number = 0, maxValue: number = 999) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  /**
   * Validates and cleans a numeric value to be within the specified range
   * @param value - The number to validate
   * @returns The validated number within the min-max range
   */
  validateAndClean(value: number): number {
    let numValue = value;
    if (numValue < this.minValue) numValue = this.minValue;
    if (numValue > this.maxValue) numValue = this.maxValue;
    return numValue;
  }

  /**
   * Cleans a string input by removing non-numeric characters and leading zeros
   * @param input - The string input to clean
   * @returns The cleaned numeric string
   */
  cleanStringInput(input: string): string {
    const numericValue = input.replace(/[^0-9]/g, "");
    return numericValue.replace(/^0+/, "") || "0";
  }

  /**
   * Processes string input and returns a validated number
   * @param input - The string input to process
   * @returns The validated number
   */
  processStringInput(input: string): number {
    const cleanValue = this.cleanStringInput(input);
    const numValue = parseInt(cleanValue) || 0;
    return this.validateAndClean(numValue);
  }

  /**
   * Gets the minimum allowed value
   */
  getMinValue(): number {
    return this.minValue;
  }

  /**
   * Gets the maximum allowed value
   */
  getMaxValue(): number {
    return this.maxValue;
  }

  public static validateIdCard(idCard: string): boolean {
    if (!/^\d{13}$/.test(idCard)) return false;
    const digits = idCard.split("").map(Number);

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * (13 - i);
    }

    const checkDigit = (11 - (sum % 11)) % 10;
    return checkDigit === digits[12];
  }
}