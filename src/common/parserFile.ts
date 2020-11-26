import { ProcessData } from "./processData";

const fs = require('fs');
const readline = require('readline');

export default async function processFile(file: any, processData: ProcessData): Promise<Object>  {

    const fileStream = fs.createReadStream(file, { encoding: "utf8" });
    const reader = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let objectReturn = {};
    for await (const line of reader) {
      // console.log(`Line from file:${line}`);
      objectReturn = processData.run(line, objectReturn);
    }
    return objectReturn;
}
