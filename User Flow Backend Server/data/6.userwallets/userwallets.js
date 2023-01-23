const faker = require('faker')

module.exports = [
  {
    userId: '4fcf3f78138f61fe6273dbd1d6c05f15e',
    userName: 'Super',
    metamaskAddress: '8e89f68218fb3a08ae59bf211cae9db99',
    metamaskAddressAdded: faker.date.recent(),
    metamaskActive: true
  },
  {
    userId: '5aa1c2c35ef7a4e97b5e995a',
    userName: 'Admin',
    metamaskAddress: '8e89f68218fb3a08ae59bf211cae9db99',
    metamaskAddressAdded: faker.date.recent(),
    metamaskActive: false
  }
]
