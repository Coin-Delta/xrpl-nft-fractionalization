/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const UserActivity = require('../app/models/userActivity')
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

const userId = '63691aca9273fa3dc44ad77d'
const productId = '63648a0d09560ae63598a520'
const userFrom = '63691aca9273fa3dc44ad77d'
const newUserId = '63691aca9273fa3dc44ad77c'
const newProductId = '6364a078f99b24001adc8c38'
const newUserFrom = '63691aca9273fa3dc44ad77c'

chai.use(chaiHttp)

describe('*********** USERACTIVITY ***********', () => {
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

  describe('/GET userActivity', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/userActivities')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the userActivity', (done) => {
      chai
        .request(server)
        .get('/userActivities')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the userActivity with filters', (done) => {
      chai
        .request(server)
        .get('/userActivities?filter=doge&fields=currency')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('currency').eql('doge')
          done()
        })
    })
  })

  describe('/POST userActivity', () => {
    it('it should NOT POST a userActivity without values', (done) => {
      const userActivity = {}
      chai
        .request(server)
        .post('/userActivities')
        .set('Authorization', `Bearer ${token}`)
        .send(userActivity)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a userActivity ', (done) => {
      const userActivity = {
        userId,
        productId,
        userFrom
      }
      chai
        .request(server)
        .post('/userActivities')
        .set('Authorization', `Bearer ${token}`)
        .send(userActivity)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'userId', 'productId')
          createdID.push(res.body._id)
          done()
        })
    })
  })

  describe('/GET/:id userActivity', () => {
    it('it should GET a userActivity by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/userActivities/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'userId', 'productId')
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id userActivity', () => {
    it('it should UPDATE a userActivity given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/userActivities/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: newUserId,
          productId: newProductId,
          userFrom: newUserFrom
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('userId').eql(newUserId)
          res.body.should.have.property('productId').eql(newProductId)
          done()
        })
    })
  })

  describe('/DELETE/:id userActivity', () => {
    it('it should DELETE a userActivity given the id', (done) => {
      const userActivity = {
        userId,
        productId,
        userFrom
      }
      chai
        .request(server)
        .post('/userActivities')
        .set('Authorization', `Bearer ${token}`)
        .send(userActivity)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'userId', 'productId')
          chai
            .request(server)
            .delete(`/userActivities/${res.body._id}`)
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
      UserActivity.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
