async function fetchTokensBySymbol(symbol) {
  symbol = symbol.toUpperCase();

  let response = await fetch(
    new Request(
      `${process.env.REACT_APP_API_URL}/tokens?symbol=${symbol}&itemsPerPage=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
  );

  return response.json();
}

export { fetchTokensBySymbol };
