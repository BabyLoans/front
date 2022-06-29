import BToken from "contracts/BToken.json";
import { createIBEP20Instance } from "./IBEP20.js";

async function createBTokenInstance(web3, address) {
  return new web3.eth.Contract(BToken.abi, address);
}

async function totalAllowanceUnderlyingContract(web3, token) {
  let bToken = await createBTokenInstance(web3, token.address);

  let underlyingContractAddress = bToken.methods.underlyingContract().call();
  let bep20 = await createIBEP20Instance(web3, underlyingContractAddress);

  let account = await web3.eth.getAccounts()[0];

  return bep20.methods.allowance(token.address, account).call();
}

async function approveUnderlyingContract(web3, token, account) {
  let bToken = await createBTokenInstance(web3, token.address);

  let underlyingContractAddress = bToken.methods.underlyingContract().call();
  let bep20 = await createIBEP20Instance(web3, underlyingContractAddress);

  await bep20.methods
    .approve(token.address, 2 ** 256 - 1)
    .send({ from: account });
}

export {
  createBTokenInstance,
  approveUnderlyingContract,
  totalAllowanceUnderlyingContract,
};
