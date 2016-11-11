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

  if (totalcid === change) return 'Closed'

  // To convert values to numbers
  var hashValues = {
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

  // Ordered list of denomination keys that aren't empty, largest to smallest value
  var vals = cid.filter(function (val) {
    return (val[1] > 0)
  }).map(function (val) {
    return val[0]
  }).reverse()

  var result = []
  vals.forEach(function (name) {
    var val = hashValues[name]
    if (val <= change) {
      // How many coins/bills in the drawer for this denomination?
      var count = Math.round(cid.filter(function (el) {
        return (el[0] === name)
      })[0][1])
      count /= val

      // How many coins/bills in the drawer for this denomination?
      for (var i = Math.round(count); i > 0; i--) {
        if (val * i <= change) {
          result.push([name, val * i])
          // This little mostrosity to round to 2 decimal places
          change = Math.round((change - val * i) * 100) / 100
          break
        }
      }
    }
  })

  if (change) {
    return 'Insufficient Funds'
  } else {
    return result
  }
}

module.exports = checkCashRegister
