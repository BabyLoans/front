import { createBTokenInstance } from "./BTokens";
import Comptroller from "contracts/Comptroller.json";

async function createComptrollerInstance(web3) {
  let networkId = await web3.eth.net.getId();

  let comptrollerData = Comptroller.networks[networkId];

  if (comptrollerData) {
    return new web3.eth.Contract(Comptroller.abi, comptrollerData.address);
  }
}

async function fetchBTokenContracts(web3) {
  let comptroller = await createComptrollerInstance(web3);

  let bTokenAddresses = await comptroller.methods.getAllMarkets().call();

  let bTokens = [];

  for (let bTokenAddress of bTokenAddresses) {
    let bToken = await createBTokenInstance(web3, bTokenAddress);

    bTokens.push(bToken);
  }

  return bTokens;
}

async function getAccountInfo(web3, address) {
  let bTokens = await fetchBTokenContracts(web3);
  let totalSupply = 0;
  let totalBorrow = 0;
  for (let bToken of bTokens) {
    let account = await bToken.methods.getAccountInfo(address).call();
    totalSupply += parseInt(web3.utils.fromWei(account[1], "ether"));
    totalBorrow += parseInt(web3.utils.fromWei(account[2], "ether"));
  }

  return {
    supply: totalSupply,
    borrow: totalBorrow,
  };
}

async function getBTokensAccountInfo(web3, address) {
  let bTokens = await fetchBTokenContracts(web3);
  let tab = {};
  for (let bToken of bTokens) {
    let account = await bToken.methods.getAccountInfo(address).call();
    let symbol = await bToken.methods.symbol().call();
    tab[symbol] = parseInt(web3.utils.fromWei(account[1], "ether"));
  }
  return tab;
}

export {
  createComptrollerInstance,
  fetchBTokenContracts,
  getAccountInfo,
  getBTokensAccountInfo,
};
