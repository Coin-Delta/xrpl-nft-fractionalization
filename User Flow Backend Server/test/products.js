/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const Product = require('../app/models/product')
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

const tokenName = faker.random.words()
const tokenId = faker.random.words()
const tokenContractAddress = faker.random.words()

const newtokenName = faker.random.words()
const newtokenId = faker.random.words()
const newtokenContractAddress = faker.random.words()

const repeatNewtokenName = faker.random.words()
const repeatNewtokenId = faker.random.words()
const repeatNewtokenContractAddress = faker.random.words()

chai.use(chaiHttp)

describe('*********** PRODUCTS ***********', () => {
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

  describe('/GET products', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/products')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the products', (done) => {
      chai
        .request(server)
        .get('/products')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the products with filters', (done) => {
      chai
        .request(server)
        .get('/products?filter=test_1&fields=tokenName')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('tokenName').eql('test_1')
          done()
        })
    })
  })

  describe('/POST product', () => {
    it('it should NOT POST a product without name', (done) => {
      const product = {}
      chai
        .request(server)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a product ', (done) => {
      const product = {
        tokenName,
        tokenId,
        tokenContractAddress
      }
      chai
        .request(server)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'tokenName')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a product that already exists', (done) => {
      const product = {
        tokenName,
        tokenId,
        tokenContractAddress
      }
      chai
        .request(server)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })

  describe('/GET/:id product', () => {
    it('it should GET a product by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('tokenName')
          res.body.should.have.property('tokenId')
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id product', () => {
    it('it should UPDATE a product given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          tokenName: newtokenName,
          tokenId: newtokenId,
          tokenContractAddress: newtokenContractAddress
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('tokenName').eql(newtokenName)
          res.body.should.have.property('tokenId').eql(newtokenId)
          done()
        })
    })
    it('it should NOT UPDATE a product that already exists', (done) => {
      const product = {
        tokenName: repeatNewtokenName,
        tokenId: repeatNewtokenId,
        tokenContractAddress: repeatNewtokenContractAddress
      }
      chai
        .request(server)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id')
          res.body.should.have.property('tokenName').eql(repeatNewtokenName)
          res.body.should.have.property('tokenId').eql(repeatNewtokenId)
          const anotherProduct = {
            tokenName: repeatNewtokenName,
            tokenId: repeatNewtokenId
          }
          chai
            .request(server)
            .patch(`/products/${createdID.slice(-1).pop()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(anotherProduct)
            .end((error, result) => {
              result.should.have.status(422)
              result.body.should.be.a('object')
              result.body.should.have.property('errors')
              done()
            })
        })
    })
  })

  describe('/POST buyNFTToken', () => {
    it('it should NOT POST a buyNFTToken without productId', (done) => {
      const bnt = {}
      chai
        .request(server)
        .post('/products/buyNFTToken')
        .set('Authorization', `Bearer ${token}`)
        .send(bnt)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a buyNFTToken ', (done) => {
      const product = {
        tokenName: faker.random.words(),
        tokenId: faker.random.words(),
        tokenContractAddress: faker.random.words(),
        tokenInstantPrice: 10,
        remainingFractions: 10,
        totalFractions: 10
      }
      chai
        .request(server)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'tokenName')
          createdID.push(res.body._id)
          const bnt = {
            productId: res.body._id,
            quantity: 1
          }
          chai
            .request(server)
            .post(`/products/buyNFTToken`)
            .set('Authorization', `Bearer ${token}`)
            .send(bnt)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              done()
            })
        })
    })
    it('it should NOT POST a buyNFTToken if Requested quantity is grater then available quantity', (done) => {
      const id = createdID.slice(-1).pop()
      const bnt = {
        productId: id,
        quantity: 100
      }
      chai
        .request(server)
        .post('/products/buyNFTToken')
        .set('Authorization', `Bearer ${token}`)
        .send(bnt)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          done()
        })
    })
  })

  describe('/DELETE/:id product', () => {
    it('it should DELETE a product given the id', (done) => {
      const product = {
        tokenName,
        tokenId
      }
      chai
        .request(server)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id')
          res.body.should.have.property('tokenName').eql(tokenName)
          res.body.should.have.property('tokenId').eql(tokenId)
          chai
            .request(server)
            .delete(`/products/${res.body._id}`)
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
      Product.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
