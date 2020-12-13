import Dice from './Dice'

export default class Lottery {
  entries = []
  lotsTotal = 0

  /**
   * {
   *   participant: string,
   *   lots: int
   * }
   */
  addEntry (entry) {
    this.entries.push(entry)
    this.lotsTotal += entry.lots
    return this
  }

  getWinner () {
    const rolled = new Dice(this.lotsTotal).roll()
    let currentLot = 0

    for (const e of this.entries) {
      currentLot = currentLot + e.lots
      if (currentLot >= rolled) {
        return e.participant
      }
    }
  }
}
