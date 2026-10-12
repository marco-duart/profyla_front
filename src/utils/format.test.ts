import { formatDate, formatDateTime, formatDateTimeLong } from "./format";

describe("date formatting (pt-BR)", () => {
  it("formats date-only values without shifting the day", () => {
    expect(formatDate("1992-03-04")).toBe("04/03/1992");
  });

  it("formats date and time", () => {
    expect(formatDateTime("2026-10-14T14:30:00")).toBe("14/10/2026 às 14:30");
  });

  it("includes the weekday in the long form", () => {
    expect(formatDateTimeLong("2026-10-14T14:30:00")).toBe("qua., 14/10/2026 às 14:30");
  });

  it("falls back for empty or invalid values", () => {
    expect(formatDate(undefined)).toBe("-");
    expect(formatDate(null, "—")).toBe("—");
    expect(formatDateTime("not-a-date")).toBe("-");
  });
});
