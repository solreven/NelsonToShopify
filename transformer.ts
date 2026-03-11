export const transformRow = (row: any) => {
  return {
    SKU: Number(row["Art.nr."]),
  };
};
