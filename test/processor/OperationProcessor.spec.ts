import * as readline from 'readline';
import * as fs from 'fs';
import { OperationService as OperationProcessor } from '../../src/processor/OperationProcessor';
import { Transaction } from '../../src/model/Transaction';
import { Account } from '../../src/model/Account';
import { ITransactionValidation } from '../../src/transactionValidatores/ITransactionValidation';
import { assert } from "chai";

describe('Parsing the OperationData for checking input file', function() {

  describe('considering a input file just with account line', function() {

    it('creating account, should process operation from input', async function () {
      const lines: readline.Interface = readline.createInterface({
        input: fs.createReadStream('./test/operations_case_1', { encoding: "utf8" }),
        crlfDelay: Infinity
      });
      const violations: string[] = [];
      const transactions: Transaction[] = [];
      const validator: ITransactionValidation = {
        validate: () => {
          return true
        }
      }

      const reported: Account[] = [];
      const reporter = {
        report: (account: Account) => {
          reported.push(account);
        }
      }

      const operation: OperationProcessor = new OperationProcessor(
        lines,
        violations,
        transactions,
        validator,
        reporter
      );

      await operation.process();

      assert.equal(2, reported.length);
      assert.equal(0, violations.length);
      assert.equal(1, transactions.length);
      assert.equal(80, reported[1].availableLimit);
      assert.equal(true, reported[1].activeCard);
    });


    it('creating account, should not process transaction with violations', async function () {
      const lines: readline.Interface = readline.createInterface({
        input: fs.createReadStream('./test/operations_case_1', { encoding: "utf8" }),
        crlfDelay: Infinity
      });
      const violations: string[] = [];
      const transactions: Transaction[] = [];
      const validator: ITransactionValiation = {
        validate: () => {
          violations.push('should-not-process');
          return false
        }
      }

      const reported: Account[] = [];
      const reporter = {
        report: (account: Account) => {
          reported.push(account);
        }
      }

      const operation: OperationProcessor = new OperationProcessor(
        lines,
        violations,
        transactions,
        validator,
        reporter
      );

      await operation.process();

      assert.equal(2, reported.length);
      assert.equal(1, violations.length);
      assert.equal('should-not-process', violations[0]);

      assert.equal(0, transactions.length);
      assert.equal(100, reported[1].availableLimit);
      assert.equal(true, reported[1].activeCard);

    });
    it('creating account, should not process second account creation', async function () {
      const lines: readline.Interface = readline.createInterface({
        input: fs.createReadStream('./test/operations_case_2', { encoding: "utf8" }),
        crlfDelay: Infinity
      });
      const violations: string[] = [];
      const transactions: Transaction[] = [];
      const validator: ITransactionValiation = {
        validate: () => {
          return true
        }
      }

      const reported: Account[] = [];
      const reporter = {
        report: (account: Account) => {
          reported.push(account);
        }
      }

      const operation: OperationProcessor = new OperationProcessor(
        lines,
        violations,
        transactions,
        validator,
        reporter
      );

      await operation.process();

      assert.equal(2, reported.length);
      assert.equal(1, violations.length);
      assert.equal('account-already-initialized', violations[0]);

      assert.equal(0, transactions.length);
      assert.equal(100, reported[1].availableLimit);
      assert.equal(true, reported[1].activeCard);
    });
  });
});
