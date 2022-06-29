import IBEP20 from "contracts/IBEP20.json";

async function createIBEP20Instance(web3, address) {
  return new web3.eth.Contract(IBEP20.abi, address);
}

export { createIBEP20Instance };
