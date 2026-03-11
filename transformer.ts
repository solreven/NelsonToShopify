export const transformRow = (row: any) => {
  const rawValue = row["Art.nr."];
  const rawValueName = row["Benevnelse (no)"];
  return {
    Title: rawValueName ? String(rawValueName) : undefined,
    SKU: rawValue ? Number(rawValue) : undefined,
  };
};
