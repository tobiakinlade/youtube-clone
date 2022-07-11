import fs from 'fs'
import path from 'path'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

export const upload = ({ file, user_id }) => {
  const filePath = file.filePath
  const fileName = file.originalFilename

  return new Promise((resolve, reject) => {
    const content = fs.readFileSync(filePath)
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `post-${user_id}-${Math.floor(Math.random() * 10000)}-${Math.floor(
        Date.now() / 1000
      )}${path.extname(fileName)}`,
      Body: content,
    }

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data.Location)
    })
  })
}
