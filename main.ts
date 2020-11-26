import readline from 'readline';
import { Account } from "./src/models/account.model";
import { OperationService } from './src/service/operation.service';

export default async function main() {

  let currentAccount: Account | null = null;
  const lines = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity
  });

  const operation: OperationService = new OperationService();
  operation.process(lines, currentAccount);

}

try {
  main();
} catch (error) {
  console.log(error);
}
