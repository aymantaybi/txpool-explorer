import { hexToNumber, hexToNumberString, isAddress, toChecksumAddress } from "web3-utils";
import Transaction from "../interfaces/transaction";

function formatTransaction(transaction: Transaction): Transaction {
  return {
    ...transaction,
    gas: hexToNumber(transaction.gas),
    gasPrice: hexToNumberString(transaction.gasPrice),
    nonce: hexToNumber(transaction.nonce),
    value: hexToNumberString(transaction.value),
    type: hexToNumberString(transaction.type),
    from: isAddress(transaction.from) ? toChecksumAddress(transaction.from) : transaction.from,
    to: isAddress(transaction.to) ? toChecksumAddress(transaction.to) : transaction.to,
  };
}

export { formatTransaction };
