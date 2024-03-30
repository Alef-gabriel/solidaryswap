import { expect } from "chai";
import { ethers } from "ethers";
import pkg from "hardhat";
const { deployments } = pkg;

describe("UsersTable Contract", function () {
  let usersTable;
  let deployer;

  beforeEach(async function () {
    const [account] = await ethers.getSigners();
    deployer = account;

    const UsersTable = await deployments.get("UsersTable");
    usersTable = await ethers.getContractAt(
      "UsersTable",
      UsersTable.address,
      deployer
    );
  });

  describe("Deployment", function () {
    it("Should create a Tableland table", async function () {
      const tableId = await usersTable.getTableId();
      expect(tableId).to.be.a("number");
    });
  });

  describe("insertIntoTable", function () {
    it("Should insert a new user entry", async function () {
      const name = "Alice";
      const email = "alice@example.com";
      const query = "name, email";
      const values = `'${name}', '${email}'`;

      const tx = await usersTable.insertIntoTable(query, values);
      await tx.wait();

      // Check if insertion was successful (might need a specific getter)
      // ...
    });

    it("Should revert if invalid query is provided", async function () {
      const invalidQuery = "invalid_column, email";
      const values = "'Bob', 'bob@example.com'";

      await expect(
        usersTable.insertIntoTable(invalidQuery, values)
      ).to.be.revertedWith("Tableland Error");
    });
  });
});
