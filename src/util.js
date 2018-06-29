const rand = () => Math.random()

const floor = n => Math.floor(n)

const lerp = (a, b, x) => x*(b-a) + a;

module.exports = { rand, floor, lerp } 