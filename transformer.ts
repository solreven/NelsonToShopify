export interface ShopifyRow {
  Title: string | undefined;
  SKU: number | undefined;
  Price?: number;
  "Image Src"?: string;
  "Body (HTML)"?: string;
}

export const transformRow = (row: any): ShopifyRow => {
  const rawValue = row["Art.nr."];
  const rawValueName = row["Benevnelse (no)"];
  const priceInput = String(row["Anbefalt salgspris"] || "");
  let finalPrice: number | undefined;
  const match = priceInput.match(/NOK:([\d.]+)/);
  if (match) {
    finalPrice = Number(match[1]);
  }
  return {
    Title: rawValueName ? String(rawValueName) : undefined,
    SKU: rawValue ? Number(rawValue) : undefined,
    Price: finalPrice,
    "Body (HTML)": row["Beskrivelse (no)"]
      ? String(row["Beskrivelse (no)"])
      : undefined,
    "Image Src": row["ResourceUrl1"] ? String(row["ResourceUrl1"]) : undefined,
  };
};
