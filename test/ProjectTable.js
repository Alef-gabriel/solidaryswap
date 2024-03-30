import { expect } from "chai";
import { ethers } from "ethers";
import pkg from "hardhat";
const { deployments } = pkg;

describe("ProjectsTable Contract", function () {
  let projectsTable;
  let deployer;

  beforeEach(async function () {
    const [account] = await ethers.getSigners();
    deployer = account;

    const ProjectsTable = await deployments.get("ProjectsTable");
    projectsTable = await ethers.getContractAt(
      "ProjectsTable",
      ProjectsTable.address,
      deployer
    );
  });

  describe("Deployment", function () {
    it("Should create a Tableland table", async function () {
      const tableId = await projectsTable.getTableId();
      expect(tableId).to.be.a("number");
    });
  });

  describe("insertIntoTable", function () {
    it("Should insert a new project entry", async function () {
      const title = "My Awesome Project";
      const description = "This is a great project!";
      const query = "title, description";
      const values = `'${title}', '${description}'`;

      const tx = await projectsTable.insertIntoTable(query, values);
      await tx.wait();

      // Check if project contract was created
      const projectContractAddress =
        await projectsTable._createProjectContract();
      expect(projectContractAddress).to.not.be.empty;
    });

    it("Should revert if invalid query is provided", async function () {
      const invalidQuery = "invalid_column, description";
      const values = "'My Project', 'This is cool'";

      await expect(
        projectsTable.insertIntoTable(invalidQuery, values)
      ).to.be.revertedWith("Tableland Error");
    });
  });

  describe("updateTable", function () {
    let projectId;

    beforeEach(async function () {
      const title = "My Project";
      const description = "This is cool";
      const query = "title, description";
      const values = `'${title}', '${description}'`;

      const tx = await projectsTable.insertIntoTable(query, values);
      await tx.wait();

      const receipt = await tx.wait();
      const events = receipt.events;
      const insertEvent = events.find((event) => event.event === "Insert");
      projectId = insertEvent.args.id;
    });

    it("Should update an existing project entry", async function () {
      const newTitle = "Updated Project";
      const updateQuery = `title='${newTitle}'`;

      const tx = await projectsTable.updateTable(projectId, updateQuery);
      await tx.wait();

      // Check if update was successful (might need a getter for specific fields)
      // ...
    });

    it("Should revert if invalid id is provided", async function () {
      const invalidId = "12345";
      const updateQuery = "title='Updated Project'";

      await expect(
        projectsTable.updateTable(invalidId, updateQuery)
      ).to.be.revertedWith("Tableland Error");
    });
  });

  describe("deleteFromTable", function () {
    let projectId;

    beforeEach(async function () {
      const title = "My Project";
      const description = "This is cool";
      const query = "title, description";
      const values = `'${title}', '${description}'`;

      const tx = await projectsTable.insertIntoTable(query, values);
      await tx.wait();

      const receipt = await tx.wait();
      const events = receipt.events;
      const insertEvent = events.find((event) => event.event === "Insert");
      projectId = insertEvent.args.id;
    });

    it("Should delete an existing project entry", async function () {
      const tx = await projectsTable.deleteFromTable(projectId);
      await tx.wait();

      // Check if deletion was successful (might need a specific getter)
      // ...
    });

    it("Should revert if invalid id is provided", async function () {
      const invalidId = "12345";

      await expect(projectsTable.deleteFromTable(invalidId)).to.be.revertedWith(
        "Tableland Error"
      );
    });
  });
});
