export default class Dice {
  constructor (sides = 20) {
    this.sides = sides
  }

  roll () {
    return Math.ceil(Math.random() * this.sides)
  }
}
