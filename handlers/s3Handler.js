const { S3Controller } = require('../controllers/s3Controller');

module.exports = {
  productlists: {
    upload: S3Controller.upload(process.env.PRODUCT_LISTS_BUCKET),
  }
};
