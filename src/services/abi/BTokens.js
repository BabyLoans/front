import BToken from "contracts/BToken.json";
import { createIBEP20Instance, fetchIBEP20Infos } from "./IBEP20.js";

const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";

async function createBTokenInstance(web3, address) {
  return new web3.eth.Contract(BToken.abi, address);
}

async function fetchBTokenInfos(web3, bTokenContract, account) {
  let bToken = {};

  bToken.name = await bTokenContract.methods.name().call();
  bToken.symbol = await bTokenContract.methods.symbol().call();
  bToken.underlying = await bTokenContract.methods.underlying().call();

  let accountInfo = await bTokenContract.methods.getAccountInfo(account).call();
  bToken.balanceOf = web3.utils.fromWei(accountInfo[1], "ether");
  bToken.balanceOfBorrow = web3.utils.fromWei(accountInfo[2], "ether");

  bToken.rate = 0;
  // bToken.rates to store Supply and borrow rates

  let bep20 = await createIBEP20Instance(web3, bToken.underlying);
  bToken.underlyingToken = await fetchIBEP20Infos(web3, bep20, account);

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
      .on("transactionHash", () => {
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}

async function mint(web3, bTokenContract, amount, account) {
  let wei = web3.utils.toWei(amount.toString(), "ether");
  return new Promise((resolve, reject) => {
    bTokenContract.methods
      .mint(wei)
      .send({ from: account })
      .on("transactionHash", () => {
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}

async function redeem(web3, bTokenContract, amount, account) {
  let wei = web3.utils.toWei(amount.toString(), "ether");
  return new Promise((resolve, reject) => {
    bTokenContract.methods
      .redeem(wei)
      .send({ from: account })
      .on("transactionHash", () => {
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}

async function borrow(web3, bTokenContract, amount, account) {
  let wei = web3.utils.toWei(amount.toString(), "ether");
  console.log(wei);
  return new Promise((resolve, reject) => {
    bTokenContract.methods
      .borrow(wei)
      .send({ from: account })
      .on("transactionHash", () => {
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}

async function repayBorrow(web3, bTokenContract, amount, account) {
  let wei = web3.utils.toWei(amount.toString(), "ether");
  return new Promise((resolve, reject) => {
    bTokenContract.methods
      .repayBorrow(wei)
      .send({ from: account })
      .on("transactionHash", () => {
        resolve(true);
      })
      .catch(() => {
        reject();
      });
  });
}

export {
  mint,
  redeem,
  borrow,
  repayBorrow,
  fetchBTokenInfos,
  createBTokenInstance,
  approveUnderlyingContract,
  totalAllowanceUnderlyingContract,
};
