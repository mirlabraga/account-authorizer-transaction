import {Transaction} from './transaction.model';

export interface ITransactionValiation {
  validate: (account: Account, transaction: Transaction) => boolean
}


export class Validations implements ITransactionValiation {
  constructor(private validations: ITransactionValiation[]) {

  }

  public validate(account: Account, transaction: Transaction) {
    return this.validations.reduce((prev: boolean, validator: ITransactionValiation) => {
      return prev && validator.validate(account, transaction);
    }, true);
  }
}

export class AccountLimitValidator implements ITransactionValiation {

  constructor(private violations: string[]) {}

  public validate(account: Account, transaction: Transaction): boolean {
    const valid = account.availableLimit >= transaction.amount;
    if (!valid) {
      this.violations.push('insufficient-limit');
    }
    return valid;
  }
}

export class ActiveCardValidator implements ITransactionValiation {

  constructor(private violations: string[]) {}

  public validate(account: Account, transaction: Transaction): boolean {
    const valid = account.activeCard;
    if (!valid) {
      this.violations.push('card-not-active');
    }
    return valid;
  }
}


const TWO_MINUTES = 2 * 60 * 1000;

export class DoubleTransactionValidator implements ITransactionValiation {

  constructor(private violations: string[], private transactions: Transaction[]) {}

  public validate(account: Account, transaction: Transaction): boolean {
    const transactionDate = new Date(transaction.time);

    let countSimilar = 0;
    for(let i = this.transactions.length - 1; i >= 0; i--) {
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

export class HighFrequencySmallIntervalValidator implements ITransactionValiation {

  constructor(private violations: string[], private transactions: Transaction[]) {}

  public validate(account: Account, transaction: Transaction): boolean {
    const transactionDate = new Date(transaction.time);

    let count = 0;
    for(let i = this.transactions.length - 1; i >= 0; i--) {
      const currentTransaction = this.transactions[i];
      const currentTransactionDate = new Date(currentTransaction.time);
      const timeDiff = transactionDate.getTime() - currentTransactionDate.getTime();
      if (timeDiff > TWO_MINUTES) {
        return true;
      } else {
        count++;
        if (count > 2) {
          this.violations.push('high-frequency-small-interval');
          return false;
        }
      }
    }
    return true;
  }
}

export class Account {
  constructor(
    public activeCard: boolean,
    public availableLimit: number,
    public validator: ITransactionValiation | null,
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
