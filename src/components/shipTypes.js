const shipTypes = {
  transport: {
    name: 'Civilian transport',
    guns: 0,
    drops: {
      fuel: 3
    }
  },
  freighter: {
    name: 'Cargo freighter',
    guns: 3,
    drops: {
      fuel: 10
    }
  },
  gunboat: {
    name: 'Light gunboat',
    guns: 10,
    drops: {
      fuel: 5,
      guns: 1
    }
  }
}

export default shipTypes
