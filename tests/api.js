const supertest = require('supertest')
const app = require('../app');
const request = supertest(app)

describe('GET /', function () {
    it('respond with hello world', function (done) {
        //navigate to root and check the the response is "hello world"
        request.get('/').expect('hello world', done);
    });
});