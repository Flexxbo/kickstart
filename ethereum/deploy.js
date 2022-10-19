const dotenv = require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
//const { abi, evm } = require("./compile");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  //put private key in dotenv
  //
  process.env.MNEMONIC,
  "https://goerli.infura.io/v3/031f113d92cf4302a3175611c2ac687f"
);
console.log("hallo mnemonic");
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account ", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address); // 0x327657F87D9792ABbF3C5FD7416f32d5c294bE53
  provider.engine.stop();
};
deploy();

/*
Attempting to deploy from account  0x5792Cb4A1390eE82dCf5C5a61a466277267B80Db
Contract deployed to 0x327657F87D9792ABbF3C5FD7416f32d5c294bE53
*/
