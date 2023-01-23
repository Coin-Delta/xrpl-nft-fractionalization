/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const UserFavorites = require('../app/models/userFavorites')
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
const productId = '6356dfeadc81d33cf8a369e7'
const newProductId = '635a6f53cd57f60019064b75'

chai.use(chaiHttp)

describe('*********** USERFAVORITES ***********', () => {
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

  describe('/GET userFavorites', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/userFavorites')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the userFavorites', (done) => {
      chai
        .request(server)
        .get('/userFavorites')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the userFavorites with filters', (done) => {
      chai
        .request(server)
        .get('/userFavorites?filter=Super&fields=userName')
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

  describe('/POST userFavorites', () => {
    it('it should NOT POST a userFavorites without values', (done) => {
      const userFavorites = {}
      chai
        .request(server)
        .post('/userFavorites')
        .set('Authorization', `Bearer ${token}`)
        .send(userFavorites)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a userFavorites ', (done) => {
      const userFavorites = {
        productId
      }
      chai
        .request(server)
        .post('/userFavorites')
        .set('Authorization', `Bearer ${token}`)
        .send(userFavorites)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('userId', 'productId')
          createdID.push(res.body._id)
          done()
        })
    })
  })

  describe('/GET/:id userFavorites', () => {
    it('it should GET a userFavorites by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/userFavorites/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.include.keys('productId')
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id userFavorites', () => {
    it('it should UPDATE a userFavorites given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/userFavorites/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId: newProductId
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('productId').eql(newProductId)
          done()
        })
    })
  })

  describe('/DELETE/:id userFavorites', () => {
    it('it should DELETE a userFavorites given the id', (done) => {
      const userFavorites = {
        productId: '6352330bbe26ba46b4b9eb3b'
      }
      chai
        .request(server)
        .post('/userFavorites')
        .set('Authorization', `Bearer ${token}`)
        .send(userFavorites)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'userId', 'productId')
          chai
            .request(server)
            .delete(`/userFavorites/${newProductId}`)
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
      UserFavorites.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
