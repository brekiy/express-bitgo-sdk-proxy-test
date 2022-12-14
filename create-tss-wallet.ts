import { BitGo } from "bitgo";
import * as openpgp from "openpgp";
import * as crypto from "crypto";
import { Tsol } from "bitgo/dist/types/src/v2/coins";

import { AddWalletOptions } from "@bitgo/sdk-core";

// this script emulates some frontend using the BitGo SDK

const bitgo = new BitGo({
  // garbage that we ignore in favor of your real developer token, stored in your backend proxy machine
  accessToken: "unusedValue",
  // change to prod/test as needed for whatever BitGo environment you want to use
  env: "test",
  // in the real setup this would be <my.awesome.custom.backend.urlroot>
  customRootURI: "localhost:3000",
});

// async function createCustodialWallet() {
//     const wallet = await bitgo.coin('tnear').wallets().add({
//         type: 'custodial',
//         multisigType: 'tss',
//         isCustodial: true,
//         label: 'my tss custody wallet',
//         enterprise: '62aa5fcae1863700070421c04e1c2b3b'
//     } as any as AddWalletOptions);

//     console.log(JSON.stringify(wallet, undefined, 2));
// }
// async function createHotWalletSimple() {
//     const newWallet = await bitgo.coin('tsol').wallets().generateWallet({
//         label: 'my tss hot Wallet',
//         passphrase: 'VerySecurePassword1234',
//         multisigType: 'tss',
//         passcodeEncryptionCode: 'random string',
//     });
//     console.log(JSON.stringify(newWallet, undefined, 2));
// }

async function createHotMultiSigWalletSimple() {
  const newWallet = await bitgo
    .coin("tbtc")
    .wallets()
    .generateWallet({
      label: "hot multisig wallet " + Math.floor(Date.now() / 1000),
      passphrase: "VerySecurePassword1234",
      enterprise: "yourEnterpriseIdHere",
    });
  console.log(JSON.stringify(newWallet, undefined, 2));
}

async function testToken() {
    const res = await fetch('http://localhost:3000/api/v1/client/constants')
    const resJSON = await res.json()
    console.log(resJSON);
  }

async function main() {
    // await testToken();
  await createHotMultiSigWalletSimple();
  // console.log("now making hot wallet simple");
  // await createHotWalletSimple();
}
main();
