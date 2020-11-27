
import { ITransactionValidation } from '../transactionValidatores/ITransactionValidation';
import { Transaction } from './Transaction';

export class Account {
  constructor(
    public activeCard: boolean,
    public availableLimit: number,
    public validator: ITransactionValidation,
    public transactions: Transaction[]
  ) {

  }

  public addTransaction(transaction: Transaction) {
    if (this.validator?.validate(this, transaction)) {
      this.transactions.push(transaction);
      this.availableLimit -= transaction.amount;
    }
  }
}
