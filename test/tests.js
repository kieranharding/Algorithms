var should = require('chai').should()
var validate = require('../telephoneCheck')
var diff = require('../symdiff')

describe('telephoneCheck', function () {
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

describe.only('symdiff', function () {
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
