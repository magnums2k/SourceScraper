import { MP4UploadScrapper } from '../lib';

import { ISourceData } from 'sourcescrapper-core';

import chai = require('chai');
import 'mocha';
chai.should();

describe('MP4UploadScrapper', () => {
    const url = 'https://mp4upload.com/embed-4gwq9pacjqx3.html';
    it('should detect a valid url', () => {
         const scrapper = new MP4UploadScrapper();
         scrapper.isApplicable(url).should.be.true;
    });
    it('should scrap data from a test page', async () => {
        MP4UploadScrapper.DefaultOptions = {
            runnerOptions: {
                puppeteerConfig: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                }
            }
        };
        const scrap = await MP4UploadScrapper.scrap(url);
        scrap.should.have.property('success').that.is.a('boolean').and.that.is.true;
        scrap.should.have.property('data').that.is.an('object').and.that.is.not.undefined;
        const data = scrap.data as ISourceData;
        data.should.have.property('sources').that.is.an('array');
        data.sources.length.should.be.greaterThan(0);
        data.sources.forEach(h => h.should.have.property('url').that.is.a('string'));
    });
});
