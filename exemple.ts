import * as dotenv from "dotenv";
import TxpoolExplorer, { Transaction } from "./src";

dotenv.config();

const { WEBSOCKET_PROVIDER } = process.env;

const explorer = new TxpoolExplorer({ host: WEBSOCKET_PROVIDER! });

let filter = (transaction: Transaction) =>
  transaction.to == "0x7D0556D55ca1a92708681e2e231733EBd922597D";

explorer.watch({ pool: "pending", filter }, (transactions) => {
  console.log(transactions);
});

explorer.getPoolContent().then((content) => {
  let { pending, queued } = content;
  console.log(content);
});
