/* Design a cash register drawer function checkCashRegister()
that accepts purchase price as the first argument (price),
payment as the second argument (cash), and cash-in-drawer (cid) as the
third argument.

cid is a 2D array listing available currency.
Example:
[["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00],
["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
It always has all 9 denominations, even when they are 0.

Return the string "Insufficient Funds" if cash-in-drawer is less
than the change due or if exact change cannot be made with the cash.
Return the string "Closed" if cash-in-drawer
is equal to the change due.*/

function checkCashRegister (price, cash, cid) {}

module.exports = checkCashRegister
