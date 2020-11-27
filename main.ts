import readline from 'readline';
import { ConsoleReporter } from './src/reporter/ConsoleReporter';
import { Validations } from "./src/transactionValidatores/Validations";
import { Transaction } from './src/model/Transaction';
import { OperationService as OperationProcessor } from './src/processor/OperationProcessor';
import { AccountLimitValidator } from './src/transactionValidatores/AccountLimitValidator';
import { ActiveCardValidator } from './src/transactionValidatores/ActiveCardValidator';
import { DoubleTransactionValidator } from './src/transactionValidatores/DoubleTransactionValidator';
import { HighFrequencySmallIntervalValidator } from './src/transactionValidatores/HighFrequencySmallIntervalValidator';

export default async function main() {

  const lines = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity
  });

  const violations: string[] = [];
  const transactions: Transaction[] = [];
  const validator = new Validations([
    new AccountLimitValidator(violations),
    new ActiveCardValidator(violations),
    new DoubleTransactionValidator(violations, transactions),
    new HighFrequencySmallIntervalValidator(violations, transactions)
  ]);

  const reporter = new ConsoleReporter(violations)

  const operation: OperationProcessor = new OperationProcessor(
    lines,
    violations,
    transactions,
    validator,
    reporter
  );
  operation.process();

}

try {
  main();
} catch (error) {
  console.log(error);
}
