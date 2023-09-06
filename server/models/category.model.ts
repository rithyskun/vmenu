import { defineMongooseModel } from '#nuxt/mongoose'

export const Category = defineMongooseModel({
  name: 'Category',
  schema: {
    categoryName: {
      type: 'string',
      required: true,
      unique: true,
    },
    categoryImage: {
      type: 'string',
      required: true,
    },
  },

})
