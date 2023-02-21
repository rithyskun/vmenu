import { v2 as _cloudinary } from 'cloudinary'

const cloudinary = () => {
  const config = useRuntimeConfig()

  _cloudinary.config({
    cloud_name: config.cloudinayCloudName,
    api_key: config.cloudinayApiKey,
    api_secret: config.cloudinayApiSecret,
  })

  return _cloudinary
}

export const uploadToCloudinay = (image: any) => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(image, (error: any, data: any) => {
      if (error)
        reject(error)

      resolve(data)
    })
  })
}
