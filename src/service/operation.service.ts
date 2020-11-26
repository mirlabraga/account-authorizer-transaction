
import { validate, ValidatorResult } from "jsonschema";
import { ProcessData } from "../common/processData";
import { schemaAccount } from "../models/schemas/account.schema";
import { schemaTransaction } from "../models/schemas/transaction.schema";

export class OperationData extends ProcessData {
  private account:any;
  private transactions: any[] = [];

  run(line: any, objectReturn: Object) {

    // console.log(`OperationData class: running ${line}`);

    const parsedLine = JSON.parse(line);
    if (parsedLine.account) {
      const validatorAccount: ValidatorResult = validate(parsedLine, schemaAccount);
      this.account = parsedLine.account;
    } else if (parsedLine.transaction) {
      const validatorTransaction: ValidatorResult = validate(parsedLine, schemaTransaction);
      this.transactions.push(parsedLine.transaction)
    } else {
      throw new Error(`Invalid json line: ${line}`);
    }
    objectReturn = { ...objectReturn, account: this.account ,transactions: this.transactions }
    return objectReturn;
  }
}
