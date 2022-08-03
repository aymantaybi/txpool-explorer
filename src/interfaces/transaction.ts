interface Transaction {
  blockHash: null;
  blockNumber: null;
  transactionIndex: null;
  from: string;
  gas: number;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: number;
  to: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
};

export default Transaction;
