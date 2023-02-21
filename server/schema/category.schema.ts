import { z } from 'zod'

const params = {
  params: z.object({
    id: z.string({
      required_error: 'Category id is required',
    }),
  }),
}

const payload = {
  body: z.object({
    categoryName: z.string({
      required_error: 'Category is required',
    }).min(1, 'Password too short - should be 1 character minimun'),
    categoryImage: z.string({
      required_error: 'Image is required',
    }).optional(),
  }),
}

export const categoryValidation = z.object({
  categoryName: z.string({
    required_error: 'Category is required',
  }).min(2, 'Password too short - should be 1 character minimun'),
  categoryImage: z.string({
    required_error: 'Image is required',
  }),
})

export const deleteCategorySchema = z.object({
  ...params,
})

export const updateCategorySchema = z.object({
  ...params,
  ...payload,
})

export const createCategorySchema = z.object({
  ...payload,
})

export const getCategorySchema = z.object({
  ...params,
  ...payload,
})

export type CreateCategoryModel = z.infer <typeof createCategorySchema>

export type DeleteCategoryModel = z.infer<typeof deleteCategorySchema>

export type UpdateCategoryModel = z.infer<typeof updateCategorySchema>

export type GetCategoryModel = z.infer<typeof getCategorySchema>
