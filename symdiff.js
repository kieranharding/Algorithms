/* Find the Symmetric difference, which is the set of elements
which is in either of 2 arrays, but not in both.
The tests all require the result to be sorted, though the input
may not be. */

// This solution passes all tests but is boring (just brute force compare)
// and inefficient (runs through all items in arr2, even if they have been
// eliminated by arr1.) These tests took 24 ms
// An improvement opportunity: when the first loop matches in arr2, slice it out.
// Then can concat arr2 to result after the first loop and cut the time in half.
function sym (args) {
  // Find symmetric difference of 2 arrays.
  function symTwo (arr1, arr2) {
    var result = []
    // For each value in arr1, add it to result if it's not in arr2
    // or already added.
    for (var i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) < 0 & result.indexOf(arr1[i]) < 0) {
        result.push(arr1[i])
      }
    }
    for (var j = 0; j < arr2.length; j++) {
      // For each value in arr2, add it to result if it's not in arr1
      // or already added.
      if (arr1.indexOf(arr2[j]) < 0 & result.indexOf(arr2[j]) < 0) {
        result.push(arr2[j])
      }
    }
    return result
  }
  // Apply symTwo on the first 2 arrays until there is only one left.
  return Array.from(arguments).reduce(function (a, b) {
    return symTwo(a, b)
  }).sort()
}

module.exports = sym
