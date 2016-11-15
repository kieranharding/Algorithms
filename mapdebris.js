/* Return a new array that transforms the element's average altitude into their orbital periods.
The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.
You can read about orbital periods on wikipedia.
The values should be rounded to the nearest whole number. The body being orbited is Earth.
The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2. */

function orbitalPeriod (arr) {
  /* T = 2 * pi * ((r^3) / mu) ^ (1/3) */

  var GM = 398600.4418 // mu
  var earthRadius = 6367.4447 // r
  var result = arr.map(function (item) {
    item.orbitalPeriod = Math.round(2 * Math.PI * Math.pow((Math.pow(earthRadius + item.avgAlt, 3) / (GM)), 0.5))
    delete item.avgAlt
    return item
  })
  return result
}

module.exports = orbitalPeriod
