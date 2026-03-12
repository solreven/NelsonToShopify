console.log("Teste at programmet starter");
import * as fs from "fs";
import * as path from "path";
import Papa from "papaparse";
import { transformRow } from "./transformer";

const inputFolder = "./input_csv";
const outputFile = "shopify_import_total.csv";

// 1. Finn alle filer i mappen
const files = fs
  .readdirSync(inputFolder)
  .filter((file) => file.endsWith(".csv"));
let allProducts: any[] = [];

console.log(`Fant ${files.length} filer. Starter prosessering...`);

// 2. Loop gjennom hver fil
files.forEach((file) => {
  const filePath = path.join(inputFolder, file);
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Vi bruker 'delimiter: ";"' fordi Nelson Garden bruker semikolon
  const results = Papa.parse(fileContent, {
    header: true,
    delimiter: ";",
    skipEmptyLines: true,
  });

  // Transformer radene og legg dem til i den store listen
  const cleanedData = results.data.map((row) => transformRow(row));
  allProducts = allProducts.concat(cleanedData);

  console.log(`  - Ferdig med: ${file}`);
});

// 3. Lagre alt til slutt når loopen er ferdig
if (allProducts.length > 0) {
  const csvOutput = Papa.unparse(allProducts);
  fs.writeFileSync(outputFile, csvOutput);
  console.log(
    `\nSuksess! Totalt ${allProducts.length} produkter lagret i ${outputFile}`,
  );
} else {
  console.log(
    "Ingen data ble funnet. Sjekk at CSV-filene ligger i ./input_csv",
  );
}
