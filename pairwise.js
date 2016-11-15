/* Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.

If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of indices. Once an element has been used, it cannot be reused to pair with another.

For example pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.

Index	0	1	2	3	4
Value	7	9	11	13	15
Below we'll take their corresponding indices and add them.

7 + 13 = 20 → Indices 0 + 3 = 3
9 + 11 = 20 → Indices 1 + 2 = 3
3 + 3 = 6 → Return 6 */

function pairwise (arr, arg) {
  function sumArray (a, b) {
    return a + b
  }

  function concatDistinct (arr, a, b) {
    // Concat 2 items to the array, only if neither of them are already there.
    if (arr.indexOf(a) < 0 && arr.indexOf(b) < 0) {
      return arr.concat([a, b])
    } else {
      return arr
    }
  }

  function findPairs (arr, n, idxs) {
    idxs = idxs || []
    if (arr.length < 2) return idxs
    n = n || 0
    var i
    // Second half of this is redundant with concatDistinct, but saves loops
    if (arr[0] < arg && idxs.indexOf(n) < 0) {
      for (i = 1; i < arr.length; i++) {
        if (arg - arr[0] === arr[i]) {
          idxs = concatDistinct(idxs, n, n + i)
        }
      }
    }
    return findPairs(arr.slice(1), n + 1, idxs)
  }

  return findPairs(arr).reduce(sumArray, 0)
}

module.exports = pairwise
