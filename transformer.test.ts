import { transformRow } from "./transformer";

describe("Tests for simple conversions", () => {
  test("An article number 5546 produces the EAN 5546", () => {
    const rawRow = { "Art.nr.": "5546" };

    const result = transformRow(rawRow as any);

    expect(result.SKU).toBe(5546);
  });
  test("Empty article numbers produce an undefined SKU", () => {
    const rawRow = { "Art.nr.": "" };

    const result = transformRow(rawRow as any);

    expect(result.SKU).toBeUndefined();
  });

  test("Benevnelse (no) 'navn' produces the Title 'navn'", () => {
    const rawRow = { "Benevnelse (no)": "navn" };

    const result = transformRow(rawRow as any);

    expect(result.Title).toBe("navn");
  });
  test("Empty benevnelse produces an undefined Title", () => {
    const rawRow = { "Benevnelse (no)": "" };

    const result = transformRow(rawRow as any);

    expect(result.Title).toBeUndefined();
  });
});
describe("Tester for pris", () => {
  test("Kan håndtere ingen pris", () => {
    const rawRow = {
      "Anbefalt salgspris": "",
    };

    const result = transformRow(rawRow as any);

    expect(result.Price).toBeUndefined();
  });
  test("Kan håndtere en enkel pris", () => {
    const rawRow = {
      "Anbefalt salgspris": "NOK:79.00",
    };

    const result = transformRow(rawRow as any);

    expect(result.Price).toBe(79.0);
  });
  test("Kan håndtere en enkel pris som ikke er norsk", () => {
    const rawRow = {
      "Anbefalt salgspris": "SEK:79.00",
    };

    const result = transformRow(rawRow as any);

    expect(result.Price).toBeUndefined();
  });
  test("Kan håndtere flere priser som ikke er norske", () => {
    const rawRow = {
      "Anbefalt salgspris": "SEK:79.00|FI-EUR:8.00|DKK:79.00",
    };

    const result = transformRow(rawRow as any);

    expect(result.Price).toBeUndefined();
  });
});
