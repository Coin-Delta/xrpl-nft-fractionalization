const faker = require('faker')

module.exports = [
  {
    nftId: '4fcf3f78138f61fe6273dbd1d6c05f15e',
    userId: '8e89f68218fb3a08ae59bf211cae9db99',
    fractions: 1000,
    createdBy: 'Administrator',
    createdDate: faker.date.recent()
  },
  {
    nftId: '5aa1c2c35ef7a4e97b5e995a',
    userId: '5aa1c2c35ef7a4e97b5e995b',
    fractions: 20,
    createdBy: 'Super',
    createdDate: faker.date.recent()
  }
]
