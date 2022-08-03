import Web3 from "web3";
import { options } from "./constants";

import Transaction from "./interfaces/transaction";
import { formatTransaction } from "./helpers/formatter";

import { EventEmitter } from "events";

interface Constructor {
  host: string;
};

type Pending = { [hash: string]: { [nonce: string]: Transaction } };
type Queued = { [hash: string]: { [nonce: string]: Transaction } };

interface Content {
  pending: Pending;
  queued: Queued;
};

class Explorer {
  private web3: any;
  private eventEmitter = new EventEmitter();

  private pool: { pending: Transaction[]; queued: Transaction[] } = {
    pending: [],
    queued: [],
  };

  private filters: {
    pending: (transaction: Transaction) => boolean;
    queued: (transaction: Transaction) => boolean;
  } = {
    pending: () => true,
    queued: () => true,
  };

  constructor({ host }: Constructor) {
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(host, options));

    this.web3.extend({
      property: "txpool",
      methods: [{ name: "content", call: "txpool_content" }],
    });

    this.web3.eth.subscribe("pendingTransactions").on("data", () => {
      this.getPoolContent().then(({ pending, queued }) => {
        [this.pool.pending, this.pool.queued] = [pending, queued];
        let pendingTransactions = this.getPoolTransactions(
          "pending",
          this.filters["pending"]
        );
        pendingTransactions.length &&
          this.eventEmitter.emit("pending", pendingTransactions);
      });
    });
  }

  async getPoolContent() {
    let content: Content = await this.web3.txpool.content();
    let pending = this.formatPoolContent(content, "pending");
    let queued = this.formatPoolContent(content, "queued");
    return { pending, queued };
  }

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

  getPoolTransactions(
    pool: "pending" | "queued",
    filter: (transaction: Transaction) => boolean = () => true
  ) {
    return this.pool[pool].filter((transaction) => filter(transaction));
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
    this.filters[pool] = filter;
    this.eventEmitter.on(pool, callback);
    return this.eventEmitter;
  }
}

export default Explorer;

export { Transaction };
