import Transaction from "./interfaces/transaction";

function getTransactionsGlobalHash(transactions: Transaction[]): string {
  return transactions
    .map((transaction: Transaction) => transaction.hash)
    .sort()
    .join("");
}

export { getTransactionsGlobalHash };
