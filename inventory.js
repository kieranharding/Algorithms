/* Compare and update the inventory stored in a 2D array against a second 2D
  array of a fresh delivery. Update the current existing inventory item
  quantities (in arr1). If an item cannot be found, add the new item and
  quantity into the inventory array. The returned inventory array should be
  in alphabetical order by item. */

function itemExists (arr, name) {
  return (arr.filter(function (a) {
    return (arr[1] === name)
  }).length > 0)
}

function updateInventory (arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    arr2.forEach(function (item) {
      arr1 = arr1.map()
    })
  return arr1
}

// Example inventory lists
var curInv = [
    [21, 'Bowling Ball'],
    [2, 'Dirty Sock'],
    [1, 'Hair Pin'],
    [5, 'Microphone']
];

var newInv = [
    [2, 'Hair Pin'],
    [3, 'Half-Eaten Apple'],
    [67, 'Bowling Ball'],
    [7, 'Toothpaste']
]

module.exports = updateInventory
