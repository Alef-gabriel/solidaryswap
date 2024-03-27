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

export async function getBTCPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    const data = await response.json();

    if (response.ok) {
      return data.bitcoin.usd; // Access the BTC price from the response
    } else {
      console.error(
        "Error fetching Bitcoin price:",
        data.error || response.statusText
      );
      return null;
    }
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    return null;
  }
}

export function formatUSDPrice(number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(number);
}

export async function fetchMidia(link) {
  if (link) {
    const response = await fetch(`https://${link}.ipfs.w3s.link/`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
  return null;
}
