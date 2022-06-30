import IBEP20 from "contracts/IBEP20.json";
import { fetchTokensBySymbol } from "../api/Token";

async function createIBEP20Instance(web3, address) {
  return new web3.eth.Contract(IBEP20.abi, address);
}

async function fetchIBEP20Infos(web3, tokenContract, account) {
  let token = {};

  token.name = await tokenContract.methods.name().call();
  token.symbol = await tokenContract.methods.symbol().call();
  token.balanceOf = web3.utils.fromWei(
    await tokenContract.methods.balanceOf(account).call(),
    "ether"
  );

  let apiTokens = await fetchTokensBySymbol(token.symbol);

  token = { ...token, ...apiTokens[0] };

  token.contract = tokenContract;

  return token;
}

export { createIBEP20Instance, fetchIBEP20Infos };
