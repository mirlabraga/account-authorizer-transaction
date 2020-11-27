import { Interface } from "readline";
import { IAccountReport } from "../reporter/ConsoleReporter";
import { Account } from "../model/Account";
import { Transaction } from "../model/Transaction";
import { ITransactionValidation } from "../transactionValidatores/ITransactionValidation";

export class OperationService {

  constructor(
    private lines: Interface,
    private violations: string[],
    private transactions: Transaction[],
    private validator: ITransactionValidation,
    private reporter: IAccountReport
  ) {
  }

  async process() {

    let currentAccount: Account | null = null;

    for await (const line of this.lines) {
      const parsedLine = JSON.parse(line);
      if (parsedLine.account) {
        if (!currentAccount) {
          currentAccount = new Account(
            parsedLine.account.activeCard,
            parsedLine.account.availableLimit,
            this.validator,
            this.transactions
          );
        } else {
          this.violations.push('account-already-initialized');
        }
      } else {
        if (!!currentAccount) {
          currentAccount.addTransaction(parsedLine.transaction);
        } else {
          throw new Error(`Transaction before account created`);
        }
      }
      this.reporter?.report(currentAccount)
    }
  }
}
