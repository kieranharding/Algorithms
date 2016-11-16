/* Find the Symmetric difference, which is the set of elements
which is in either of 2 arrays, but not in both.
The tests all require the result to be sorted, though the input
may not be. */

// This solution passes all tests but is boring (just brute force compare)
// and inefficient (runs through all items in arr2, even if they have been
// eliminated by arr1.) These tests took 24 ms.
// An improvement opportunity: when the first loop matches in arr2, slice it out.
// Then can concat arr2 to result after the first loop and cut the time in half.
function sym (args) {}

module.exports = sym
