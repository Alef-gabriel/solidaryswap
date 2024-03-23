export async function getEthPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();

    if (response.ok) {
      return data.ethereum.usd;
    } else {
      console.error(
        "Error fetching Ethereum price:",
        data.error || response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching Ethereum price:", error);
    return null;
  }
}
