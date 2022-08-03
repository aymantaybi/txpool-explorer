
# txpool-explorer

Nodejs Ethereum transactions pool explorer.


## Installation

Install txpool-explorer with npm

```bash
  npm install txpool-explorer
```
    
## Before Starting

Make sure to whitelist the ***txpool*** namespace as described in the [Official Go implementation of the Ethereum protocol
](https://geth.ethereum.org/docs/rpc/server#websocket-server/).

```bash
geth --ws --ws.api eth,net,web3,txpool
```
## Getting Started

```typescript
 import TxpoolExplorer, { Transaction } from "txpool-explorer";

 const host : string = 'http://127.0.0.1:8546' // Provider Websocket Endpoint 

 const explorer = new TxpoolExplorer({ host });
```
## API Reference

#### Get Transaction Pool Content :
```typescript
  console.log(await explorer.getPoolContent());
```
#### Returns : 
```typescript
Promise<{pending:Transaction[];queued:Transaction[];}>
```

<details>
<summary>Output</summary>
<pre>
{
  pending: [
    {
      blockHash: null,
      blockNumber: null,
      from: '0x07D0a239BC043F865701b4f9c10708b588cb41fC',
      gas: 278717,
      gasPrice: '1000000000',
      hash: '0xa58a61bc409418039eb2a6872a3803069a0be7a23d5610d4b53bf0c22043bcdd',
      input: '0x3d8527ba',
      nonce: 462,
      to: '0x05B0BB3c1c320b280501B86706C3551995BC8571',
      transactionIndex: null,
      value: '0',
      type: '0',
      v: '0xfec',
      r: '0xac8b2902ce1934691c5bfc01d51715fd8cf9f453d96a18f004bc7b653cf4b759',
      s: '0x3aeaa28fb14c9292af603e9b50aa22d50277a35df9d8e899109ed85f65c8d989'
    },
    {
      blockHash: null,
      blockNumber: null,
      from: '0x4F86757c66D4dC87c1E2c551B612116f8F3f2FEf',
      gas: 371110,
      gasPrice: '1000000000',
      hash: '0xc71c66c62df973011daa07138a6eb0d8b4444046549a70f206731c2690336005',
      input: '0x0b83021800000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000032950db2a7164ae833121501c797d79e7b79d74c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000a7f81f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000012d452694f400000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000012d452694f40000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000015180',
      nonce: 173,
      to: '0x213073989821f738A7BA3520C3D31a1F9aD31bBd',
      transactionIndex: null,
      value: '0',
      type: '0',
      v: '0xfec',
      r: '0x8d5db63c42c63e847a60461ebf269d0fd89c1ce2138e8295c15c40ec249515e9',
      s: '0x26031ecb88d23d0ad8fa2fb3d4ef31424f56399b180e05efad8b37674f8bbfe1'
    },
    {
      blockHash: null,
      blockNumber: null,
      from: '0x643eA06aAC2c680ea9dC9383677A01918719D67f',
      gas: 368888,
      gasPrice: '1000000000',
      hash: '0x31b80beef134aef4e165f6263235d9435c29374dfbf858902bcbf32a6eb1cb57',
      input: '0x42842e0e000000000000000000000000643ea06aac2c680ea9dc9383677a01918719d67f0000000000000000000000008477b2c14b11b73e73d2500b38d07b3d3b1852ad00000000000000000000000000000000000000000000000000000000004b93f2',
      nonce: 5740,
      to: '0x32950db2a7164aE833121501C797D79E7B79d74C',
      transactionIndex: null,
      value: '0',
      type: '0',
      v: '0xfeb',
      r: '0x36f6aaa775bc961824d938e028539fe2c24eb9650175a2e89b33a7e06fefda8',
      s: '0x5d3e5df1d2e6cf2eb3192d6bd7568f4c4ef0c808995f3b571b8e93142349f1'
    },
    {
      blockHash: null,
      blockNumber: null,
      from: '0x724Df78905ddC450b4f7636285e59A253264ecC7',
      gas: 368888,
      gasPrice: '1000000000',
      hash: '0x3619c0cdfe8cc0123cf11284925ba76ed24956850960656e5b89c606dfddafae',
      input: '0x42842e0e000000000000000000000000724df78905ddc450b4f7636285e59a253264ecc70000000000000000000000005c9c64a4b713db9a50bc8f4929426d2a345e24250000000000000000000000000000000000000000000000000000000000065d51',
      nonce: 6795,
      to: '0x32950db2a7164aE833121501C797D79E7B79d74C',
      transactionIndex: null,
      value: '0',
      type: '0',
      v: '0xfeb',
      r: '0x21828f8ba0078b2755e2d798d64dfc73a5ea6150b4fa4e82e3968560691283c0',
      s: '0x166633fbac89fba1f7a09e915334553827b7f091aac954bf6052289e0e7489bf'
    },
    {
      blockHash: null,
      blockNumber: null,
      from: '0x82902996F63CE28C3520ADE29FfCAdF4FB4A3046',
      gas: 187383,
      gasPrice: '1000000000',
      hash: '0x331292107bdebfa5c506b4ad3cb9d5202ffafd98a9a965bac2fa80082dbcce5d',
      input: '0x92bd7b2c',
      nonce: 23,
      to: '0xb9072cEc557528f81DD25DC474d4d69564956e1e',
      transactionIndex: null,
      value: '0',
      type: '0',
      v: '0xfec',
      r: '0xb912e34e3f1687e2271727b4f613b7464a3041ee123bde0fcc024a0569605b0a',
      s: '0x369c796ef892ac651f9f74469dc00fc9a75904d0a7ba1c329239106e76448aa'
    },
    {
      blockHash: null,
      blockNumber: null,
      from: '0x96DE7901c32c1a91eEe9696b885250b7Bc082876',
      gas: 121561,
      gasPrice: '1000000000',
      hash: '0xe68b65a8cbea4662ac55223f9910b97d31b1d0890592d5542189dc99825af956',
      input: '0x96b5a7550000000000000000000000000000000000000000000000000000000000829f8a',
      nonce: 2929,
      to: '0x213073989821f738A7BA3520C3D31a1F9aD31bBd',
      transactionIndex: null,
      value: '0',
      type: '0',
      v: '0xfec',
      r: '0x8a17ed12e4860a03cfaba9a967048272ac91c4340e3576d5219892fe0fa641a5',
      s: '0x758b186e884aafd4115647a3525db2763cfbafddbba8009aa9ac9df800891fc4'
    }
  ],
  queued: []
}
</pre>
</details>

#### Subscribe to the transactions pool updates :

```typescript
  let pool: "pending" | "queued" = "pending";
  let filter = (transaction: Transaction) => transaction.to == "0x7D0556D55ca1a92708681e2e231733EBd922597D";
  
  explorer.watch({ pool, filter }, (transactions: Transaction[]) => {
    console.log(transactions);
  });
```

#### Parameters

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `pool` | `string` | **Required**. "pending" or "queued" |
| `filter` | `(transaction: Transaction) => boolean` | **Optional**. Filter callback called with the argument transaction of type `Transaction` |

<details>
<summary>Output</summary>
<pre>
[
  {
    blockHash: null,
    blockNumber: null,
    from: '0x8a8D254350Ad904C3d3E5a4FA1AAb756ED0d3486',
    gas: 327243,
    gasPrice: '1000000000',
    hash: '0xd24903ce34756e629d9a1aeb2444701d1447c9a6c505dd0f845ca39e1512b097',
    input: '0x38ed173900000000000000000000000000000000000000000000000000000000011720e1000000000000000000000000000000000000000000000000000000000000106900000000000000000000000000000000000000000000000000000000000000a00000000000000000000000008a8d254350ad904c3d3e5a4fa1aab756ed0d34860000000000000000000000000000000000000000000000000000000062ea064800000000000000000000000000000000000000000000000000000000000000030000000000000000000000000b7007c13325c48911f73a2dad5fa5dcbf808adc000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef5000000000000000000000000a8754b9fa15fc18bb59458815510e40a12cd2014',
    nonce: 243,
    to: '0x7D0556D55ca1a92708681e2e231733EBd922597D',
    transactionIndex: null,
    value: '0',
    type: '0',
    v: '0xfec',
    r: '0xf25ccb6ea3f26c866c57ffea765445c1af7f0652fe58cf78f2f985b5513b8b4d',
    s: '0xf1e06d9c63afb24ba2be17738217e4cf4a0412afbeb9a7db9d76658e7f3ea14'
  }
]
[
  {
    blockHash: null,
    blockNumber: null,
    from: '0x8a8D254350Ad904C3d3E5a4FA1AAb756ED0d3486',
    gas: 327243,
    gasPrice: '1000000000',
    hash: '0xd24903ce34756e629d9a1aeb2444701d1447c9a6c505dd0f845ca39e1512b097',
    input: '0x38ed173900000000000000000000000000000000000000000000000000000000011720e1000000000000000000000000000000000000000000000000000000000000106900000000000000000000000000000000000000000000000000000000000000a00000000000000000000000008a8d254350ad904c3d3e5a4fa1aab756ed0d34860000000000000000000000000000000000000000000000000000000062ea064800000000000000000000000000000000000000000000000000000000000000030000000000000000000000000b7007c13325c48911f73a2dad5fa5dcbf808adc000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef5000000000000000000000000a8754b9fa15fc18bb59458815510e40a12cd2014',
    nonce: 243,
    to: '0x7D0556D55ca1a92708681e2e231733EBd922597D',
    transactionIndex: null,
    value: '0',
    type: '0',
    v: '0xfec',
    r: '0xf25ccb6ea3f26c866c57ffea765445c1af7f0652fe58cf78f2f985b5513b8b4d',
    s: '0xf1e06d9c63afb24ba2be17738217e4cf4a0412afbeb9a7db9d76658e7f3ea14'
  },
  {
    blockHash: null,
    blockNumber: null,
    from: '0x9bD3b2270C2D2b6971db0e60B1329E0133daEb41',
    gas: 188020,
    gasPrice: '1000000000',
    hash: '0xe1360893674ac69ae15daf28c14852739534f76b0b294094d095331b33b7b98b',
    input: '0x38ed1739000000000000000000000000000000000000000000000000001565974bf8fe0000000000000000000000000000000000000000000000000000000000000008c700000000000000000000000000000000000000000000000000000000000000a00000000000000000000000009bd3b2270c2d2b6971db0e60b1329e0133daeb410000000000000000000000000000000000000000000000000000000062ea064b0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c99a6a985ed2cac1ef41640596c5a5f9f4e19ef5000000000000000000000000a8754b9fa15fc18bb59458815510e40a12cd2014',
    nonce: 868,
    to: '0x7D0556D55ca1a92708681e2e231733EBd922597D',
    transactionIndex: null,
    value: '0',
    type: '0',
    v: '0xfeb',
    r: '0x14bcbc858aa1bdaf40e9093eb9102cf3347374260d1c8ef7181f369d428b8fed',
    s: '0x408fbe2f58117d2617ac23e5ebf1e6ce394bfecca2a6f7c35c2d329a7dfbf8ca'
  }
]
</pre>
</details>

