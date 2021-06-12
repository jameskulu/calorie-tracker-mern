const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

const app = require('../app')

chai.should()
chai.use(chaiHttp)


describe('Category API', () => {
    
    describe('GET /category/retrieve', () => {
        it("It should get all the category",(done)=>{

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
                .get("/category/retrieve")
                .set('Authorization','Bearer ' + token)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })


    describe('GET /category/:categoryId', () => {
        it("It should get a single movie",(done)=>{

            chai.request(app)
            .post("/user/login")
            .send({
                username:"rubi",
                password:"rubi"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const categoryId = "60477b28532d6519b89e4638"
            chai.request(app)
                .get("/category/"+categoryId)
                .set('Authorization','Bearer ' + token)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })


    describe('POST /category/create', () => {
        it("It should login, get a token and create a new category",(done)=>{

            chai.request(app)
            .post("/user/login")
            .send({
                username:"rubi",
                password:"rubi"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const category = {
                category_name:"category testing",
            }
            chai.request(app)
                .post("/category/create")
                .set('Authorization','Bearer ' + token)
                .send(category)
                .end((err,response)=>{
                    response.should.have.status(201)
                    done()
                })
            })
        })
    })


})
