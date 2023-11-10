const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config();

const app = express();
const port = 3000;

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('video'), (req, res) => {
  const { path, originalname } = req.file;


  ffmpeg(path)
    .videoCodec('libx264')
    .audioCodec('aac')
    .on('end', () => {
      // Upload the compressed video to S3
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `compressed/${originalname}`,
        Body: require('fs').createReadStream(`uploads/${originalname}.mp4`),
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error uploading to S3');
        }

     
        require('fs').unlinkSync(path);
        require('fs').unlinkSync(`uploads/${originalname}.mp4`);

        res.send(`Video compressed and uploaded to S3: ${data.Location}`);
      });
    })
    .save(`uploads/${originalname}.mp4`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
