let mongoose = require("mongoose");
let user = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
const { expect } = require("chai");
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('user', () => {
  
/*
  * Test the /GET route
  */
  describe('GET user', () => {
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
 describe('create-user', () => {
    it('create user', (done) => {
        let user = {
            first_name: "Honey",
            last_name: "singh",
            email: "hone@gmail.com",
            password:"1234"
        }
      chai.request(server)
          .post('/v1/create-user')
          .send(user)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
    it('Please provide all Data',(done)=>{
        let user={
            first_name:"",
            last_name:"",
            email: "",
            password:""
        }
        chai.request(server)
          .post('/v1/create-user')
          .send(user)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    });
    
    it('Invalid Email',(done)=>{
        let user={
            first_name: "Honey",
            last_name: "singh",
            email: "honegmailcom",
            password:"1234"
        }
        chai.request(server)
          .post('/v1/create-user')
          .send(user)
          .end((err, res) => {
                res.should.have.status(500);
            done();
          });
    })
});

