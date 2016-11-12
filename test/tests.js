/* eslint-disable */
var should = require('chai').should()
var validate = require('../telephoneCheck')
var diff = require('../symdiff')
var change = require('../exactchange')
var inv = require('../inventory.js').updateInventory
var arrSearch = require('../inventory.js').itemExists
var permAlone = require('../permAlone')
var makeFriendlyDates = require('../friendlydates')

describe('Validate US Telephone Numbers', function () {
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

describe('Inventory Update', function () {
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
  context.skip('Array Search', function () {
    it('should return true if it finds the string', function () {
      arrSearch([[21, 'Bowling Ball'], [2, 'Dirty Sock']], 'Bowling Ball').should.equal(true)
    })
    it('should return true if it finds the string', function () {
      arrSearch([[21, 'Bowling Ball'], [2, 'Dirty Sock']], 'Dirty Sock').should.equal(true)
    })
    it('should return false if the string is not there', function () {
      arrSearch([[21, 'Bowling Ball'], [2, 'Cat Paws']], 'Chair Canadiens').should.equal(false)
    })
    it('should return false if the string is not there', function () {
      arrSearch([[21, 'Bowling Ball'], [2, 'Cat Paws']], 21).should.equal(false)
    })
  })
})

describe('No Repeats Please', function () {
  // permAlone("aab") should return a number.
  it('should return a number', function () {
    permAlone('aab').should.be.a('number')
  })
  // permAlone("aab") should return 2.
  it('should return 2', function () {
    permAlone('aab').should.equal(2)
  })
  // permAlone("aaa") should return 0.
  it('should return 0', function () {
    permAlone('aaa').should.equal(0)
  })
  // permAlone("aabb") should return 8.
  it('should return 8', function () {
    permAlone('aabb').should.equal(8)
  })
  // permAlone("abcdefa") should return 3600.
  it('should return 3600', function () {
    permAlone('abcdefa').should.equal(3600)
  })
  // permAlone("abfdefa") should return 2640.
  it('should return 2640', function () {
    permAlone('abfdefa').should.equal(2640)
  })
  // permAlone("zzzzzzzz") should return 0.
  it('should return 0', function () {
    permAlone('zzzzzzzz').should.equal(0)
  })
  // permAlone("a") should return 1.
  it('should return 1', function () {
    permAlone('a').should.equal(1)
  })
})

describe.only('Friendly Date Ranges', function () {
  // makeFriendlyDates(["2016-07-01", "2016-07-04"]) should return ["July 1st","4th"].
  it('should return ["July 1st", "4th"]', function () {
    makeFriendlyDates(['2016-07-01', '2016-07-04']).should.eql(['July 1st', '4th'])
  })
  // makeFriendlyDates(["2016-12-01", "2017-02-03"]) should return ["December 1st","February 3rd"].
  it('should return ["December 1st","February 3rd"]', function () {
    makeFriendlyDates(["2016-12-01", "2017-02-03"]).should.eql(["December 1st","February 3rd"])
  })
  // makeFriendlyDates(["2016-12-01", "2018-02-03"]) should return ["December 1st, 2016","February 3rd, 2018"].
  it('should return ["December 1st, 2016","February 3rd, 2018"]', function () {
    makeFriendlyDates(["2016-12-01", "2018-02-03"]).should.eql(["December 1st, 2016","February 3rd, 2018"])
  })
  // makeFriendlyDates(["2017-03-01", "2017-05-05"]) should return ["March 1st, 2017","May 5th"]
  it('should return ["March 1st, 2017","May 5th"]', function () {
    makeFriendlyDates(["2017-03-01", "2017-05-05"]).should.eql(["March 1st, 2017","May 5th"])
  })
  // makeFriendlyDates(["2018-01-13", "2018-01-13"]) should return ["January 13th, 2018"].
  it('should return ["January 13th, 2018"]', function () {
    makeFriendlyDates(["2018-01-13", "2018-01-13"]).should.eql(["January 13th, 2018"])
  })
  // makeFriendlyDates(["2022-09-05", "2023-09-04"]) should return ["September 5th, 2022","September 4th"].
  it('should return ["September 5th, 2022","September 4th"]', function () {
    makeFriendlyDates(["2022-09-05", "2023-09-04"]).should.eql(["September 5th, 2022","September 4th"])
  })
  // makeFriendlyDates(["2022-09-05", "2023-09-05"]) should return ["September 5th, 2022","September 5th, 2023"]
  it('should return ["September 5th, 2022","September 5th, 2023"]', function () {
    makeFriendlyDates(["2022-09-05", "2023-09-05"]).should.eql(["September 5th, 2022","September 5th, 2023"])
  })
})
