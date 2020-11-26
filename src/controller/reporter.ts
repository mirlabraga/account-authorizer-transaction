import { Account } from "../models/account.model";

interface IAccountReport {
  report: (account: Account) => void;
}
export class ConsoleReporter implements IAccountReport {
  constructor(private violations: string[]){ }

  public report(account: Account) {
    console.log(JSON.stringify({
      account: {
        activeCard: account.activeCard,
        availableLimit: account.availableLimit
      },
      violations: this.violations || []
    }));
  }
}
