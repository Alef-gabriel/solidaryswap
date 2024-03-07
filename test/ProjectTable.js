import { expect } from "chai";
import hre from "hardhat";
import { Wallet, getDefaultProvider } from "ethers";
import { Database } from "@tableland/sdk";

const privateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const provider = getDefaultProvider("http://127.0.0.1:8545");

describe("ProjectsTable", function () {
  it("creates the first table id", async function () {
    const wallet = new Wallet(privateKey, provider);
    const contractFactory = await hre.ethers.getContractFactory(
      "ProjectsTable",
      wallet
    );
    const deployed = await contractFactory.deploy();
    expect(await deployed.getTableId()).to.be.gt(0);
  });

  it("creates the table with the correct name", async function () {
    const wallet = new Wallet(privateKey, provider);
    const contractFactory = await hre.ethers.getContractFactory(
      "ProjectsTable",
      wallet
    );
    const contract = await contractFactory.deploy();
    const id = await contract.getTableId();
    expect(await contract.getTableName()).to.be.revertedWith(
      `table_attributes_${id}`
    );
  });

  it("insert in the table with the correct schema", async function () {
    const wallet = new Wallet(privateKey, provider);
    const contractFactory = await hre.ethers.getContractFactory(
      "ProjectsTable",
      wallet
    );
    const contract = await contractFactory.deploy();
    const query =
      "1,'Avex','Best makerting agency','0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266','Brazil,BA','0xdc64a140aa3e981100a9beca4e685f962f0cf6c9'";
    await contract.insertIntoTable(query);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const validQuery =
      "{id: 1,title: 'Avex',desciption: 'Best makerting agency',data: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',location: 'Brazil,BA',user_tableId: '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9'}";
    const tableName = await contract.getTableName();
    expect(
      await db.prepare(`SELECT * FROM ${tableName}`).all()
    ).to.be.revertedWith(validQuery);
  });

  it("insert in the table delete the data", async function () {
    const wallet = new Wallet(privateKey, provider);
    const contractFactory = await hre.ethers.getContractFactory(
      "ProjectsTable",
      wallet
    );
    const contract = await contractFactory.deploy();
    const query =
      "1,'Avex','Best makerting agency','0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266','Brazil,BA','0xdc64a140aa3e981100a9beca4e685f962f0cf6c9'";
    await contract.insertIntoTable(query);

    const signer = wallet.connect(provider);
    const db = new Database({ signer });

    const validQuery =
      "{id: 1,title: 'Avex',desciption: 'Best makerting agency',data: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',location: 'Brazil,BA',user_tableId: '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9'}";
    const tableName = await contract.getTableName();
    expect(
      await db.prepare(`SELECT * FROM ${tableName}`).all()
    ).to.be.revertedWith(validQuery);

	await contract.deleteFromTable(1);
	expect(
		await db.prepare(`SELECT * FROM ${tableName}`).all()
	  ).to.be.revertedWith("[]");
  });
});
