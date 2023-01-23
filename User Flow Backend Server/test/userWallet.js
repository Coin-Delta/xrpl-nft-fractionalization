/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const UserWallets = require('../app/models/userWallets')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}
let token = ''
const createdID = []

const userId = faker.random.words()
const userName = faker.random.words()
const metamaskAddress = faker.random.words()
const blockchainEnv = faker.random.words()
const blockchainType = faker.random.words()
const contractAddress = faker.random.words()
const contractType = faker.random.words()
const contractABI = faker.random.words()
const contractVersion = faker.random.words()
const metamaskAddressAdded = faker.date.recent()
const metamaskActive = faker.datatype.boolean()

const newBlockchainEnv = faker.random.words()
const newBlockchainType = faker.random.words()
const newContractAddress = faker.random.words()
const newContractType = faker.random.words()
const newContractABI = faker.random.words()
const newContractVersion = faker.random.words()
const newUserId = faker.random.words()
const newUserName = faker.random.words()
const newMetamaskAddress = faker.random.words()
const newMetamaskAddressAdded = faker.date.recent()
const newMetamaskActive = faker.datatype.boolean()

chai.use(chaiHttp)

describe('*********** USERWALLET ***********', () => {
  describe('/POST login', () => {
    it('it should GET token', (done) => {
      chai
        .request(server)
        .post('/login')
        .send(loginDetails)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.should.have.property('token')
          token = res.body.token
          done()
        })
    })
  })

  describe('/GET userWallet', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/userWallets')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the userWallet', (done) => {
      chai
        .request(server)
        .get('/userWallets')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the userWallet with filters', (done) => {
      chai
        .request(server)
        .get('/userWallets?filter=Super&fields=userName')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('userName').eql('Super')
          done()
        })
    })
  })

  describe('/POST userWallet', () => {
    it('it should NOT POST a userWallet without values', (done) => {
      const userWallet = {}
      chai
        .request(server)
        .post('/userWallets')
        .set('Authorization', `Bearer ${token}`)
        .send(userWallet)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a userWallet ', (done) => {
      const userWallet = {
        userId,
        userName,
        metamaskAddress,
        metamaskAddressAdded,
        metamaskActive,
        blockchainEnv,
        blockchainType,
        contractAddress,
        contractType,
        contractABI,
        contractVersion
      }
      chai
        .request(server)
        .post('/userWallets')
        .set('Authorization', `Bearer ${token}`)
        .send(userWallet)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'contractABI',
            'userId',
            'metamaskAddress',
            'metamaskAddressAdded',
            'metamaskActive',
            'contractAddress',
            'contractType',
            'contractVersion',
            'blockchainType',
            'blockchainEnv',
            'createdAt',
            'updatedAt'
          )
          createdID.push(res.body._id)
          done()
        })
    })
  })

  describe('/GET/:id userWallet', () => {
    it('it should GET a userWallet by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/userWallets/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'contractABI',
            'userId',
            'metamaskAddress',
            'metamaskAddressAdded',
            'metamaskActive',
            'contractAddress',
            'contractType',
            'contractVersion',
            'blockchainType',
            'blockchainEnv',
            'createdAt',
            'updatedAt'
          )
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id userWallet', () => {
    it('it should UPDATE a userWallet given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/userWallets/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: newUserId,
          userName: newUserName,
          metamaskAddress: newMetamaskAddress,
          metamaskAddressAdded: newMetamaskAddressAdded,
          metamaskActive: newMetamaskActive,
          blockchainEnv: newBlockchainEnv,
          blockchainType: newBlockchainType,
          contractAddress: newContractAddress,
          contractType: newContractType,
          contractABI: newContractABI,
          contractVersion: newContractVersion
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('userId').eql(newUserId)
          res.body.should.have.property('userName').eql(newUserName)
          res.body.should.have
            .property('metamaskAddress')
            .eql(newMetamaskAddress)
          res.body.should.have.property('metamaskActive').eql(newMetamaskActive)
          res.body.should.have
            .property('metamaskAddressAdded')
            .eql(newMetamaskAddressAdded.toISOString())
          done()
        })
    })
  })

  describe('/DELETE/:id userWallet', () => {
    it('it should DELETE a userWallet given the id', (done) => {
      const userWallet = {
        userId,
        userName,
        metamaskAddress,
        metamaskAddressAdded,
        metamaskActive,
        blockchainEnv,
        blockchainType,
        contractAddress,
        contractType,
        contractABI,
        contractVersion
      }
      chai
        .request(server)
        .post('/userWallets')
        .set('Authorization', `Bearer ${token}`)
        .send(userWallet)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'contractABI',
            'userId',
            'metamaskAddress',
            'metamaskAddressAdded',
            'metamaskActive',
            'contractAddress',
            'contractType',
            'contractVersion',
            'blockchainType',
            'blockchainEnv',
            'createdAt',
            'updatedAt'
          )
          chai
            .request(server)
            .delete(`/userWallets/${res.body._id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              result.body.should.have.property('msg').eql('DELETED')
              done()
            })
        })
    })
  })

  after(() => {
    createdID.forEach((id) => {
      UserWallets.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
