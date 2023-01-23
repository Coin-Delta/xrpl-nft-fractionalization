/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const FAQ = require('../app/models/faq')
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
const question = faker.random.words()
const answer = faker.random.words()
const isVisible = faker.datatype.boolean()
const rank = faker.datatype.number()
const newAnswer = faker.random.words()
const newQuestion = faker.random.words()
const newIsVisible = faker.datatype.boolean()
const newRank = faker.datatype.number()

chai.use(chaiHttp)

describe('*********** FAQS ***********', () => {
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

  describe('/GET faqs', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/faqs')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the faqs', (done) => {
      chai
        .request(server)
        .get('/faqs')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the faqs with filters', (done) => {
      chai
        .request(server)
        .get('/faqs?filter=What is NFT Staking?&fields=question')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have
            .property('question')
            .eql('What is NFT Staking?')
          done()
        })
    })
  })

  describe('/POST faq', () => {
    it('it should NOT POST a faq without values', (done) => {
      const faq = {}
      chai
        .request(server)
        .post('/faqs')
        .set('Authorization', `Bearer ${token}`)
        .send(faq)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a faq ', (done) => {
      const faq = {
        question,
        answer,
        isVisible,
        rank
      }
      chai
        .request(server)
        .post('/faqs')
        .set('Authorization', `Bearer ${token}`)
        .send(faq)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'question',
            'answer',
            'isVisible',
            'rank'
          )
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a faq that already exists', (done) => {
      const faq = {
        question,
        answer,
        isVisible,
        rank
      }
      chai
        .request(server)
        .post('/faqs')
        .set('Authorization', `Bearer ${token}`)
        .send(faq)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })

  describe('/GET/:id faq', () => {
    it('it should GET a faq by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/faqs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'question',
            'answer',
            'isVisible',
            'rank'
          )
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id faq', () => {
    it('it should UPDATE a faq given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/faqs/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          question: newQuestion
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('question').eql(newQuestion)
          done()
        })
    })
    it('it should NOT UPDATE a faq that already exists', (done) => {
      const faq = {
        question,
        answer,
        isVisible,
        rank
      }
      chai
        .request(server)
        .post('/faqs')
        .set('Authorization', `Bearer ${token}`)
        .send(faq)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'question',
            'answer',
            'isVisible',
            'rank'
          )
          res.body.should.have.property('question').eql(question)
          res.body.should.have.property('answer').eql(answer)
          res.body.should.have.property('isVisible').eql(isVisible)
          res.body.should.have.property('rank').eql(rank)
          createdID.push(res.body._id)
          const anotherFQA = {
            question: newQuestion,
            answer: newAnswer,
            isVisible: newIsVisible,
            rank: newRank
          }
          chai
            .request(server)
            .patch(`/faqs/${createdID.slice(-1).pop()}`)
            .set('Authorization', `Bearer ${token}`)
            .send(anotherFQA)
            .end((error, result) => {
              result.should.have.status(422)
              result.body.should.be.a('object')
              result.body.should.have.property('errors')
              done()
            })
        })
    })
  })

  describe('/DELETE/:id faq', () => {
    it('it should DELETE a faq given the id', (done) => {
      const faq = {
        question: faker.random.words(),
        answer: faker.random.words(),
        isVisible: faker.datatype.boolean(),
        rank: faker.datatype.number()
      }
      chai
        .request(server)
        .post('/faqs')
        .set('Authorization', `Bearer ${token}`)
        .send(faq)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys(
            '_id',
            'question',
            'answer',
            'isVisible',
            'rank'
          )
          chai
            .request(server)
            .delete(`/faqs/${res.body._id}`)
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
      FAQ.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
