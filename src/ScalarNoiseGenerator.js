const { rand, lerp, floor } = require("./util")
const smooth = require("atlas-cubic-smoothing")

module.exports = class ScalarNoiseGenerator {
  constructor(width, height=width){
    if (!width) throw new Error("grid width required");
    const grid = [];
    this.grid = grid, this.width = width, this.height = height;
    for (let i = width; i--;){
      let r = (grid[i] = [])
      for (let j = height; j--;){
        r[j] = rand();
      }
    }
  }
  getPixel(x, y){
    const { grid: g, width: w, height: h } = this;
    x = x%w, y = y%h; // periodicity perferred over boundary errors
    const xf = floor(x), yf = floor(y), xc = (xf+1)%w, yc = (yf+1)%h;
    const sx = smooth(x-xf), sy = smooth(y-yf)
    return lerp(
      lerp(g[xf][yf], g[xf][yc], sy),
      lerp(g[xc][yf], g[xc][yc], sy),
      sx
    )
  }
}