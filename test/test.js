/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// Configure chai
chai.use(chaiHttp);
chai.should();
*/


const chai = require('chai')
    , assert = chai.assert
    , expect = chai.expect
    , should = chai.should

const chaiHttp = require('chai-http')

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('GET APIs', function () {
    let app

    before(function () {
        app = require('../index')

        let val1 = 'this is a sample string'
        let val2 = 'I love CS3219'
        let val3 = '111'
        chai.request(app)
            .post(`/store/${val1}`)
            .end((err, res) => {
            })
        chai.request(app)
            .post(`/store/${val2}`)
            .end((err, res) => {
            })
        chai.request(app)
            .post(`/store/${val3}`)
            .end((err, res) => {
            })
    })

    after(function () {
        chai.request(app)
            .delete('/store/all')
            .end((err, res) => {
                console.log('cleared all content for next test')
            })
    })

    it("/store", (done) => {
        
        chai.request(app)
            .get('/store')
            .end((err, res) => {
                let arr = JSON.parse(res.text)
                res.should.have.status(200)
                arr.should.be.a('array')
                
                expect(arr).to.eql([
                    'this is a sample string', 
                    'I love CS3219', 
                    '111'])
                done()
            });
    });

    it("/store/{index}", (done) => {
        chai.request(app)
            .get('/store/0')
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                expect(res.text).to.equal('"this is a sample string"')
                done()
            })
    })
})

describe('POST APIs', function () {
    let app

    before(function () {
        app = require('../index')
    })

    after(function () {
        chai.request(app)
            .delete('/store/all')
            .end((err, res) => {
                console.log('cleared all content for next test')
            })
    })

    it("/store/{value}", (done) => {
        let val = 'this is a sample string'

        chai.request(app)
            .post(`/store/${val}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                expect(res.text).to.equal('Inserted content: index = 0, value = this is a sample string')
                done()
            })
    });

    it("/store/{index}/{value}", (done) => {
        let index = 0
        let val = 'inserting this at index 0'

        chai.request(app)
            .post(`/store/${index}/${val}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                expect(res.text).to.equal('Inserted content: index = 0, value = inserting this at index 0')
                done()
            })
    });
})

describe('PUT APIs', function () {
    let app

    before(function () {
        app = require('../index')
        let val = 'this is a sample string'

        chai.request(app)
            .post(`/store/${val}`)
            .end((err, res) => {
            })
    })

    after(function (done) {
        chai.request(app)
            .delete('/store/all')
            .end((err, res) => {
                console.log('cleared all content for next test')
            })
        done()
    })

    it("/store/{value}", (done) => {
        let replacingVal = 'replacing this is a sample string'

        chai.request(app)
            .put(`/store/${replacingVal}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                expect(res.text).to.equal('Replaced content: index = 0, value = replacing this is a sample string')
                done()
            })
    });

    it("/store/{index}/{value}", (done) => {
        let index = 0
        let replacingVal = 'replacing at the specified index'
        chai.request(app)
            .put(`/store/${index}/${replacingVal}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                expect(res.text).to.equal('Replaced content: index = 0, value = replacing at the specified index')
                done()
            })
    })
})

describe('DELETE APIs', function () {
    let app

    before(function () {
        app = require('../index')

        let val1 = 'this is a sample string'
        let val2 = 'I love CS3219'
        let val3 = '111'
        chai.request(app)
            .post(`/store/${val1}`)
            .end((err, res) => {
            })
        chai.request(app)
            .post(`/store/${val2}`)
            .end((err, res) => {
            })
        chai.request(app)
            .post(`/store/${val3}`)
            .end((err, res) => {
            })
    })

    after(function () {
        chai.request(app)
            .delete('/store/all')
            .end((err, res) => {
                console.log('cleared all content for next test')
            })
    })

    it("/store", (done) => {
        
        chai.request(app)
            .delete('/store')
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                expect(res.text).to.equal('Deleted content: index = 2, value = 111')
                done()
            });
    });

    it("/store/{index}", (done) => {
        let index = 0
        chai.request(app)
            .delete(`/store/${index}`)
            .end((err, res) => {
                res.should.have.status(200)
                res.text.should.be.a('string')
                expect(res.text).to.equal('Deleted content: index = 0, value = this is a sample string')
                done()
            })
    })
})