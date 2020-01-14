/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import EventSource from 'eventsource';
import http from "http";

import app from '../app.js';
import { toRoman, getRomanNumeral } from '../convert.js';

chai.use(chaiHttp);
chai.should();

describe("Convert to roman numerals", () => {
  describe("GET /", () => {
    it("should require the `number` query parameter", done => {
      chai.request(app)
          .get('/convert')
          .end((err, res) => {
            res.should.have.status(422);
            res.body.code.should.be.equal("missing_number_parameter");
            done();
          });
    });

    it("the `number` parameter should value should be between 1 and 4999", done => {
      chai.request(app)
          .get('/convert?number=5000')
          .end((err, res) => {
            res.should.have.status(422);
            res.body.code.should.be.equal("bad_number_parameter");
            done();
          });
    });

    it("should return a successful response", done => {
      chai.request(app)
          .get('/convert?number=123')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.success.should.be.true;
            done();
          });
    });
  });

  describe("/convert-update SSE", () => {
    it("should subscribe to the `/convert-update` SSE", (done) => {
      const number = 123;
      const numerals = "CXXIII";

      const source = new EventSource("http://localhost:3000/convert-update");

      source.addEventListener("message", e => {
        const data = JSON.parse(e.data);
        assert.equal(data.result, numerals);
        done();
      });

      http.get(`http://localhost:3000/convert?number=${number}`);
    });
  });

  describe("toRoman", () => {
    it("should return a roman number", done => {
      toRoman(123).then(result => {
        assert.equal(result, "CXXIII");
        done();
      });
    });

    it("should return an error when the parameter value is not between 1 and 4999", done => {
      toRoman(5000).catch(e => {
        assert.equal(e, "bad_parameter_value");
        done();
      });
    });
  });

  describe("getRomanNumeral", () => {
    it("should return a roman numeral", done => {
      getRomanNumeral(2, 1).then(result => {
        assert.equal(result, "XX");
        done();
      })
    })
  });
});