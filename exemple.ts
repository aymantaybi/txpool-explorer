import * as dotenv from "dotenv";
import TxpoolExplorer from "./src";

dotenv.config();

const { WEBSOCKET_PROVIDER } = process.env;

const explorer = new TxpoolExplorer({ host: WEBSOCKET_PROVIDER! });

explorer.watch({ pool: "pending" }, (transactions) => {
  console.log(transactions);
});

explorer.getPoolContent().then((content) => {
  let { pending, queued } = content;
  console.log(content);
});
