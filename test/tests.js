/* eslint-disable */
var should = require('chai').should()
var validate = require('../telephoneCheck')
var diff = require('../symdiff')
var change = require('../exactchange')
var inv = require('../inventory')
var permAlone = require('../permAlone')
var makeFriendlyDates = require('../friendlydates')
var Person = require('../makeperson')
var orbitalPeriod = require('../mapdebris')
var pairwise = require('../pairwise')

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

describe('Friendly Date Ranges', function () {
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

describe('Make a Person', function () {
  var bob
  before(function (done) {
    bob = new Person('Bob Ross')
    done()
  })

  // "assert.deepEqual(Object.keys(bob).length, 6, 'message: <code>Object.keys(bob).length</code> should return 6.');",
  it('should return an object with 6 members', function (done) {
    Object.keys(bob).should.have.length(6)
    done()
  })
  // "assert.deepEqual(bob instanceof Person, true, 'message: <code>bob instanceof Person</code> should return true.');",
  it('should be a person', function (done) {
    bob.should.be.an('object')
    done()
  })
  // "assert.deepEqual(bob.firstName, undefined, 'message: <code>bob.firstName</code> should return undefined.');",
  it('should have firstName undefined', function (done) {
    should.equal(bob.firstName, undefined)
    done()
  })
  // "assert.deepEqual(bob.lastName, undefined, 'message: <code>bob.lastName</code> should return undefined.');",
  it('should have lastName undefined', function (done) {
    should.equal(bob.lastName, undefined)
    done()
  })
  // "assert.deepEqual(bob.getFirstName(), 'Bob', 'message: <code>bob.getFirstName()</code> should return \"Bob\".');",
  it('should return "Bob"', function (done) {
    bob.getFirstName().should.equal('Bob')
    done()
  })
  // "assert.deepEqual(bob.getLastName(), 'Ross', 'message: <code>bob.getLastName()</code> should return \"Ross\".');",
  it('should return "Ross"', function (done) {
    bob.getLastName().should.equal('Ross')
    done()
  })
  // "assert.deepEqual(bob.getFullName(), 'Bob Ross', 'message: <code>bob.getFullName()</code> should return \"Bob Ross\".');",
  it('should return "Bob Ross"', function (done) {
    bob.getFullName().should.equal('Bob Ross')
    done()
  })
  // "assert.strictEqual((function () { bob.setFirstName(\"Haskell\"); return bob.getFullName(); })(), 'Haskell Ross', 'message: <code>bob.getFullName()</code> should return \"Haskell Ross\" after <code>bob.setFirstName(\"Haskell\")</code>.');",
  it('should return "Haskell Ross"', function (done) {
    bob.setFirstName('Haskell')
    bob.getFullName().should.equal('Haskell Ross')
    done()
  })
  // "assert.strictEqual((function () { var _bob=new Person('Haskell Ross'); _bob.setLastName(\"Curry\"); return _bob.getFullName(); })(), 'Haskell Curry', 'message: <code>bob.getFullName()</code> should return \"Haskell Curry\" after <code>bob.setLastName(\"Curry\")</code>.');",
  it('should return "Haskell Curry"', function (done) {
    var _bob = new Person('Haskell Ross')
    _bob.setLastName('Curry')
    _bob.getFullName().should.equal('Haskell Curry')
    done()
  })
  // "assert.strictEqual((function () { bob.setFullName(\"Haskell Curry\"); return bob.getFullName(); })(), 'Haskell Curry', 'message: <code>bob.getFullName()</code> should return \"Haskell Curry\" after <code>bob.setFullName(\"Haskell Curry\")</code>.');",
  it('should return "Haskell Curry"', function (done) {
    bob.setFullName('Haskell Curry')
    bob.getFullName().should.equal('Haskell Curry')
    done()
  })
  // "assert.strictEqual((function () { bob.setFullName(\"Haskell Curry\"); return bob.getFirstName(); })(), 'Haskell', 'message: <code>bob.getFirstName()</code> should return \"Haskell\" after <code>bob.setFullName(\"Haskell Curry\")</code>.');",
  it('should return "Haskell"', function (done) {
    bob.setFullName('Haskell Curry')
    bob.getFirstName().should.equal('Haskell')
    done()
  })
  // "assert.strictEqual((function () { bob.setFullName(\"Haskell Curry\"); return bob.getLastName(); })(), 'Curry', 'message: <code>bob.getLastName()</code> should return \"Curry\" after <code>bob.setFullName(\"Haskell Curry\")</code>.');"
  it('should return "Curry"', function (done) {
    bob.setFullName('Haskell Curry')
    bob.getLastName().should.equal('Curry')
    done()
  })
})

describe('Map the Debris', function () {
  // orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]) should return [{name: "sputnik", orbitalPeriod: 86400}].
  it('should return [{name: "sputnik", orbitalPeriod: 86400}]', function () {
    orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]).should.eql([{name: "sputnik", orbitalPeriod: 86400}])
  })
  // orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]) should return [{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}].
  it('should return [{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}]', function () {
    orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]).should.eql([{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}])
  })
})

describe('Pairwise', function () {
  // pairwise([1, 4, 2, 3, 0, 5], 7) should return 11.
  it('should return 11 given ([1, 4, 2, 3, 0, 5], 7)', function () {
    pairwise([1, 4, 2, 3, 0, 5], 7).should.equal(11)
  })
  // pairwise([1, 3, 2, 4], 4) should return 1.
  it('should return 1 given ([1, 3, 2, 4], 4)', function () {
    pairwise([1, 3, 2, 4], 4).should.equal(1)
  })
  // pairwise([1, 1, 1], 2) should return 1.
  it('should return 1 given ([1, 1, 1], 2)', function () {
    pairwise([1, 1, 1], 2).should.equal(1)
  })
  // pairwise([0, 0, 0, 0, 1, 1], 1) should return 10.
  it('should return 10 given ([0, 0, 0, 0, 1, 1], 1)', function () {
    pairwise([0, 0, 0, 0, 1, 1], 1).should.equal(10)
  })
  // pairwise([], 100) should return 0.
  it('should return 0 given ([], 100)', function () {
    pairwise([], 100).should.equal(0)
  })
})
