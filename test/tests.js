var should = require('chai').should()
var validate = require('../telephoneCheck')
var diff = require('../symdiff')
var change = require('../exactchange')
var inv = require('../inventory')

describe('Telephone Number Check', function () {
  it('should return a boolean when passed "555-555-5555"', function () {
    validate('555-555-5555').should.be.a('boolean')
  })
  it('should return true when passed "555-555-5555"', function () {
    validate('1 555-555-5555').should.equal(true)
  })
  it('should return true when passed "1 (555) 555-5555"', function () {
    validate('1 (555) 555-5555').should.equal(true)
  })
  it('should return true when passed "5555555555"', function () {
    validate('5555555555').should.equal(true)
  })
  it('should return true when passed "555-555-5555"', function () {
    validate('555-555-5555').should.equal(true)
  })
  it('should return true when passed "(555)555-5555"', function () {
    validate('(555)555-5555').should.equal(true)
  })
  it('should return false when passed 555-5555', function () {
    validate('555-5555').should.equal(false)
  })
  it('should return false when passed 5555555', function () {
    validate('5555555').should.equal(false)
  })
  it('should return false when passed 1 555)555-5555', function () {
    validate('1 555)555-5555').should.equal(false)
  })
  it('should return true when passed 1 555 555 5555', function () {
    validate('1 555 555 5555').should.equal(true)
  })
  it('should return true when passed 1 456 789 4444', function () {
    validate('1 456 789 4444').should.equal(true)
  })
  it('should return false when passed 123**&!!asdf#', function () {
    validate('123**&!!asdf#').should.equal(false)
  })
  it('should return false when passed 55555555', function () {
    validate('55555555').should.equal(false)
  })
  it('should return false when passed 55555555', function () {
    validate('55555555').should.equal(false)
  })
  it('should return false when passed (6505552368)', function () {
    validate('(6505552368)').should.equal(false)
  })
  it('should return false when passed 2 (757) 622-7382', function () {
    validate('2 (757) 622-7382').should.equal(false)
  })
  it('should return false when passed 0 (757) 622-7382', function () {
    validate('0 (757) 622-7382').should.equal(false)
  })
  it('should return false when passed -1 (757) 622-7382', function () {
    validate('-1 (757) 622-7382').should.equal(false)
  })
  it('should return false when passed 2 757 622-7382', function () {
    validate('2 757 622-7382').should.equal(false)
  })
  it('should return false when passed 10 (757) 622-7382', function () {
    validate('10 (757) 622-7382').should.equal(false)
  })
  it('should return false when passed 27576227382', function () {
    validate('27576227382').should.equal(false)
  })
  it('should return false when passed (275)76227382', function () {
    validate('(275)76227382').should.equal(false)
  })
  it('should return false when passed 2(757)6227382', function () {
    validate('2(757)6227382').should.equal(false)
  })
  it('should return false when passed 2(757)622-7382', function () {
    validate('2(757)622-7382').should.equal(false)
  })
  it('should return false when passed 555)-555-5555', function () {
    validate('555)-555-5555').should.equal(false)
  })
  it('should return false when passed (555-555-5555', function () {
    validate('(555-555-5555').should.equal(false)
  })
  it('should return false when passed (555)5(55?)-5555', function () {
    validate('(555)5(55?)-5555').should.equal(false)
  })
})

describe('Symmetric Difference', function () {
  it('should return [3, 4, 5] given ([1, 2, 3], [5, 2, 1, 4])', function () {
    diff([1, 2, 3], [5, 2, 1, 4]).should.eql([3, 4, 5])
  })
  it('should contain 3 elements given ([1, 2, 3], [5, 2, 1, 4])', function () {
    diff([1, 2, 3], [5, 2, 1, 4]).should.have.length(3)
  })
  it('should return [1, 4, 5] given ([1, 2, 5], [2, 3, 5], [3, 4, 5])', function () {
    diff([1, 2, 5], [2, 3, 5], [3, 4, 5]).should.eql([1, 4, 5])
  })
  it('should contain 3 elements given ([1, 2, 5], [2, 3, 5], [3, 4, 5])', function () {
    diff([1, 2, 5], [2, 3, 5], [3, 4, 5]).should.have.length(3)
  })
  it('should return [1, 4, 5] given ([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])', function () {
    diff([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]).should.eql([1, 4, 5])
  })
  it('should contain 3 elements given ([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])', function () {
    diff([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]).should.have.length(3)
  })
  it('should return [2,3,4,6,7] given ([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])', function () {
    diff([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]).should.eql([2, 3, 4, 6, 7])
  })
  it('should contain 5 elements given ([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])', function () {
    diff([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]).should.have.length(5)
  })
  it('should return [1, 2, 4, 5, 6, 7, 8, 9] given ([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])', function () {
    diff([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]).should.eql([1, 2, 4, 5, 6, 7, 8, 9])
  })
  it('should contain 8 elements given ([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1])', function () {
    diff([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]).should.have.length(8)
  })
})

describe('Exact Change', function () {
  it('should return an array', function () {
    change(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]).should.be.an('array')
  })
  it('should return a string', function () {
    change(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]).should.be.a('string')
  })
  it('should return a string', function () {
    change(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]).should.be.a('string')
  })
  it('should return [["QUARTER", 0.50]]', function () {
    change(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]).should.eql([["QUARTER", 0.50]])
  })
  it('should return [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]]', function () {
    change(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]).should.eql([["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]])
  })
  it('should return "Insufficient Funds"', function () {
    change(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]).should.equal("Insufficient Funds")
  })
  it('should return "Insufficient Funds"', function () {
    change(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]).should.equal("Insufficient Funds")
  })
  it('should return "Closed"', function () {
    change(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]).should.equal("Closed")
  })
})

describe('Update Inventory', function () {
  context('Main', function () {
    it('should return an array', function () {
      inv(
        [
          [21, "Bowling Ball"],
          [2, "Dirty Sock"],
          [1, "Hair Pin"],
          [5, "Microphone"]
        ],
        [
          [2, "Hair Pin"],
          [3, "Half-Eaten Apple"],
          [67, "Bowling Ball"],
          [7, "Toothpaste"]
        ]).should.be.an('array')
    })
    it('should return an array with length 6', function () {
      inv(
        [
          [21, "Bowling Ball"],
          [2, "Dirty Sock"],
          [1, "Hair Pin"],
          [5, "Microphone"]
        ],
        [
          [2, "Hair Pin"],
          [3, "Half-Eaten Apple"],
          [67, "Bowling Ball"],
          [7, "Toothpaste"]
        ]).should.have.length(6)
    })
    // updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]].
    it('should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]]', function () {
      inv([
        [21, "Bowling Ball"],
        [2, "Dirty Sock"],
        [1, "Hair Pin"],
        [5, "Microphone"]
      ],[
        [2, "Hair Pin"],
        [3, "Half-Eaten Apple"],
        [67, "Bowling Ball"],
        [7, "Toothpaste"]
      ]).should.eql([[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]])
    })
    // updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], []) should return [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]].
    it('should return [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]]', function () {
      inv(
        [
          [21, "Bowling Ball"],
          [2, "Dirty Sock"],
          [1, "Hair Pin"],
          [5, "Microphone"]
        ], []).should.eql([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]])
    })
    // updateInventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) should return [[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]].
    it('should return [[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]]', function () {
      inv(
        [],
        [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]
      ).should.eql([[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]])
    })
    // updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]) should return [[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]].
    it('should return [[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]])', function () {
      inv(
        [[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]],
        [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]
      ).should.eql([[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]])
    })
  })
})
