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

export { createComptrollerInstance, fetchBTokenContracts };
