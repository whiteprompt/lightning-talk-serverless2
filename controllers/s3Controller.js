const Auth = require('../auth');
const s3Client = require('../s3Client');
const parse = require('csv-parse/lib/sync');

class S3Controller {
  static download (bucketName, fileName) {
    try {
      return s3Client.download(bucketName, fileName);
    } catch (error) {
      console.log(error);
    }
  }

  static upload (bucketName, callback) {
    return async event => {
      let statusCode;
      let body;
      const token = Auth.getToken(event);

      try {
        await Auth.verify(token);
        const CSVParsedAsJson = parse(event.body, {headers: true, delimiter: ';', columns: true});
        const stringifiedCSVAsJSON = JSON.stringify(CSVParsedAsJson);
        const now = new Date();
        const timestamp = now.getTime();

        await s3Client.upload(event.body, bucketName, `${timestamp}.csv`);
        await s3Client.upload(stringifiedCSVAsJSON, bucketName, `${timestamp}.json`);

        statusCode = 201;
        body = JSON.stringify({ok: true, data: CSVParsedAsJson}, null, 2);

        if (typeof callback === 'function') {
          callback(stringifiedCSVAsJSON);
        }
      } catch (e) {
        console.log(e);
        statusCode = 500;
        body = JSON.stringify({ok: false, error: e}, null, 2)
      }

      return {statusCode, body};
    }
  }
}

module.exports.S3Controller = S3Controller;
