import { AccountService } from "./src/service/account.service";
import { OperationData } from "./src/service/operation.service";
import processFile from "./src/common/parserFile";
import { Operation } from "./src/models/operation.model";
import { Account } from "./src/models/account.model";

export default async function main() {
  const file = process.argv[2];
  const operationData = new OperationData();
  const operation: Operation = await processFile(file, operationData) as Operation;
  const accountService = new AccountService();
  const account: Account = operation.account;
  accountService.createAccount(account);

  // console.log(operation.account);
  // console.log(operation.transaction);
}

try {
  main();
} catch (error) {
  // console.log(error);
}
