export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function isValidCpf(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false;
  }

  const checkDigit = (length: number) => {
    const sum = digits
      .slice(0, length)
      .split("")
      .reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return checkDigit(9) === Number(digits[9]) && checkDigit(10) === Number(digits[10]);
}

export function maskCnpj(value: string): string {
  const digits = onlyDigits(value).slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

// (11) 98765-4321 for mobile (11 digits), (11) 3456-7890 for landline (10 digits).
export function maskPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  const area = digits.slice(0, 2);
  const rest = digits.slice(2);
  const split = rest.length > 8 ? 5 : 4;
  return rest.length <= split ? `(${area}) ${rest}` : `(${area}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}

export function maskCep(value: string): string {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

// Typing "123456" shows "R$ 1.234,56": the digits are the value in cents.
export function maskCurrency(value: string): string {
  const digits = onlyDigits(value).replace(/^0+/, "");
  if (!digits) return "";
  const cents = digits.padStart(3, "0");
  const integer = cents.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${integer},${cents.slice(-2)}`;
}

// "R$ 1.234,56" -> "1234.56" (what the API stores).
export function currencyToDecimal(masked: string): string {
  const digits = onlyDigits(masked);
  if (!digits) return "";
  const cents = digits.padStart(3, "0");
  return `${cents.slice(0, -2).replace(/^0+(?=\d)/, "")}.${cents.slice(-2)}`;
}

// Shows a stored decimal ("1234.56") as BRL; legacy free text ("5 mil") passes through untouched.
export function formatCurrency(value?: string | null): string {
  if (!value) return "";
  if (!/^\d+(\.\d{1,2})?$/.test(value)) return value;
  const [integer, decimals = ""] = value.split(".");
  return maskCurrency(`${integer}${decimals.padEnd(2, "0")}`);
}
