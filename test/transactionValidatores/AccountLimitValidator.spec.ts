import { expect } from "chai";
import { Account } from "../../src/model/Account";
import { Transaction } from "../../src/model/Transaction";
import { AccountLimitValidator } from "../../src/transactionValidatores/AccountLimitValidator";
import { ITransactionValidation } from "../../src/transactionValidatores/ITransactionValidation";

describe('Checking the validation transactions', function() {

  describe('Considering a input with many transaction with total amount is more than availableLimit', function() {

    it('should return a error with violation information - insufficient-limit', function() {

      const transaction1: Transaction = { "merchant": "Burger King", "amount": 101, "time": "2019-02-13T10:00:00.000Z" } as Transaction;
      const transactions: Transaction[] = [transaction1];

      const accountLimiteValidation: ITransactionValidation = new AccountLimitValidator([]);
      const account: Account = new Account(true, 100, accountLimiteValidation, transactions);
      const valid = accountLimiteValidation.validate(account, transaction1)

      expect(valid).to.be.false;

    });
  });
});
