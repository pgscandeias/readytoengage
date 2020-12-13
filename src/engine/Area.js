import Ship from './Ship'
import Dice from './Dice'
import Lottery from './Lottery'
import shipList from './data/ships'

export default class Area {
  generateShips () {
    const lottery = new Lottery()
    const ships = []

    // Load up all ship into the lottery
    for (const type in shipList) {
      lottery.addEntry({
        participant: type,
        lots: shipList[type].chance
      })
    }

    // Decide how many ships we have
    const qty = new Dice(4).roll() - 1 // max 3 ships
    for (let i = 0; i < qty; i++) {
      ships.push(new Ship(shipList[lottery.getWinner()]))
    }

    return ships
  }
}
