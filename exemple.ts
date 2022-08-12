import * as dotenv from "dotenv";
import Web3 from "web3";
import TxpoolExplorer, { Transaction } from "./src";

dotenv.config();

const { WEBSOCKET_PROVIDER } = process.env;

const websocketProvider = new Web3.providers.WebsocketProvider(
  WEBSOCKET_PROVIDER!
);

const explorer = new TxpoolExplorer({ websocketProvider });

let pool: "pending" | "queued" = "pending";

let filter = (transaction: Transaction) =>
  transaction.to == "0x7D0556D55ca1a92708681e2e231733EBd922597D";

explorer.watch({ pool }, (transactions: Transaction[]) => {
  console.log(transactions.map((transaction) => transaction.hash));
});

explorer.getPoolContent().then((content) => {
  let { pending, queued } = content;
  console.log(content);
});
