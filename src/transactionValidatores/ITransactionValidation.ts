import { Account } from "../model/Account";
import { Transaction } from "../model/Transaction";

export interface ITransactionValidation {
  validate: (account: Account, transaction: Transaction) => boolean;
}
