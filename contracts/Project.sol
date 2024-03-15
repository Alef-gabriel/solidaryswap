pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Project is ERC20, Ownable {
    using Math for uint256;

    address[] public backers;

    event Bought(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event Withdraw(uint256 amount);
    event Deposit(uint256 amount);

    constructor(address initialOwner) ERC20("Gold", "GLD") Ownable(initialOwner) {}

    function buy() public payable returns (uint256 tokenAmount) {
        require(msg.value > 0, "Send ETH to buy some tokens");

        uint256 amountToBuy = msg.value;
        // Perform token minting and transfer
        _mint(msg.sender, amountToBuy);
        backers.push(msg.sender);
        emit Bought(msg.sender, msg.value, amountToBuy);

        return amountToBuy;
    }
    function getAddressCount() public view returns (uint256) {
        return backers.length;
    }

    function deposit() public payable {
        require(msg.value > 0, "Send ETH to deposit");
        emit Deposit(msg.value);
    }

    function withdraw(uint256 amount, address charPersson) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(charPersson).transfer(amount);
        emit Withdraw(amount);
    }

    function distributeFading(uint256 amount, uint256 index) external onlyOwner {
        payable(backers[index]).transfer(amount);
    }
}