export async function get() {
  let promises = [];

  promises.push({ name: "Total Investment", promise: getTotalInvestment() });
  promises.push({ name: "Weekly Return", promise: getWeeklyReturn() });
  promises.push({ name: "Monthly Return", promise: getMonthlyReturn() });
  promises.push({ name: "Total Return", promise: getTotalReturn() });

  let datas = await Promise.all(promises.map((promise) => promise.promise));

  let response = [];

  for (let index = 0; index < datas.length; index++) {
    response.push({
      name: promises[index].name,
      value: datas[index],
    });
  }

  return response;
}

async function getTotalInvestment() {
  // Here just make a add between all interactions on the smart contract with type of 'lend'
  // Using web3 services (no need centralized api)
  return await Promise.resolve(500);
}

async function getWeeklyReturn() {
  // Here fetch all interactions on the smart contract with type of 'lend' and 'withdraw'
  return await Promise.resolve(3.58);
}

async function getMonthlyReturn() {
  return await Promise.resolve(14.32);
}

async function getTotalReturn() {
  // Here just make a sub between all interactions on the smart contract with type of 'lend' and 'withdraw'
  // Using web3 services (no need centralized api)
  return await Promise.resolve(56.14);
}
