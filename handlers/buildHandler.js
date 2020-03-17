const AWS = require('aws-sdk');

module.exports = {
  productlists: {
    build: (event, context, callback) => {
      context.callbackWaitsForEmptyEventLoop = false;
      const CB = new AWS.CodeBuild({
        region: process.env.REGION
      });
      const key = event.Records[0].s3.object.key;
      const bucket = event.Records[0].s3.bucket.name;
      const buildParams = {
        projectName: process.env.BUILD_PROJECT_ID,
        environmentVariablesOverride: [
          {
            name: 'PRODUCTLISTS_BUCKET_URI',
            value: `s3://${bucket}`,
            type: 'PLAINTEXT'
          },
          {
            name: 'DATA_FILE_NAME',
            value: key,
            type: 'PLAINTEXT'
          }
        ],
        sourceVersion: process.env.BUILD_SOURCE_VERSION
      };

      console.log("=====================================");
      console.log(JSON.stringify(event.Records));
      console.log(buildParams);

      CB.startBuild(buildParams, (err, data) => {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(err, data);
        callback(err, data);
      });
    }
  }
};
