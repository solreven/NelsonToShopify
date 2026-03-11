export const transformRow = (row: any) => {
  const rawValue = row["Art.nr."];
  return {
    SKU: rawValue ? Number(rawValue) : undefined,
  };
};
