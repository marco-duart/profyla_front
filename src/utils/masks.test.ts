import { currencyToDecimal, formatCurrency, isValidCpf, maskCep, maskCnpj, maskCpf, maskCurrency, maskPhone, onlyDigits } from "./masks";

describe("masks", () => {
  it("keeps only digits", () => {
    expect(onlyDigits("(11) 98765-4321")).toBe("11987654321");
  });

  it.each([
    ["1", "1"],
    ["12345", "123.45"],
    ["12345678909", "123.456.789-09"],
    ["123456789099999", "123.456.789-09"],
  ])("masks CPF %s", (input, expected) => {
    expect(maskCpf(input)).toBe(expected);
  });

  it("validates CPF check digits", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
    expect(isValidCpf("529.982.247-26")).toBe(false);
    expect(isValidCpf("111.111.111-11")).toBe(false);
    expect(isValidCpf("123")).toBe(false);
  });

  it("masks CNPJ progressively", () => {
    expect(maskCnpj("12")).toBe("12");
    expect(maskCnpj("12345")).toBe("12.345");
    expect(maskCnpj("12345678000199")).toBe("12.345.678/0001-99");
  });

  it("masks mobile and landline phones", () => {
    expect(maskPhone("")).toBe("");
    expect(maskPhone("8")).toBe("(8");
    expect(maskPhone("81")).toBe("(81");
    expect(maskPhone("819")).toBe("(81) 9");
    expect(maskPhone("8198765432")).toBe("(81) 9876-5432");
    expect(maskPhone("81987654321")).toBe("(81) 98765-4321");
    expect(maskPhone("8198765432199")).toBe("(81) 98765-4321");
  });

  it("masks CEP", () => {
    expect(maskCep("50")).toBe("50");
    expect(maskCep("50030230")).toBe("50030-230");
  });

  describe("currency", () => {
    it("treats typed digits as cents", () => {
      expect(maskCurrency("")).toBe("");
      expect(maskCurrency("5")).toBe("R$ 0,05");
      expect(maskCurrency("123456")).toBe("R$ 1.234,56");
      expect(maskCurrency("R$ 1.234,56")).toBe("R$ 1.234,56");
      expect(maskCurrency("000100")).toBe("R$ 1,00");
    });

    it("converts the mask to the decimal the API stores", () => {
      expect(currencyToDecimal("R$ 1.234,56")).toBe("1234.56");
      expect(currencyToDecimal("R$ 0,05")).toBe("0.05");
      expect(currencyToDecimal("")).toBe("");
    });

    it("formats stored decimals and leaves legacy free text alone", () => {
      expect(formatCurrency("1234.56")).toBe("R$ 1.234,56");
      expect(formatCurrency("5000")).toBe("R$ 5.000,00");
      expect(formatCurrency("5000.5")).toBe("R$ 5.000,50");
      expect(formatCurrency("R$ 4.000 a R$ 6.000")).toBe("R$ 4.000 a R$ 6.000");
      expect(formatCurrency(null)).toBe("");
    });
  });
});
