/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const ProductVault = require('../app/models/productVault')
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
const productId = '63691aca9273fa3dc44ad77d'
const userId = '63648a0d09560ae63598a520'
const fractions = faker.datatype.number()

const newProductId = '63648a0d09560ae63598a520'
const newUserId = '63691aca9273fa3dc44ad77d'
const newFractions = faker.datatype.number()

chai.use(chaiHttp)

describe('*********** PRODUCTVAULT ***********', () => {
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

  describe('/GET productVault', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/productVaults')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the productVault', (done) => {
      chai
        .request(server)
        .get('/productVaults')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the productVault with filters', (done) => {
      chai
        .request(server)
        .get('/productVaults?filter=Administrator&fields=createdBy')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have
            .property('createdBy')
            .eql('Administrator')
          done()
        })
    })
  })

  describe('/POST productVault', () => {
    it('it should NOT POST a productVault without values', (done) => {
      const productVault = {}
      chai
        .request(server)
        .post('/productVaults')
        .set('Authorization', `Bearer ${token}`)
        .send(productVault)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a productVault ', (done) => {
      const productVault = {
        productId,
        userId,
        fractions
      }
      chai
        .request(server)
        .post('/productVaults')
        .set('Authorization', `Bearer ${token}`)
        .send(productVault)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'productId',
            'userId',
            'fractions'
          )
          createdID.push(res.body._id)
          done()
        })
    })
  })

  describe('/GET/:id productVault', () => {
    it('it should GET a productVault by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/productVaults/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'productId',
            'userId',
            'fractions'
          )
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id productVault', () => {
    it('it should UPDATE a productVault given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/productVaults/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId: newProductId,
          userId: newUserId,
          fractions: newFractions
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('productId').eql(newProductId)
          res.body.should.have.property('userId').eql(newUserId)
          res.body.should.have.property('fractions').eql(newFractions)
          done()
        })
    })
  })

  describe('/DELETE/:id productVault', () => {
    it('it should DELETE a productVault given the id', (done) => {
      const productVault = {
        productId,
        userId,
        fractions
      }
      chai
        .request(server)
        .post('/productVaults')
        .set('Authorization', `Bearer ${token}`)
        .send(productVault)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'productId',
            'userId',
            'fractions'
          )
          chai
            .request(server)
            .delete(`/productVaults/${res.body._id}`)
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
      ProductVault.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
