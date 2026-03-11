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
  if (priceInput.includes("NOK")) {
    const cleanPrice = priceInput.replace("NOK:", "");
    finalPrice = Number(cleanPrice);
  }
  return {
    Title: rawValueName ? String(rawValueName) : undefined,
    SKU: rawValue ? Number(rawValue) : undefined,
    Price: finalPrice,
    "Image Src": undefined,
  };
};
