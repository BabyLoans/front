import TokenLending from "contracts/TokenLending.json";

async function createTokenLendingInstance(web3) {
  let networkId = await web3.eth.net.getId();

  let tokenLendingData = TokenLending.networks[networkId];

  if (tokenLendingData) {
    return new web3.eth.Contract(TokenLending.abi, tokenLendingData.address);
  }
}

async function fetchTokens(web3) {
  let tokenLending = await createTokenLendingInstance(web3);

  return tokenLending.methods.allMarkets().call();
}

export { createTokenLendingInstance, fetchTokens };
