var supertest = require("supertest");
const chai = require('chai');
const should = chai.should();
// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("Unit test for endpoint regarding cart",function(){

  it("should return list of products in the cart",function(done){

    server
    .get("/cart")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response

    .end(function(err,res){
      // console.log(res.body);
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.should.be.a('array');
      done();
    });
  });

  it("should add a new item to cart when the cart is empty",function(done){

    
    server
    .post('/cart')
    .send({product_name: "apple",unit_number: 2})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){

      res.status.should.equal(200);
      res.body.product_name.should.equal("apple");
      res.body.unit_number.should.be.a('Number');
      res.body.unit_number.should.equal(2);
      res.body.sub_total.should.be.a('Number');
      res.body.sub_total.should.equal(8.4)

      done();
    });
  });

  it("should update the unit_number and sub_total when the cart already exist apple",function(done){

    server
    .post('/cart')
    .send({product_name: "apple",unit_number: 10})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){

      res.status.should.equal(200);
      res.body.product_name.should.equal("apple");
      res.body.unit_number.should.be.a('Number');
      res.body.unit_number.should.equal(12);
      res.body.sub_total.should.be.a('Number');
      res.body.sub_total.should.equal(12*4.2)

      done();
    });
  });

  // it("should return price of apple(which is in database)",function(done){

  //   // calling home page api
  //   server
  //   .get("/product/apple")
  //   .expect("Content-type",/json/)
  //   .expect(200) // THis is HTTP response

  //   .end(function(err,res){
  //     // HTTP status should be 200
  //     res.status.should.equal(200);
  //     res.body.should.equal(4.2);
  //     done();
  //   });
  // });

  // it("should return price of happy(which is not database)",function(done){

  //   // calling home page api
  //   server
  //   .get("/product/happy")
  //   .expect("Content-type",/json/)
  //   .expect(200) // THis is HTTP response

  //   .end(function(err,res){
  //     // console.log(res.body);
  //     // HTTP status should be 200
  //     res.status.should.equal(200);
  //     res.body.error.should.equal("product not in database");
  //     done();
  //   });
  // });

  // it("should add a new item ",function(done){

  //   //calling ADD api
  //   server
  //   .post('/add')
  //   .send({num1 : 10, num2 : 20})
  //   .expect("Content-type",/json/)
  //   .expect(200)
  //   .end(function(err,res){
  //     res.status.should.equal(200);
  //     res.body.error.should.equal(false);
  //     res.body.data.should.equal(40);
  //     done();
  //   });
  // });


});