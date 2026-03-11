console.log("Teste at programmet starter");
import * as fs from "fs";
import Papa from "papaparse";
import { transformRow } from "./transformer";

// Read the CSV-file
const fileContent = fs.readFileSync("input.csv", "utf8");

// Papa-parse the CSV-file
Papa.parse(fileContent, {
  header: true, // The first row gets defined as a key?
  skipEmptyLines: true,
  complete: (results) => {
    // Does the transformation of the data
    const cleanedData = results.data.map((row) => transformRow(row));

    // Outputs csv-file
    const csvOutput = Papa.unparse(cleanedData);

    // Makes a new file
    fs.writeFileSync("output.csv", csvOutput);
    console.log("Success! This should be a shopify-friendly csv-file.");
  },
});
