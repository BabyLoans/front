import BToken from "contracts/BToken.json";
import { createIBEP20Instance, fetchIBEP20Infos } from "./IBEP20.js";

const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

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
    .allowance(account, bTokenContract._address)
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

  return bep20.methods.allowance(account, bTokenContract._address).call();
}

async function approveUnderlyingContract(web3, bTokenContract, account) {
  let underlyingContractAddress = await bTokenContract.methods
    .underlying()
    .call();
  let bep20 = await createIBEP20Instance(web3, underlyingContractAddress);

  return new Promise((resolve, reject) => {
    bep20.methods
      // eslint-disable-next-line no-undef
      .approve(bTokenContract._address, BigInt(MAX_UINT256))
      .send({ from: account })
      .on("transactionHash", (e) => {
        console.log(e);
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}

export {
  fetchBTokenInfos,
  createBTokenInstance,
  approveUnderlyingContract,
  totalAllowanceUnderlyingContract,
};
