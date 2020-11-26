import { Account } from "./account.model";
import { Transaction } from "./transaction.model";

export interface Operation extends Object{
  account: Account;
  transactions: Transaction[];
}
