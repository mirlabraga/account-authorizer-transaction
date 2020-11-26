import { ConsoleReporter } from "../controller/reporter";
import { Account, AccountLimitValidator, ActiveCardValidator, DoubleTransactionValidator, HighFrequencySmallIntervalValidator, Validations } from "../models/account.model";
import { Transaction } from "../models/transaction.model";

export class OperationService {

  private validator: Validations | null = null;
  private reporter: ConsoleReporter | null = null;


  constructor(private violations: string[] = [], private transactions: Transaction[] = []) {

    this.validator = new Validations([
      new AccountLimitValidator(violations),
      new ActiveCardValidator(violations),
      new DoubleTransactionValidator(violations, transactions),
      new HighFrequencySmallIntervalValidator(violations, transactions)
    ]);

    this.reporter = new ConsoleReporter(this.violations)
  }


  async process(lines: any, currentAccount: any) {


    for await (const line of lines) {
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
