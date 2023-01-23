const faker = require('faker')

const json = [
  {
    question: 'What is NFT Staking?',
    answer:
      'Staking is depositing a cryptocurrency in a blockchain network and receiving rewards for it for not selling the cryptocurrency while it is staked. NFTs can be staked in a staking platform to earn rewards without having to sell the NFTs.',
    isVisible: true,
    rank: 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = json
