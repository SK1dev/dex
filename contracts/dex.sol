// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./wallet.sol";

contract Dex is Wallet {
    enum Side {
        BUY,
        SELL
    }

    event OrderFilled(uint256 filledAmount, uint256 totalCost);
    event PartialFill(uint256 filledAmount, uint256 cost);

    struct Order {
        uint256 id;
        address trader;
        Side side;
        bytes32 ticker;
        uint256 amount;
        uint256 price;
    }

    uint256 public nextOrderID;

    mapping(bytes32 => mapping(uint256 => Order[])) orderBook;

    function getOrderBook(bytes32 ticker, Side side)
        public
        view
        returns (Order[] memory)
    {
        return orderBook[ticker][uint256(side)];
    }

    function _createLimitOrder(
        Side side,
        bytes32 ticker,
        uint256 amount,
        uint256 price
    ) internal returns (uint256) {
        Order[] storage orders = orderBook[ticker][uint256(side)];
        uint256 orderID = nextOrderID;
        Order memory newOrder = Order(
            orderID,
            msg.sender,
            side,
            ticker,
            amount,
            price
        );
        nextOrderID++;
        bool hasOrderBeenInserted = false;

        // First order needs to have the highest price
        // We will insert the order in the proper place
        for (uint256 i = 0; i < orders.length; i++) {
            if (price > orders[i].price) {
                orders.push(orders[orders.length - 1]);
                for (uint256 j = orders.length - 2; j > i; j--) {
                    orders[j] = orders[j - 1];
                }
                orders[i] = newOrder;
                hasOrderBeenInserted = true;
                break;
            }
        }
        if (!hasOrderBeenInserted) {
            orders.push(newOrder);
        }
        return orderID;
    }

    function createLimitOrder(
        Side side,
        bytes32 ticker,
        uint256 amount,
        uint256 price
    ) external tokenExists(ticker) returns (uint256) {
        if (side == Side.BUY) {
            require(
                balances[msg.sender]["ETH"] >= amount * price,
                "ETH Balance not sufficient"
            );
            return _createLimitOrder(side, ticker, amount, price);
        }
    }

    function _createMarketOrderBuy(bytes32 ticker, uint256 _amount)
        internal
        returns (uint256, uint256)
    {
        Order[] storage orders = orderBook[ticker][uint256(Side.SELL)];
        uint256 totalETHSpent = 0;
        uint256 amount = _amount;

        for (uint256 _i = orders.length; _i > 0; _i--) {
            Order storage order = orders[_i - 1];
            uint256 usedAmount;

            if (order.amount > amount) {
                usedAmount = amount;
            } else {
                usedAmount = order.amount;
            }

            uint256 totalPrice = usedAmount * order.price;
            totalETHSpent = totalETHSpent += totalPrice;

            // Check that the user still has the necessary amount for this partial fill
            require(
                balances[msg.sender]["ETH"] >= totalPrice,
                "ETH balance not sufficient"
            );
            require(
                balances[order.trader][ticker] >= usedAmount,
                "Token balance not sufficient"
            );
            // Update the ETH amount of buyer and seller
            balances[msg.sender]["ETH"] -= totalPrice;
            balances[order.trader]["ETH"] += totalPrice;
            // Update the token amount of buyer and seller
            balances[msg.sender][ticker] += usedAmount;
            balances[order.trader][ticker] -= usedAmount;
            // update the orderbook
            if (order.amount > amount) {
                order.amount -= amount;
                amount = 0;
                break;
            } else {
                amount -= order.amount;
                orders.pop();
            }
        }
        emit OrderFilled(_amount - amount, totalETHSpent);
        return (totalETHSpent, _amount - amount);
    }

    function _createMarketOrderSell(bytes32 ticker, uint256 _amount)
        internal
        returns (uint256, uint256)
    {
        Order[] storage orders = orderBook[ticker][uint256(Side.BUY)];
        uint256 totalETHSpent = 0;
        uint256 amount = _amount;

        for (uint256 _i = orders.length; _i > 0; _i--) {
            Order storage order = orders[_i - 1];
            uint256 usedAmount;
            if (order.amount > amount) {
                usedAmount = amount;
            } else {
                usedAmount = amount;
            }
            uint256 totalPrice = usedAmount * order.price;
            totalETHSpent += totalPrice;
            // Check that the user still has the necessary amount for this partial fill
            require(
                balances[order.trader]["ETH"] >= totalPrice,
                "ETH balance not sufficient"
            );
            require(
                balances[msg.sender][ticker] >= usedAmount,
                "Token balance not sufficient"
            );
            // Update the ETH amount of buyer and seller
            balances[order.trader]["ETH"] -= totalPrice;
            balances[msg.sender]["ETH"] += totalPrice;
            // Update the token amount of buyer and seller
            balances[order.trader][ticker] += usedAmount;
            balances[msg.sender][ticker] -= usedAmount;
            // Update the orderbook
            if (order.amount > amount) {
                order.amount -= amount;
                amount = 0;
                break;
            } else {
                amount -= order.amount;
                orders.pop();
            }
        }
        emit OrderFilled(_amount - amount, totalETHSpent);
        return (totalETHSpent, _amount - amount);
    }

    function createMarketOrder(
        Side side,
        bytes32 ticker,
        uint256 amount
    ) external tokenExists(ticker) returns (uint256, uint256) {
        if (side == Side.BUY) {
            return _createMarketOrderBuy(ticker, amount);
        } else {
            return _createMarketOrderSell(ticker, amount);
        }
    }
}
