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

function getKey (obj, val) {
  for (var key in obj) {
    if (obj[key] === val) {
      return key
    }
  }
}

function checkCashRegister (price, cash, cid) {
  var change = cash - price
  var totalcid = cid.map(function (unit) {
    return unit[1]
  }).reduce(function (a, b) {
    return a + b
  })

  // Which denominations are actually available in cid?
  var denominations = {
    'PENNY': 0.01,
    'NICKEL': 0.05,
    'DIME': 0.1,
    'QUARTER': 0.25,
    'ONE': 1,
    'FIVE': 5,
    'TEN': 10,
    'TWENTY': 20,
    'HUNDRED': 100
  }

  // Reverse it so that change is always returned in the largest
  // possible denominations.
  // var all_denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]

  var all_denominations = []
  for (var key in denominations) {
    if (denominations.hasOwnProperty(key)) {
      all_denominations.push(denominations[key])
    }
  }
  var my_denominations = all_denominations.sort().filter(function (den, idx) {
    return (cid[idx][1] !== 0)
  }).reverse()

  // I'm calling everything a coin.
  var coins = cid.map(function (unit, idx) {
    return Math.round(unit[1] / all_denominations[idx])
  }).reverse()

  var result = []

  my_denominations.forEach(function (den, idx) {
    if (change >= den) {
      // Use as many of the given denomination as will fit
      for (var i = coins[idx]; i > 0; i--) {
        if (change >= den * i) {
          result.push([den, den * i])
          change -= den * i
          break
        }
      }
    }
  })

  if (totalcid < change) return 'Insufficient Funds'
  if (totalcid === change) return 'Closed'
  return result.map(function (a) {
    a[0] = getKey(cid, a[0])
  })
}

module.exports = checkCashRegister
