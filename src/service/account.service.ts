import { Transaction } from "../models/transaction.model";
import { Account } from "../models/account.model";

export class AccountService {

  public account: Account | null = null;

  public createAccount(account: Account): Account {
    this.account = { ...account, "violations": ["account-already-initialized"] };
    return this.account;
  }

  public async processTransaction(transactions: Transaction[]) {

    // check card
    if (!this.account?.activeCard) {
      return { ...this.account, "violations": ["card-not-active"] };
    }

    // check limit
    const total = transactions.map(transaction => transaction.amount).reduce((accumulatorAmount, currentValueAmoount) => accumulatorAmount + currentValueAmoount);
    if (total > this.account.availableLimit) {
      return { ...this.account, "violations": ["insufficient-limit"] };
    }

    // check high frequency
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        if (transactions.length > 3 ) {
          resolve({ ...this.account, "violations": ["high-frequency-small-interval"] });
        } else {
          if (this.account?.availableLimit) {
            this.account.availableLimit = this.account.availableLimit - total;
            resolve(this.account);
          }
        }
      }, 200)
    })
  }
}
