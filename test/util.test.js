const { describe, it } = require("mocha")
const { expect } = require("chai")
const rewire = require("rewire")
const helpers = rewire("../src/util")

let revert;

// default placeholder test
describe("util", function(){

  beforeEach(function(){
    revert && revert();
  })

  describe("rand", function(){
    it("should produce a random number", function(){
      revert = helpers.__set__("Math.random", () => "random")
      expect(helpers.rand()).to.equal("random")
    })
  })

  describe("floor", function(){
    it("should floor a number", function(){
      let didFloor = false;
      const num = 3;
      revert = helpers.__set__("Math.floor", inNum => {
        didFloor = true;
        expect(inNum).to.equal(num)
        return "floored"
      })
      expect(helpers.floor(num)).to.equal("floored")
      expect(didFloor).to.equal(true)
    })
  })

  describe("lerp", function(){
    it("should linearly interpolate between two heights on a normalized width", function(){
      const short = 5, tall = 10, halfway = .5, zero = 0, max = 1;
      expect(helpers.lerp(short, tall, halfway)).to.equal(7.5);
      expect(helpers.lerp(short, tall, zero)).to.equal(5);
      expect(helpers.lerp(short, tall, max)).to.equal(10);
    })
  })
})
