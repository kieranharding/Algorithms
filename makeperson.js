/* Fill in the object constructor with the following methods below:

getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)
Run the tests to see the expected output for each method.

The methods that take an argument must accept only one argument and it has to be a string.

These methods must be the only available means of interacting with the object. */

var Person = function (firstAndLast) {
  this.getFullName = function () {
    return firstAndLast
  }

  this.getFirstName = function () {
    return firstAndLast.split(' ')[0]
  }

  this.getLastName = function () {
    return firstAndLast.split(' ')[1]
  }

  this.setFullName = function (newFirstAndLast) {
    firstAndLast = newFirstAndLast
  }

  this.setFirstName = function (newFirst) {
    firstAndLast = newFirst + ' ' + firstAndLast.split(' ')[1]
  }

  this.setLastName = function (newLast) {
    firstAndLast = firstAndLast.split(' ')[0] + ' ' + newLast
  }
}

module.exports = Person
// var bob = new Person('Bob Ross')
