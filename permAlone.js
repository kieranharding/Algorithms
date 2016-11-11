/* Return the number of total permutations of the provided string that don't
  have repeated consecutive letters. Assume that all characters in the provided
  string are each unique.
  For example, aab should return 2 because it has 6 total permutations
  (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't
  have the same letter (in this case a) repeating. */

  function permAlone (str) {
    function toFirst (arr, i) {
      // Move the item at index i to the front of the array, pushing the rest.
      if (i === 0) {
        return arr
      } else {
        return (i === arr.length - 1)
          ? [arr[i]].concat(arr.slice(0, i))
          : [arr[i]].concat(arr.slice(0, i)).concat(arr.slice(i + 1))
      }
    }

    function getPerms (arr) {
      if (arr.length === 1) return arr

      var perms = []

      arr.forEach(function (char, idx, self) {
        var other = toFirst(self, idx).slice(1)
        // console.log(other)
        for (var perm of getPerms(other)) {
          // console.log(perm)
          perms.push([char].concat(perm))
        }
      })
      return perms
    }

    var result = getPerms(str.split(''))
    console.log(result)
    return result
  }

  module.exports = permAlone
