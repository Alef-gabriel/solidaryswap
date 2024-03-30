import { expect } from "chai";
import { ethers } from "ethers";
import pkg from "hardhat";
const { deployments } = pkg;

describe("SolidarySwap Contract", function () {
  let solidarySwap;
  let deployer;

  beforeEach(async function () {
    const [account] = await ethers.getSigners();
    deployer = account;

    const SolidarySwap = await deployments.get("SolidarySwap");
    solidarySwap = await ethers.getContractAt(
      "SolidarySwap",
      SolidarySwap.address,
      deployer
    );
  });

  describe("Initialization", function () {
    it("Should create ProjectsTable and UsersTable instances", async function () {
      const projectsAddress = await solidarySwap.getProjectsContractId();
      const usersAddress = await solidarySwap.getUsersContractId();

      // Assert that these are valid contract addresses
      expect(projectsAddress).to.not.equal("0x0");
      expect(usersAddress).to.not.equal("0x0");

      // Check if these are instances of ProjectsTable and UsersTable
      // (Assuming those contracts are deployed and accessible)
      const projectsContract = await ethers.getContractAt(
        "ProjectsTable",
        projectsAddress
      );
      const usersContract = await ethers.getContractAt(
        "UsersTable",
        usersAddress
      );

      expect(projectsContract.name).to.equal("ProjectsTable"); // Check for a known function
      expect(usersContract.name).to.equal("UsersTable"); // Check for a known function
    });
  });

  describe("getProjectsContractId", function () {
    it("Should return the address of the ProjectsTable contract", async function () {
      const projectsAddress = await solidarySwap.getProjectsContractId();
      expect(projectsAddress).to.not.equal("0x0"); // Assert valid address
    });
  });

  describe("getUsersContractId", function () {
    it("Should return the address of the UsersTable contract", async function () {
      const usersAddress = await solidarySwap.getUsersContractId();
      expect(usersAddress).to.not.equal("0x0"); // Assert valid address
    });
  });
});
