export default class Ship {
  name = ''
  type = ''
  model = ''
  guns = 0
  hp = 0
  target = null

  constructor (s = {}) {
    this.name = s.name
    this.type = s.type
    this.model = s.model
    this.guns = s.guns
    this.hp = s.hp
  }

  static create () {
    return new Ship()
  }
}
