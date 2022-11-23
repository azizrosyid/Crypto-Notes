import AWS from "aws-sdk";
import fs from "fs";

const s3 = new AWS.S3({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

export const uploadS3 = async ({ data, fileName, folder }) => {
  const params = {
    Bucket: process.env.DO_SPACES_NAME,
    Key: `encrypted_file/${fileName}`,
    Body: data,
    ACL: "public-read",
  };
  const result = await s3.upload(params).promise();
  return result.Location;
};

export const readFileS3 = async (key) => {
  const params = {
    Bucket: process.env.DO_SPACES_NAME,
    Key: "encrypted_file/" + key,
  };
  const result = await s3.getObject(params).promise();
  return result.Body.toString();
};
