import formidable from 'formidable'
import { uploadToCloudinay } from '~~/server/utils/cloudinary'

export default defineEventHandler(async (event) => {
  const form = formidable()

  const response: any = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err)
        reject(err)

      resolve({ fields, files })
    })
  })

  const { files } = response

  const filePromise = Object.keys(files).map(async (key) => {
    const file = files[key]
    return await uploadToCloudinay(file.filepath)
  })

  const fileURL: any = await Promise.all(filePromise)

  return {
    secure_url: fileURL[0].secure_url,
  }
})
