import { v2 as cloudinary } from 'cloudinary'

const cloudinaryService = () => {
  const config = useRuntimeConfig()

  cloudinary.config({
    cloud_name: config.cloudinayCloudName,
    api_key: config.cloudinayApiKey,
    api_secret: config.cloudinayApiSecret,
  })

  return cloudinary
}

export const uploadToCloudinay = (image: any) => {
  return new Promise((resolve, reject) => {
    cloudinaryService().uploader.upload(image, (error: any, data: any) => {
      if (error)
        reject(error)
      resolve(data)
    })
  })
}
