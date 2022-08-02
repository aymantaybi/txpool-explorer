import Web3 from "web3";
import { options } from "./constants";

import Transaction from "./interfaces/transaction";
import { formatTransaction } from "./helpers/formatter";

import { EventEmitter } from "events";

interface Constructor {
  host: string;
}

type Pending = { [hash: string]: { [nonce: string]: Transaction } };
type Queued = { [hash: string]: { [nonce: string]: Transaction } };

class Explorer {
  private web3: any;
  private eventEmitter = new EventEmitter();

  private pool: { pending: Pending; queued: Queued } = {
    pending: {},
    queued: {},
  };

  private filters = {
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
      this.web3.txpool.content(
        (error: any, data: { pending: Pending; queued: Queued }) => {
          if (error) return console.log(error);
          let { pending, queued } = data;
          [this.pool.pending, this.pool.queued] = [pending, queued];
          let pendingTransactions = this.getPoolTransactions(
            "pending",
            this.filters["pending"]
          );
          this.eventEmitter.emit("pending", pendingTransactions);
        }
      );
    });
  }

  async getPoolContent() {
    let { pending, queued } = await this.web3.txpool.content();
    [this.pool.pending, this.pool.queued] = [pending, queued];
    let pendingTransactions = this.getPoolTransactions("pending");
    let queuedTransactions = this.getPoolTransactions("queued");
    return {
      pending: pendingTransactions,
      queued: queuedTransactions,
    };
  }

  getPoolTransactions(
    pool: "pending" | "queued",
    filter: (...params: any) => boolean = () => true
  ) {
    let data = this.pool[pool];
    let rawTransactions: Transaction[] = Object.values(data)
      .map((addressTransactions: { [nonce: string]: Transaction }) =>
        Object.values(addressTransactions)
      )
      .flat();
    let formatedTransactions = rawTransactions.map((transaction: Transaction) =>
      formatTransaction(transaction)
    );
    return formatedTransactions.filter((transaction) => filter(transaction));
  }

  watch(
    {
      pool,
      filter = () => true,
    }: { pool: "pending" | "queued"; filter?: (...params: any) => boolean },
    callback: (transactions: Transaction[]) => any = () => {}
  ) {
    this.filters[pool] = filter;
    this.eventEmitter.on(pool, callback);
    return this.eventEmitter;
  }
}

export default Explorer;
