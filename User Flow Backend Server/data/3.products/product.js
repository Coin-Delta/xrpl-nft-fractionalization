const faker = require('faker')

const json = [
  {
    tokenName: 'test_1',
    tokenId: faker.random.words(),
    tokenContractAddress: faker.random.words(),
    tokenDescription: faker.random.words(),
    tokenInstantPrice: faker.datatype.number(),
    fractions: faker.datatype.number(),
    fractionName: faker.random.words(),
    fractionSymbol: faker.random.words()
  },
  {
    tokenName: 'test_2',
    tokenId: faker.random.words(),
    tokenContractAddress: faker.random.words(),
    tokenDescription: faker.random.words(),
    tokenInstantPrice: faker.datatype.number(),
    fractions: faker.datatype.number(),
    fractionName: faker.random.words(),
    fractionSymbol: faker.random.words()
  }
]

module.exports = json
