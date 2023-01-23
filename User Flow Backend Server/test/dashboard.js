/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}
let token = ''

chai.use(chaiHttp)

describe('*********** DASHBOARD ***********', () => {
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

  describe('/GET getTopArtists', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/dashboard/getTopArtists')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the Top Artists', (done) => {
      const product = {
        tokenName: faker.random.words(),
        tokenId: faker.random.words(),
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
          chai
            .request(server)
            .get('/dashboard/getTopArtists')
            .set('Authorization', `Bearer ${token}`)
            .end((err1, res1) => {
              res1.should.have.status(200)
              res1.body.should.be.an('array')
              res1.body[0].should.have.property('count').eql(1)
              res1.body[0].should.have.property('user')
              done()
            })
        })
    })
  })

  describe('/GET getTopBuyer', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/dashboard/getTopBuyer')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the Top Buyer', (done) => {
      const product = {
        tokenName: faker.random.words(),
        tokenId: faker.random.words(),
        tokenInstantPrice: 100000,
        remainingFractions: 100000,
        totalFractions: 100000
      }
      chai
        .request(server)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          const bnt = {
            productId: res.body._id,
            quantity: 9999
          }
          chai
            .request(server)
            .post(`/products/buyNFTToken`)
            .set('Authorization', `Bearer ${token}`)
            .send(bnt)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              chai
                .request(server)
                .get('/dashboard/getTopBuyer')
                .set('Authorization', `Bearer ${token}`)
                .end((err1, res1) => {
                  res1.should.have.status(200)
                  res1.body.should.be.an('array')
                  res1.body[0].should.have.property('count').eql(9999)
                  res1.body[0].should.have.property('user')
                  done()
                })
            })
        })
    })
  })

  describe('/GET getTrendingAction', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/dashboard/getTrendingAction')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the Trandig Actions', (done) => {
      chai
        .request(server)
        .get('/dashboard/getTrendingAction')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('array')
          res.body[0].should.have.property('product')
          done()
        })
    })
  })

  describe('/GET getLastWeekBuyHistoty', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/dashboard/getLastWeekBuyHistoty')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET Last Week Buy History', (done) => {
      chai
        .request(server)
        .get('/dashboard/getLastWeekBuyHistoty')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('array')
          res.body[0].should.have.property('totalBuy').eql(999900000)
          res.body[0].should.have.property('avgBuy').eql(100000)
          done()
        })
    })
  })

  describe('/POST getMarketVisitor', () => {
    it('it should Get Market Visitor ', (done) => {
      const body = {
        fromDate: '2022-11-11'
      }
      chai
        .request(server)
        .post('/dashboard/getMarketVisitor')
        .set('Authorization', `Bearer ${token}`)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body[0].should.have.property('count')
          done()
        })
    })
  })
})
