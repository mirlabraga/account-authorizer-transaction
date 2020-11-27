import { Transaction } from '../model/Transaction';
import { Account } from '../model/Account';
import { ITransactionValidation } from "./ITransactionValidation";

export class Validations implements ITransactionValidation {
  constructor(private validations: ITransactionValidation[]) {
  }

  public validate(account: Account, transaction: Transaction) {
    return this.validations.reduce((prev: boolean, validator: ITransactionValidation) => {
      return prev && validator.validate(account, transaction);
    }, true);
  }
}
