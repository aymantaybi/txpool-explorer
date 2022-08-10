import Web3 from "web3";
import { websocketProviderOptions } from "./constants";

import Transaction from "./interfaces/transaction";
import { formatTransaction } from "./helpers/formatter";

import { EventEmitter } from "events";

import { WebsocketProviderOptions } from "web3-core-helpers";
import { WebsocketProvider } from "web3-providers-ws";

interface Constructor {
  host?: string;
  options?: WebsocketProviderOptions;
  websocketProvider?: WebsocketProvider;
}

type Pending = { [hash: string]: { [nonce: string]: Transaction } };
type Queued = { [hash: string]: { [nonce: string]: Transaction } };

interface Content {
  pending: Pending;
  queued: Queued;
}

class Explorer {
  web3: any;
  private eventEmitter = new EventEmitter();
  websocketProvider: WebsocketProvider | undefined;

  private pool: { pending: Transaction[]; queued: Transaction[] } = {
    pending: [],
    queued: [],
  };

  private pendingTransactionsHashSortedAndJoined = "";

  constructor({
    host,
    options = websocketProviderOptions,
    websocketProvider,
  }: Constructor) {
    if (!host && !websocketProvider)
      throw new Error(
        "You need to provide either 'host' or 'websocketProvider' to the constructor "
      );

    this.websocketProvider = host
      ? new Web3.providers.WebsocketProvider(host, options)
      : websocketProvider;
    this.web3 = new Web3(this.websocketProvider!);

    this.web3.extend({
      property: "txpool",
      methods: [{ name: "content", call: "txpool_content" }],
    });

    this.web3.eth.subscribe("pendingTransactions").on("data", this.onData);
  }

  private onData = async () => {
    let { pending, queued } = await this.getPoolContent();
    this.eventEmitter.emit("pending", pending);
    this.eventEmitter.emit("queued", queued);
    [this.pool.pending, this.pool.queued] = [pending, queued];
  };

  private formatPoolContent(content: Content, pool: "pending" | "queued") {
    let data = content[pool];
    let rawTransactions = Object.values(data)
      .map((addressTransactions: { [nonce: string]: Transaction }) =>
        Object.values(addressTransactions)
      )
      .flat();
    return rawTransactions.map((transaction: Transaction) =>
      formatTransaction(transaction)
    );
  }

  async getPoolContent() {
    let content: Content = await this.web3.txpool.content();
    let pending = this.formatPoolContent(content, "pending");
    let queued = this.formatPoolContent(content, "queued");
    return { pending, queued };
  }

  getPoolTransactions(
    pool: "pending" | "queued",
    filter: (transaction: Transaction) => boolean = () => true
  ) {
    return this.pool[pool].filter((transaction) => filter(transaction));
  }

  getPoolTransactionsHash(
    pool: "pending" | "queued",
    filter: (transaction: Transaction) => boolean = () => true
  ) {
    return this.getPoolTransactions(pool, filter).map(
      (transaction) => transaction.hash
    );
  }

  watch(
    {
      pool,
      filter = () => true,
    }: {
      pool: "pending" | "queued";
      filter?: (transaction: Transaction) => boolean;
    },
    callback: (transactions: Transaction[]) => void = () => {}
  ) {
    this.eventEmitter.on(pool, (transactions: Transaction[]) => {
      let oldPendingTransactionsHash = this.getPoolTransactionsHash(
        "pending",
        filter
      );

      let newPendingTransactionsHash = transactions
        .filter(filter)
        .map((transaction: Transaction) => transaction.hash);

      if (
        oldPendingTransactionsHash.sort().join("") ==
        newPendingTransactionsHash.sort().join("")
      )
        return;

      callback(transactions.filter(filter));
    });
    return this.eventEmitter;
  }
}

export default Explorer;

export { Transaction };
