
import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai'
// const expect = _expect;
// const expect = require('chai').expect;


use(chaiHttp);

import app from './app.js'; 
describe('API Tests', () => {
  

  it('',  (done) => {
    console.log({host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,});
     chai.request(app)
     
      .get('/healthz') // Replace with the actual endpoint you want to test
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        
        done();
      
        process.exit(0);
      });
  });

  // Add more test cases as needed
});