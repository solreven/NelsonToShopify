import { transformRow } from "./transformer";

describe("Tests for article number", () => {
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
});
