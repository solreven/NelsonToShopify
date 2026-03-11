export interface ShopifyRow {
  Title: string | undefined;
  SKU: number | undefined;
  Price?: number;
  "Image Src"?: string;
  "Image Src 2"?: string;
  "Image Src 3"?: string;
  "Image Src 4"?: string;
  "Body (HTML)"?: string;
  Barcode?: string;
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
    "Image Src 2": row["ResourceUrl2"]
      ? String(row["ResourceUrl2"])
      : undefined,
    "Image Src 3": row["ResourceUrl3"]
      ? String(row["ResourceUrl3"])
      : undefined,
    "Image Src 4": row["ResourceUrl4"]
      ? String(row["ResourceUrl4"])
      : undefined,
    Barcode: row["EAN"] ? String(row["EAN"]) : undefined,
  };
};
