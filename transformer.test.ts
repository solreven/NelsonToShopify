import { transformRow } from "./transformer";
import * as Papa from "papaparse";

test("PapaParse skal kvote beskrivelser som inneholder komma", () => {
  const row = {
    Title: "Test",
    "Body (HTML)": "Dette er en tekst, med et komma.",
  };

  const csv = Papa.unparse([row]);

  expect(csv).toContain('"Dette er en tekst, med et komma."');
});

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

  test("Kan fiske ut norsk pris blant mange andre priser", () => {
    const rawRow = {
      "Anbefalt salgspris":
        "SEK:1049.00|NOK:1159.00|FI-EUR:105.50|DKK:939.00|DE-EUR:105.50|PLN:456.09",
    };

    const result = transformRow(rawRow as any);

    expect(result.Price).toBe(1159.0);
  });
});
describe("Skal mappe bilde og beskrivelse fra Nelson-data", () => {
  test("Tom beskrivelse gir tom body", () => {
    const nelsonRow = {
      "Beskrivelse (no)": "",
    };

    const result = transformRow(nelsonRow as any);

    expect(result["Body (HTML)"]).toBeUndefined();
  });
  test("En beskrivelse gir en body", () => {
    const nelsonRow = {
      "Beskrivelse (no)": "En komplett løsning for hydroponisk dyrking...",
    };

    const result = transformRow(nelsonRow as any);

    expect(result["Body (HTML)"]).toBe(
      "En komplett løsning for hydroponisk dyrking...",
    );
  });
  test("En tom resource url gir en tom image src", () => {
    const nelsonRow = {
      ResourceUrl1: "",
    };

    const result = transformRow(nelsonRow as any);

    expect(result["Image Src"]).toBeUndefined();
  });
  test("En resource url gir en image src", () => {
    const nelsonRow = {
      ResourceUrl1: "https://asset.com/bilde1.jpg",
    };

    const result = transformRow(nelsonRow as any);

    expect(result["Image Src"]).toBe("https://asset.com/bilde1.jpg");
  });
  test("Skal fange opp bilder nummer 2-4 hvis de eksisterer", () => {
    const nelsonRow = {
      ResourceUrl1: "https://asset.com/bilde1.jpg",
      ResourceUrl2: "https://asset.com/bilde2.jpg",
      ResourceUrl3: "https://asset.com/bilde3.jpg",
      ResourceUrl4: "https://asset.com/bilde4.jpg",
    };

    const result = transformRow(nelsonRow as any);

    expect(result["Image Src 2"]).toBe("https://asset.com/bilde2.jpg");
    expect(result["Image Src 3"]).toBe("https://asset.com/bilde3.jpg");
    expect(result["Image Src 4"]).toBe("https://asset.com/bilde4.jpg");
  });
});

describe("Tester for EAN og produktvekt", () => {
  test("Mapper EAN til Barcode", () => {
    const rawRow = {
      EAN: "7312600055469",
    };

    const result = transformRow(rawRow as any);

    expect(result["Variant Barcode"]).toBe("7312600055469");
  });
  test("Sjekker at udefinert EAN bare er udefinert", () => {
    const rawRow = {
      EAN: "",
    };

    const result = transformRow(rawRow as any);

    expect(result["Variant Barcode"]).toBeUndefined;
  });
  test("Mapper vekt til Variant Weight og sjekker at det ikke blir kluss med komma", () => {
    const rawRow = {
      Fraktvekt: "1,125",
    };

    const result = transformRow(rawRow as any);

    expect(result["Variant Weight"]).toBe(1.125);
  });
  test("Mapper vekt måleenhet til Variant Weight Unit", () => {
    const rawRow = {
      "Fraktvekt måleenhet": "kg",
    };

    const result = transformRow(rawRow as any);

    expect(result["Variant Weight Unit"]).toBe("kg");
  });
  test("Sjekker at udefinert EAN bare er udefinert", () => {
    const rawRow = {
      EAN: "",
    };

    const result = transformRow(rawRow as any);

    expect(result["Variant Barcode"]).toBeUndefined;
  });
});
