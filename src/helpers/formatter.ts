import utils from "web3-utils";
import Transaction from "../interfaces/transaction";

function formatTransaction(transaction: Transaction): Transaction {
  return {
    ...transaction,
    gas: utils.hexToNumber(transaction.gas),
    gasPrice: utils.hexToNumberString(transaction.gasPrice),
    nonce: utils.hexToNumber(transaction.nonce),
    value: utils.hexToNumberString(transaction.value),
    type: utils.hexToNumberString(transaction.type),
    from: utils.toChecksumAddress(transaction.from),
    to: utils.toChecksumAddress(transaction.to),
  };
}

export { formatTransaction };
