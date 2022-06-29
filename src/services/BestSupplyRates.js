export async function get() {
  let rates = await fetchRatesFromApi();

  let tokens = rates.map((rate) => rate.token);

  for (let index = 0; index < tokens.length; index++) {
    let rateHistory = await fetchHistory(tokens[index]);

    tokens[index].rates = rateHistory;
  }

  return tokens;
}

async function fetchRatesFromApi() {
  let ratesResponse = await fetch(
    new Request(
      `${process.env.REACT_APP_API_URL}/rates?isCurrent=true&itemsPerPage=4&order[value]=desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
  );

  if (ratesResponse.status !== 200) {
    throw new Error(`Error getting rates: ${ratesResponse.status}`);
  }

  return await ratesResponse.json();
}

async function fetchHistory(token) {
  let historyResponse = await fetch(
    new Request(
      `${process.env.REACT_APP_API_URL}/rates?itemsPerPage=7&token=${token.id}&order[createdAt]=desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
  );

  if (historyResponse.status !== 200) {
    throw new Error(`Error getting rates: ${historyResponse.status}`);
  }

  return await historyResponse.json();
}
