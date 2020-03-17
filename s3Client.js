const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: process.env.REGION});

module.exports = {
  upload (dataAsString, bucketName, fileName) {
    let body = Buffer.from(dataAsString);

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: body,
      ContentType: 'application/json',
      ContentLength: body.byteLength
    };
    console.log(params);
    return s3.upload(params).promise();
  },

  download (bucketName, fileName) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    console.log(params);
    return s3.getObject(params).promise();
  }
};
