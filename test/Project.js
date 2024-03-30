import { expect } from "chai";
import { ethers } from "ethers";
import pkg from "hardhat";
const { deployments } = pkg;

describe("Project Contract", function () {
  let project;
  let deployer;
  let buyer1;
  let buyer2;

  beforeEach(async function () {
    const [account1, account2, account3] = await ethers.getSigners();
    deployer = account1;
    buyer1 = account2;
    buyer2 = account3;

    const Project = await deployments.get("Project");
    project = await ethers.getContractAt("Project", Project.address, deployer);
  });

  describe("Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      const name = await project.name();
      const symbol = await project.symbol();
      expect(name).to.equal("Gold");
      expect(symbol).to.equal("GLD");
    });
  });

  describe("buy", function () {
    it("Should mint tokens and add buyer to backers list (if not already present)", async () => {
      const initialBalance = await project.balanceOf(buyer1.address);
      const buyTx = await buyer1.sendTransaction({
        to: project.address,
        value: ethers.utils.parseEther("1"),
      });
      await buyTx.wait();

      const buyerBalance = await project.balanceOf(buyer1.address);
      const backersCount = await project.getAddressCount();

      expect(buyerBalance).to.be.gt(initialBalance);
      expect(backersCount).to.equal(1);
    });

    it("Should revert if no ETH is sent", async function () {
      await expect(project.buy()).to.be.revertedWith(
        "Send ETH to buy some tokens"
      );
    });
  });

  describe("getAddressCount", function () {
    it("Should return the number of backers", async function () {
      await project.buy({ value: ethers.utils.parseEther("1") });
      await buyer2.sendTransaction({
        to: project.address,
        value: ethers.utils.parseEther("2"),
      });

      const backersCount = await project.getAddressCount();
      expect(backersCount).to.equal(2);
    });
  });

  describe("getAddressBalance", function () {
    it("Should return the token balance of a backer", async function () {
      const buyTx1 = await buyer1.sendTransaction({
        to: project.address,
        value: ethers.utils.parseEther("1"),
      });
      await buyTx1.wait();

      const buyTx2 = await buyer2.sendTransaction({
        to: project.address,
        value: ethers.utils.parseEther("2"),
      });
      await buyTx2.wait();

      const buyer1Balance = await project.getAddressBalance(0);
      expect(buyer1Balance).to.be.gt(0);

      const buyer2Balance = await project.getAddressBalance(1);
      expect(buyer2Balance).to.be.gt(buyer1Balance);
    });

    it("Should revert if invalid index is provided", async function () {
      await expect(project.getAddressBalance(10)).to.be.revertedWith(
        "IndexOutOfBounds"
      );
    });
  });

  describe("deposit", function () {
    it("Should deposit ETH to the contract", async function () {
      const initialBalance = await project.provider.getBalance(project.address);
      const depositTx = await deployer.sendTransaction({
        to: project.address,
        value: ethers.utils.parseEther("3"),
      });
      await depositTx.wait();

      const newBalance = await project.provider.getBalance(project.address);
      expect(newBalance).to.equal(
        initialBalance.add(ethers.utils.parseEther("3"))
      );
    });

    it("Should revert if no ETH is sent", async function () {
      await expect(project.deposit()).to.be.revertedWith("Send ETH to deposit");
    });
  });

  describe("withdraw", function () {
    beforeEach(async function () {
      await deployer.sendTransaction({
        to: project.address,
        value: ethers.utils.parseEther("5"),
      });
    });

    it("Should allow owner to withdraw funds", async function () {
      const initialBalance = await deployer.getBalance();
    });
  });
});
