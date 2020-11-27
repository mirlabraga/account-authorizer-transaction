import { Account } from "../model/Account";
import { Transaction } from "../model/Transaction";
import { ITransactionValidation } from "./ITransactionValidation";


export class ActiveCardValidator implements ITransactionValidation {

  constructor(private violations: string[]) { }

  public validate(account: Account, transaction: Transaction): boolean {
    const valid = account.activeCard;
    if (!valid) {
      this.violations.push('card-not-active');
    }
    return valid;
  }
}
