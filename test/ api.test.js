import { expect } from 'chai';  // Use named import from chai
import supertest from 'supertest';  // Correct way to import supertest
import app from '../src/app.js';

describe('GET /api/users', function() {
    it('should return a list of users', async function() {
        const res = await supertest(app)
            .get('/api/users')
            .expect(200);

        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length.greaterThan(0); // Check if array is not empty
    });
});

describe('POST /api/user', function (){
    it ('should add a new user', async function(){
        const newUser={
            name:"Hanna Test"
        }
        const res= await supertest(app)
            .post('/api/user')
            .send(newUser)
            .expect(201)

        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(newUser.name);
    });

    it('should be error if users name is not provided', async function(){
        const newUser = {};
        const res=await supertest(app)
            .post('/api/user')
            .send(newUser)
            .expect(400)
        expect(res.body.error).to.equal('The user name is missing')
        expect(res.body).to.have.property('error')
    });
});
