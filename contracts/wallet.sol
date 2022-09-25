// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Wallet is Ownable {
    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }

    mapping(bytes32 => Token) public tokenMapping;
    bytes32[] public tokenList;
    mapping(address => mapping(bytes32 => uint256)) public balances;

    event LogDeposit(address tokenAddress, uint256 amount);
    event LogWithdrawal(address tokenAddress, uint256 amount);

    modifier tokenExists(bytes32 ticker) {
        require(
            tokenMapping[ticker].tokenAddress != address(0),
            "Ticker does not yet exist"
            );
            _;
    }

    function addToken(bytes32 ticker, address tokenAddress) external onlyOwner {
        tokenMapping[ticker] = Token(ticker, tokenAddress);
        tokenList.push(ticker);
    }

    function deposit(uint256 amount, bytes32 ticker)
        external
        tokenExists(ticker)
    {
        balances[msg.sender][ticker] += amount;
        IERC20(tokenMapping[ticker].tokenAddress).transferFrom(
            msg.sender,
            address(this),
            amount
        );
        emit LogDeposit(msg.sender, amount);
    }

    function withdraw(uint256 withdrawAmount, bytes32 ticker)
        external
        tokenExists(ticker)
    {
        require(
            balances[msg.sender][ticker] >= withdrawAmount,
            "Balance not sufficient"
            );
        balances[msg.sender][ticker] += withdrawAmount;
        IERC20(tokenMapping[ticker].tokenAddress).transfer(
            msg.sender,
            withdrawAmount
        );
        emit LogWithdrawal(msg.sender, withdrawAmount);
    }

    function depositETH() external payable {
        balances[msg.sender]["ETH"] += msg.value;
        emit LogDeposit(msg.sender, msg.value);
    }

    function withdrawETH(uint256 withdrawAmount)
        external
        returns (bool success)
    {
        require(
            balances[msg.sender]["ETH"] >= withdrawAmount,
            "Balance not sufficient"
            );

        balances[msg.sender]["ETH"] += withdrawAmount;
        (success, ) = msg.sender.call{value: withdrawAmount}("");
        emit LogWithdrawal(msg.sender, withdrawAmount);
    }
}
