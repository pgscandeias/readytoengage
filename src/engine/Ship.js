export default class Ship {
  type = ''
  model = ''
  guns = 0
  hp = 0

  constructor (s) {
    this.type = s.type
    this.model = s.model
    this.guns = s.guns
    this.hp = s.hp
  }
}
