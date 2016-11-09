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

function checkCashRegister (price, cash, cid) {
  var change = cash - price
  var totalcid = cid.map(function (unit) {
    return unit[1]
  }).reduce(function (a, b) {
    return a + b
  })

  // I can do this because cid always has every denomination. Reverse it so that
  // change is always returned in the largest possible denominations.
  var denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100].reverse()
  // I'm calling everything a coin.
  var coins = cid.map(function (unit, idx) {
    return Math.round(unit[1] / denominations[idx])
  }).reverse()

  var result = []

  denominations.forEach(f: fn(elt: ?, i: number, array: Array), context?: ?)
  console.log(coins)

  if (totalcid < change) return 'Insufficient Funds'
  if (totalcid === change) return 'Closed'
  return null
}

module.exports = checkCashRegister
