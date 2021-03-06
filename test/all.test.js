/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';

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

    it("should return roman numerals as a string", done => {
      chai.request(app)
          .get('/convert?number=123')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.result.should.be.equal("CXXIII");
            done();
          });
    });
  });

  describe("toRoman", () => {
    it("should return a roman number", async () => {
      const result = await toRoman(123);
      assert.equal(result, "CXXIII");
    });

    it("should return an error when the parameter value is not between 1 and 4999", async () => {
      try {
        await toRoman(5000)
      } catch (e) {
        assert.equal(e, "bad_parameter_value");
      }
    });
  });

  describe("getRomanNumeral", () => {
    it("should return a roman numeral", async () => {
      const result = await getRomanNumeral(2, 1);
      assert.equal(result, "XX");
    });
  });
});