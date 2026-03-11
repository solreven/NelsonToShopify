export interface ShopifyRow {
  Title: string | undefined;
  SKU: number | undefined;
  Price?: number;
  "Image Src"?: string;
}

export const transformRow = (row: any): ShopifyRow => {
  const rawValue = row["Art.nr."];
  const rawValueName = row["Benevnelse (no)"];
  const priceInput = String(row["Anbefalt salgspris"] || "");
  let finalPrice: number | undefined;
  const match = priceInput.match(/NOK:([\d.]+)/);
  if (match) {
    // match[1] inneholder det som er inni parentesen i Regex-en (selve tallet)
    finalPrice = Number(match[1]);
  }
  return {
    Title: rawValueName ? String(rawValueName) : undefined,
    SKU: rawValue ? Number(rawValue) : undefined,
    Price: finalPrice,
    "Image Src": undefined,
  };
};
