import { AccountService } from "./src/service/account.service";
import { OperationData } from "./src/service/operation.service";
import processFile from "./src/common/parserFile";
import { Operation } from "./src/models/operation.model";

export default async function main() {
  const file = process.argv[2];

  const operationData = new OperationData();
  const operation: Operation = await processFile(file, operationData) as Operation;

  const accountService = new AccountService();
  accountService.createAccount(operation.account);
  const result = await accountService.processTransaction(operation.transactions);
  console.log(result);
}

try {
  main();
} catch (error) {
  console.log(error);
}
