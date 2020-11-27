import { Account } from "../model/Account";
import { Transaction } from "../model/Transaction";
import { ITransactionValidation } from "./ITransactionValidation";

export const TWO_MINUTES = 2 * 60 * 1000;

export class DoubleTransactionValidator implements ITransactionValidation {

  constructor(private violations: string[], private transactions: Transaction[]) { }

  public validate(account: Account, transaction: Transaction): boolean {
    const transactionDate = new Date(transaction.time);

    let countSimilar = 0;
    for (let i = this.transactions.length - 1; i >= 0; i--) {
      const currentTransaction = this.transactions[i];
      const currentTransactionDate = new Date(currentTransaction.time);
      const timeDiff = transactionDate.getTime() - currentTransactionDate.getTime();
      if (timeDiff > TWO_MINUTES) {
        return true;
      } else {
        if (currentTransaction.amount == transaction.amount && currentTransaction.merchant == transaction.merchant) {
          countSimilar++;
          if (countSimilar > 1) {
            this.violations.push('doubled-transaction');
            return false;
          }
        }
      }
    }
    return true;
  }
}
