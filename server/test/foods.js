const chai = require('chai')
const chaiHttp = require('chai-http')
const mocha = require('mocha')

const app = require('../app')

chai.should()
chai.use(chaiHttp)


describe('Food API', () => {
    
    describe('GET /foods/retrieve', () => {
        it("It should get all the food",(done)=>{

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
                .get("/food/retrieve")
                .set('Authorization','Bearer ' + token)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })

    describe('GET /food/:foodId', () => {
        it("It should get a single food",(done)=>{

            chai.request(app)
            .post("/user/login")
            .send({
                username:"rubi",
                password:"rubi"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const foodId = "605b2cd0b5fc21065ccac19b"
            chai.request(app)
                .get("/food/"+foodId)
                .set('Authorization','Bearer ' + token)
                .end((err,response)=>{
                    response.should.have.status(200)
                    done()
                })
            })
        })
    })


    describe('POST /food/create', () => {
        it("It should login, get a token and create a new food",(done)=>{

            chai.request(app)
            .post("/user/login")
            .send({
                username:"rubi",
                password:"rubi"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const food = {
                food_name:"food testing",
                food_calories:400,
                food_description:"food testing",
                category:"food testing",
                food_image:"images\\no-image.jpg"
            }
            chai.request(app)
                .post("/food/create")
                .set('Authorization','Bearer ' + token)
                .send(food)
                .end((err,response)=>{
                    response.should.have.status(201)
                    done()
                })
            })
        })
    })

})
