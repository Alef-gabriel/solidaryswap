// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Project is ERC20, Ownable {
    using Math for uint256;

    address payable[] public backers;

    event Bought(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event Withdraw(uint256 amount, address payable recipient);
    event Deposit(uint256 amount);

    constructor(address initialOwner) ERC20("Gold", "GLD") Ownable(initialOwner) {}

	function addBacker(address payable newBacker) internal {
        backers.push(newBacker);
    }

    function buy() public payable returns (uint256 tokenAmount) {
        require(msg.value > 0, "Send ETH to buy some tokens");

        uint256 amountToBuy = msg.value;
        _mint(msg.sender, amountToBuy);
        addBacker(payable(msg.sender));
        emit Bought(msg.sender, msg.value, amountToBuy);

        return amountToBuy;
    }
    function getAddressCount() public view returns (uint256) {
        return backers.length;
    }

	function getAddressBalance(uint256 index) public view returns (uint256) {
        return backers[index].balance;
    }

    function deposit() public payable {
        require(msg.value > 0, "Send ETH to deposit");
        emit Deposit(msg.value);
    }

    function withdraw(address payable recipient, uint256 amount) public payable onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(recipient).transfer(amount);
        emit Withdraw(amount, recipient);
    }

    function distributeFading(uint256 amount, uint256 index) external payable onlyOwner {
        payable(backers[index]).transfer(amount);
    }
}