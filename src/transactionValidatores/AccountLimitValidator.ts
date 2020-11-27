import { Transaction } from '../model/Transaction';
import { Account } from '../model/Account';
import { ITransactionValidation } from "./ITransactionValidation";


export class AccountLimitValidator implements ITransactionValidation {

  constructor(private violations: string[]) { }

  public validate(account: Account, transaction: Transaction): boolean {
    const valid = account.availableLimit >= transaction.amount;
    if (!valid) {
      this.violations.push('insufficient-limit');
    }
    return valid;
  }
}
