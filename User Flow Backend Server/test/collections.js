/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const Collection = require('../app/models/collection')
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
const name = faker.random.words()
const userId = faker.random.words()
const imageurl = faker.random.words()

chai.use(chaiHttp)

describe('*********** Collections ***********', () => {
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
  describe('/POST collection', () => {
    it('it should NOT POST a collections without values', (done) => {
      const collection = {}
      chai
        .request(server)
        .post('/collections')
        .set('Authorization', `Bearer ${token}`)
        .send(collection)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a collection ', (done) => {
      const collection = {
        name,
        userId,
        imageurl
      }
      chai
        .request(server)
        .post('/collections')
        .set('Authorization', `Bearer ${token}`)
        .send(collection)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'name', 'userId', 'imageurl')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a collection that already exists', (done) => {
      const collection = {
        name,
        userId,
        imageurl
      }
      chai
        .request(server)
        .post('/collections')
        .set('Authorization', `Bearer ${token}`)
        .send(collection)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })
  describe('/GET collections', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/collections')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the collections', (done) => {
      chai
        .request(server)
        .get('/collections')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the collections with filters', (done) => {
      chai
        .request(server)
        .get(`/collections?filter=${userId}?&fields=userId`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('userId').eql(userId)
          done()
        })
    })
  })
  describe('/GET/:id collections', () => {
    it('it should GET a collection by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/collections/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'name',
            'imageurl',
            'createdAt',
            'userId',
            'updatedAt'
          )
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })
  describe('/PATCH/:id collection', () => {
    it('it should UPDATE a collection given the id', (done) => {
      const id = createdID.slice(-1).pop()
      const newName = faker.random.words()
      chai
        .request(server)
        .patch(`/collections/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: newName
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('name').eql(newName)
          done()
        })
    })
  })
  describe('/DELETE/:id collection', () => {
    it('it should DELETE a collection given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .delete(`/collections/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  after(() => {
    createdID.forEach((id) => {
      Collection.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
