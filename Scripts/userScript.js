// import { createReadStream } from 'fs';
// import csv from 'csv-parser';

// const Path = '../users.csv';

// const data = [];

// createReadStream(Path)
//   .pipe(csv())
//   .on('data', (row) => {
//     data.push(row);
//   })
//   .on('end', () => {

//     console.log(data)
//   });
import { createReadStream } from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

export const parseCSV = async (callback) => {
  const data = [];
  const saltRounds = 10;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filepath = path.join(__dirname, "..", "users.csv");

  createReadStream(filepath)
    .pipe(csv())
    .on("data", async (row) => {
      if (row.password && typeof row.password === 'string') {  // Ensure the password exists and is a string
        data.push(row);
      }
    })
    .on("end", () => {
      callback(data);
    });
};
