import { transformRow } from "./transformer";

describe("Tests for article number", () => {
  test("An article number 5546 produces the EAN 5546", () => {
    const rawRow = { "Art.nr.": "5546" };

    const result = transformRow(rawRow as any);

    expect(result.SKU).toBe(5546);
  });
});

/* 

The Task:
Go to your transformer.test.ts and add a second test case inside your describe block.

Scenario: What if the Art.nr. is an empty string ""?

    Input: const rawRow = { "Art.nr.": "" };

    Expectation: expect(result.SKU).toBe(0); (or whatever you think a "missing" number should be).

What happens when you run npm test now? (Hint: Number("") actually results in 0, but Number("invalid") results in NaN. This is why we test!)n

*/
