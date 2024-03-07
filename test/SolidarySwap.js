import { expect } from "chai";
import hre from "hardhat";
import { Wallet, getDefaultProvider } from "ethers";
import "dotenv/config"

describe("ProjectsTable", function () {
  it("teste the projectTable_id", async function () {
	const provider = getDefaultProvider(process.env.PROVIDER_URL);
	const wallet = new Wallet(process.env.WALLET_PRIVATY_KEY, provider);
	const contractFactory = await hre.ethers.getContractFactory(
		"ProjectsTable",
		wallet
	  );
	const contract = await contractFactory.deploy();
	contract.connect(wallet);
	const pr = await contract.getProjectsContractId();
	console.log(pr)
    expect(pr).to.be.gt(0);
  });
});
