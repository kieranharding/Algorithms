/* Compare and update the inventory stored in a 2D array against a second 2D
  array of a fresh delivery. Update the current existing inventory item
  quantities (in arr1). If an item cannot be found, add the new item and
  quantity into the inventory array. The returned inventory array should be
  in alphabetical order by item. */

function itemExists (arr, name) {
  return (arr.filter(function (a) {
    return (a[1] === name)
  }).length > 0)
}

function updateInventory (arr1, arr2) {
  // All inventory must be accounted for or you're fired!
  arr2.forEach(function (item) {
    if (itemExists(arr1, item[1])) {
      arr1 = arr1.map(function (a) {
        if (a[1] === item[1]) {
          a[0] += item[0]
        }
        return a
      })
    } else {
      arr1.push(item)
    }
  })
  return arr1.sort(function (a, b) {
    return a[1] > b[1] ? 1 : -1
  })
}

module.exports = {
  updateInventory: updateInventory,
  itemExists: itemExists
}
