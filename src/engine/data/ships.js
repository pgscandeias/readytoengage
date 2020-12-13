export default {
  transport: {
    type: 'transport',
    model: 'Civilian transport',
    chance: 50,
    guns: 0,
    hp: 3,
    drops: {
      fuel: 3
    }
  },
  freighter: {
    type: 'freighter',
    model: 'Cargo freighter',
    chance: 30,
    guns: 3,
    hp: 10,
    drops: {
      fuel: 10
    }
  },
  gunboat: {
    type: 'gunboat',
    model: 'Light gunboat',
    chance: 20,
    guns: 10,
    hp: 10,
    drops: {
      fuel: 5,
      guns: 1
    }
  }
}
