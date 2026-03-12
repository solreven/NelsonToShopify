# Nelson to Shopify CSV Transformer 📦➡️🛒

A lightweight **TypeScript** utility that converts product data exported from
Nelson Garden into a format suitable for importing into **Shopify**. The
conversion focuses on normalizing article numbers, prices, images, descriptions
and other fields used by Shopify's CSV importer.

> The original data is expected in semicolon-delimited CSV files placed in
> `./input_csv`. Running the program produces a single `shopify_import_total.csv`
> with all rows transformed.

---

## 🚀 Features

- Reads multiple CSV files from an `input_csv` directory
- Parses Nelson Garden exports (semicolon-delimited)
- Extracts and normalizes:
  - Article number → `SKU`
  - Name/description fields → `Title` / `Body (HTML)`
  - Recommended price (only Norwegian NOK values)
  - Up to four image URLs
  - EAN codes, weight, weight unit, etc.
- Outputs a single Shopify‑compatible CSV file
- Includes a test suite powered by **Jest** and **PapaParse**

---

## 🛠 Prerequisites

The project requires the following tools installed on your machine:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

---

## ⚙️ Installation

1. Clone or download this repository.
2. Navigate into the project directory:
   ```bash
   cd NelsonToShopify
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

> The package uses `papaparse` at runtime and TypeScript tooling for
> development.

---

## 🏁 Usage

Add your Nelson Garden CSV exports (semicolon-separated) to the
`input_csv/` folder. Example structure:

```
input_csv/
  1.csv
  2.csv
  All Data.csv
```

Then run the transform script using `ts-node`:

```bash
npx ts-node index.ts
```

You should see console output indicating how many files were processed and the
total number of products written. The resulting CSV will be written to
`shopify_import_total.csv` in the project root.

Alternatively, compile the TypeScript and execute with Node:

```bash
npx tsc
node dist/index.js   # assuming you adjust tsconfig/outDir accordingly
```

> The script is intentionally simple; feel free to wrap it in a higher‑level
> CLI or add options as needed.

---

## 🧪 Running Tests

The repository includes a test suite verifying the
`transformRow` logic and ensuring CSV serialization handles edge cases.

Execute the tests with:

```bash
npm test
```

Jest will pick up `transformer.test.ts` and report coverage under
`coverage/` if configured.

---

## 📁 Project Structure

```
.
├── index.ts            # entry point that processes CSVs
├── transformer.ts      # core row‑mapping logic
├── transformer.test.ts # unit tests
├── input_csv/          # sample/expected input folder
├── shopify_import_total.csv  # generated output
├── package.json
├── tsconfig.json       # (if present) TypeScript configuration
├── jest.config.js      # Jest configuration
└── README.md           # this file
```

---

## 📜 License & Version History

- **License:** ISC (see `package.json`)

### Version History

- **v0.25** – Updated README with expanded documentation and usage instructions; bumped version note to reflect current state.
- **v0.2** – Finally added a `.gitignore`
- **v0.15** – Now also deals with weights and weight units
- **v0.13b** – Added more tests because I'm paranoid
- **v0.13** – Implemented EAN to barcode
- **v0.12** – Handles multiple resources and tests that PapaParse quotes any descriptions with commas
- **v0.09** – Handles a resource URL and a
- **v0.07** – Refactored to just extract NOK
- **v0.05** – Handles no prices and single currency prices; filters out multiple prices
- **v0.02** – Turns benevnelse into a title
- **v0.01** – Installed PapaParse to deal with CSV conversion; converts a file containing an article number into a file containing an SKU-code.

Feel free to update the version string and changelog as the project evolves.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to
fork the project, make changes, and open a pull request.

---

_Happy gardening and Shopify importing!_ 🌱🛍️
