let mongoose = require("mongoose");
let user = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('user', () => {
  
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the user', (done) => {
        chai.request(server)
            .get('/v1/list-user')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

});

 /*
  * Test the /POST route
  */
 describe('/v1/create-user', () => {
    it('create user', (done) => {
        let user = {
            first_name: "Honey",
            last_name: "singh",
            email: "honey@gmail.com",
            password:"1234"
        }
      chai.request(server)
          .post('/v1/create-user')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                
            done();
          });
    });

});
