"use strict";

const {expect} = require('chai');
const fetch = require("node-fetch");
const parameters = require("../../data/request-parameters.json");
const env = require("../../endPoint/uri-for-testing.json");


describe("Testing of 'JSONPlaceholder' web service", () => {
    let response;

    before(async () => {
        const uri = env.uri + parameters.uri;
        response = await fetch(uri);
    });

    after(() => response = null);


    it("Status code of the response should be '200'", () => {
        expect(response.status).to.equal(200);
    });


    it("The Content-Type header should exist in this response", () => {
        expect(response.headers.has("content-type")).to.be.true;
    });


    it("The Content-Type header should be equal to "
                                  + "'application/json; charset=utf-8'", () => {
        expect(response.headers.get("content-type"))
                                     .to.eql("application/json; charset=utf-8");
    });


    it("The content of the response body should be the array of 10 users",
                                                                   async () => {
        const receivedJson = await response.json();
        expect(receivedJson).to.have.lengthOf(10);
    });
});