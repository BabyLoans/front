import BToken from "contracts/BToken.json";
import { createIBEP20Instance, fetchIBEP20Infos } from "./IBEP20.js";

async function createBTokenInstance(web3, address) {
  return new web3.eth.Contract(BToken.abi, address);
}

async function fetchBTokenInfos(web3, bTokenContract) {
  let bToken = {};

  bToken.name = await bTokenContract.methods.name().call();
  bToken.symbol = await bTokenContract.methods.symbol().call();
  bToken.underlying = await bTokenContract.methods.underlying().call();
  bToken.rate = 0;
  // bToken.rates to store Supply and borrow rates

  let bep20 = await createIBEP20Instance(web3, bToken.underlying);
  bToken.underlyingToken = await fetchIBEP20Infos(web3, bep20);

  let account = (await web3.eth.getAccounts())[0];

  bToken.allowance = await bep20.methods
    .allowance(bTokenContract._address, account)
    .call();

  bToken.contract = bTokenContract;

  return bToken;
}

async function totalAllowanceUnderlyingContract(web3, bTokenContract) {
  let underlyingContractAddress = await bTokenContract.methods
    .underlying()
    .call();

  let bep20 = await createIBEP20Instance(web3, underlyingContractAddress);

  let account = (await web3.eth.getAccounts())[0];

  return bep20.methods.allowance(bTokenContract._address, account).call();
}

async function approveUnderlyingContract(web3, bTokenContract, account) {
  let underlyingContractAddress = await bTokenContract.methods
    .underlying()
    .call();
  let bep20 = await createIBEP20Instance(web3, underlyingContractAddress);

  await bep20.methods
    .approve(bTokenContract.address, 2 ** 256 - 1)
    .send({ from: account });
}

export {
  fetchBTokenInfos,
  createBTokenInstance,
  approveUnderlyingContract,
  totalAllowanceUnderlyingContract,
};
