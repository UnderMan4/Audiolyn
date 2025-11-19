export const romanPattern =
   /\bM{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b/i;

const romanValues: Record<string, number> = {
   I: 1,
   V: 5,
   X: 10,
   L: 50,
   C: 100,
   D: 500,
   M: 1000,
};

const numberMap: Array<{ value: number; numeral: string }> = [
   { value: 1000, numeral: "M" },
   { value: 900, numeral: "CM" },
   { value: 500, numeral: "D" },
   { value: 400, numeral: "CD" },
   { value: 100, numeral: "C" },
   { value: 90, numeral: "XC" },
   { value: 50, numeral: "L" },
   { value: 40, numeral: "XL" },
   { value: 10, numeral: "X" },
   { value: 9, numeral: "IX" },
   { value: 5, numeral: "V" },
   { value: 4, numeral: "IV" },
   { value: 1, numeral: "I" },
];

export const romanToNumber = (roman: string): number => {
   const upper = roman.toUpperCase();

   let total = 0;
   let prev = 0;

   for (let i = upper.length - 1; i >= 0; i--) {
      const char = upper[i];
      const value = romanValues[char];

      if (value < prev) {
         total -= value;
      } else {
         total += value;
         prev = value;
      }
   }

   return total;
};

export const numberToRoman = (num: number): string => {
   if (!Number.isInteger(num)) {
      throw new TypeError("Value must be an integer");
   }

   let result = "";
   let remaining = num;

   for (const { value, numeral } of numberMap) {
      while (remaining >= value) {
         result += numeral;
         remaining -= value;
      }
   }

   return result;
};
