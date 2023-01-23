const faker = require('faker')

module.exports = [
  {
    userId: '63691aca9273fa3dc44ad77c',
    transactionTime: faker.date.recent(),
    transactionType: '8e89f68218fb3a08ae59bf211cae9db99',
    transactionHash: '8e89f68218shb3a08ae59bf211cae9db99',
    userName: 'Super',
    userFrom: 'One',
    walletAddress: 'hjsh',
    productId: '4fcf3f78138f61fe6273dbd1d6c05f15e',
    Quantity: 3,
    Price: 300,
    currency: 'doge',
    stakedQty: 3,
    stakedRewards: 5,
    stakedTokens: '4fcf3f78138f61fe6273dbd1d6c05yhsfhe',
    stakedExpiration: faker.date.recent(),
    userEmail: 'super@gmail.com',
    createdDate: faker.date.recent()
  },
  {
    userId: '63691aca9273fa3dc44ad77d',
    transactionTime: faker.date.recent(),
    transactionType: '8e89f68218fb3a0rgjnrj9bf211cae9db99',
    transactionHash: '8e89f68218shberhte59bf211cae9db99',
    userName: 'admin',
    userFrom: 'two',
    walletAddress: 'uejbfj',
    productId: '4fcf3f78138f61fe6273dbd1d6c05f15e',
    Quantity: 4,
    Price: 3000,
    currency: 'metic',
    stakedQty: 5,
    stakedRewards: 7,
    stakedTokens: '4fcf3fuergfy8f61fe6273dbd1d6c05yhsfhe',
    stakedExpiration: faker.date.recent(),
    userEmail: 'admin@gmail.com',
    createdDate: faker.date.recent()
  }
]
