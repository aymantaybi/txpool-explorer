import * as dotenv from "dotenv";
import Web3 from "web3";
import TxpoolExplorer, { Transaction } from "./src";
import { websocketProviderOptions } from "./src/constants";
import utils from "web3-utils";

dotenv.config();

const { WEBSOCKET_PROVIDER } = process.env;

const websocketProvider = new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER!, websocketProviderOptions);

const explorer = new TxpoolExplorer({ websocketProvider, options: websocketProviderOptions });

let pool: "pending" | "queued" = "pending";

let filter = (transaction: Transaction) => transaction.to == "0x7D0556D55ca1a92708681e2e231733EBd922597D";

explorer.watch({ pool }, (transactions: Transaction[]) => {
  console.log(transactions.map((transaction) => transaction.hash));
});

explorer.getPoolContent().then((content) => {
  let { pending, queued } = content;
  //console.log(pending);
});

/* websocketProvider.connection.addEventListener("open", () => console.log("open"));
websocketProvider.connection.addEventListener("close", () => console.log("close"));
websocketProvider.on("reconnect", () => {
  console.log("reconnect");
}); */
