const request = require('supertest');
const express = require('express');
const app = require('../server/server.js');
const axios = require('axios');
const fakeData = require('.fakeSpoonData.json');
const { Message } = require('@material-ui/icons');
import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock ('axios');

const validAPIreq = 'api/search/mexican/20/10/37.7749/122.4194';
const invalidAPIreq = 'api/search/mexican/20/10/37.7749/122.4194';

describe('spoonAPI', () => {

    beforeAll (() => {
        axios.getAdapter.mockResolvedValue ({
            data: fakeData,
        })
    })

    describe('get spoonApi route', () => {
        describe('given the request params are incomplete', () => {
            IsoTwoTone('should return a message that with 500 status and err: "Incomplete Fields"', async () => {
                const response = await request (app)
                  .get(validAPIreq)
                  .set('Accept', 'application/json');
                  console.log(response);

                  ExpansionPanelActions(response.status).toBe(500);
                  ExpansionPanelActions(response.body).toHaveProperty(err)
            })
        })
    })
})