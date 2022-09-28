import {
    BitGo,
  } from "bitgo";
  import * as openpgp from "openpgp";
  import * as crypto from "crypto";
  import { Tsol } from "bitgo/dist/types/src/v2/coins";

import { AddWalletOptions } from '@bitgo/sdk-core';


const bitgo = new BitGo({
    // not actually used
    accessToken: 'unusedValue',
    // change to prod for real thing
    env: "test",
    // in the real setup this would be <app.awesome.nike.backend>
    customRootURI: 'localhost:3000', 
});
  
async function createCustodialWallet() {
    const wallet = await bitgo.coin('tnear').wallets().add({
        type: 'custodial',
        multisigType: 'tss',
        isCustodial: true,
        label: 'my tss custody wallet',
        enterprise: '60b952e5ec6aaf00076e14bd63fb13f0'
    } as any as AddWalletOptions);

    console.log(JSON.stringify(wallet, undefined, 2));
}
async function createHotWalletSimple() {
    const newWallet = await bitgo.coin('tsol').wallets().generateWallet({
        label: 'my tss hot Wallet',
        passphrase: 'VerySecurePassword1234',
        multisigType: 'tss',
        passcodeEncryptionCode: 'random string',
    });
    console.log(JSON.stringify(newWallet, undefined, 2));
}

async function createHotMultiSigWalletSimple() {
    const newWallet = await bitgo.coin('tbtc').wallets().generateWallet({
        label: 'nike poc - hot multisig wallet',
        passphrase: 'VerySecurePassword1234',
    });
    console.log(JSON.stringify(newWallet, undefined, 2));
}

async function main() {
    await createHotMultiSigWalletSimple();
    // console.log("now making hot wallet simple");
    // await createHotWalletSimple();
}
main();