export async function get() {
  let tokensResponse = await fetch(
    new Request(`${process.env.REACT_APP_API_URL}/tokens`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
  );

  if (tokensResponse.status !== 200) {
    throw new Error(`Error getting tokens: ${tokensResponse.status}`);
  }

  let tokens = await tokensResponse.json();

  // HERE : Remove to replace with real balance using web3.js
  for (let index = 0; index < tokens.length; index++) {
    tokens[index].amount = 125;
  }

  return tokens;
}
