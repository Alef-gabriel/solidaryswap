import { Database } from "@tableland/sdk";
import { Wallet, ethers } from "ethers";
import { filecoinTestnet } from "$lib/providers.js";
import {
  SECRET_FILECOIN_TESTNET_PRIVATE_KEY,
  SECRET_PROJECT_TABLE_NAME,
} from "$env/static/private";

function handleFilter(search, filters) {
  const filterArray = filters.split(",");
  const formattedFilters = filterArray
    .map((filter, index) => {
      return index === 0 ? `'${filter}'` : `,'${filter}'`;
    })
    .join("");

  let where = "WHERE";
  if (search) where = "AND";
  const preparedFilters =
    where +
    ` category IN (${formattedFilters})
		  OR sub_category IN (${formattedFilters}) `;
  return preparedFilters;
}

export async function GET({ url }) {
  let originalPageNumber = 1;
  const page = url.searchParams.get("page");
  if (page != undefined) originalPageNumber = page;

  let originalSearch = " ";
  const search = url.searchParams.get("search");
  if (search) {
    originalSearch = ` WHERE title='${search}'`;
  }
  let originalFilters = "";
  const filters = url.searchParams.get("filters");
  if (filters) {
    originalFilters = handleFilter(search, filters);
  }
  const provider = new ethers.providers.JsonRpcProvider(filecoinTestnet);
  const wallet = new Wallet(SECRET_FILECOIN_TESTNET_PRIVATE_KEY, provider);

  const signer = wallet.connect(provider);
  const db = new Database({ signer });

  const { results } = await db
    .prepare(
      `SELECT * FROM ${SECRET_PROJECT_TABLE_NAME}` +
        originalSearch +
        originalFilters +
        `LIMIT 10 OFFSET ${(originalPageNumber - 1) * 10}`
    )
    .all();
  return new Response(JSON.stringify({ res: results }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
