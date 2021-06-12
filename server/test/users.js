const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

const app = require('../app')

chai.should()
chai.use(chaiHttp)


describe('User API', () => {


    describe('POST /user/register', () => {
        it("It should register a new user",(done)=>{
            const user = {
               fname:"testing",
               lname:'testing',
               username:"testing",
               email:"testing@gmail.com",
               password: "testing"
            }
            chai.request(app)
                .post("/user/register")
                .send(user)
                .end((err,response)=>{
                    response.should.have.status(201)
                    done()
                })
            
        })
    })


    describe('POST /user/login', () => {
        it("It should login user",(done)=>{
            const user = {
               username:"testing",
               password: "testing"
            }
            chai.request(app)
                .post("/user/login")
                .send(user)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            
        })
    })

    
    describe('GET /user/retrieve', () => {
        it("It should get all the user",(done)=>{

            chai.request(app)
            .post("/user/login")
            .send({
                username:"rubi",
                password:"rubi"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            chai.request(app)
                .get("/user/retrieve")
                .set('Authorization','Bearer ' + token)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })


    describe('GET /user/:userId', () => {
        it("It should get a single user",(done)=>{

            chai.request(app)
            .post("/user/login")
            .send({
                username:"rubi",
                password:"rubi"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const userId = "60687edf13a1033bec64854c"
            chai.request(app)
                .get("/user/"+userId)
                .set('Authorization','Bearer ' + token)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })

})
