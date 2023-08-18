import { z } from 'zod'

const params = {
  params: z.object({
    id: z.string({
      required_error: 'Product name id is required',
    }),
  }),
}

const payload = {
  body: z.object({
    productName: z.string({
      required_error: 'Product name is required',
    }).min(2, 'Password too short - should be 2 character minimun'),
    productDescription: z.string({
      required_error: 'Product description is required',
    }).optional(),
    categoryId: z.string({
      required_error: 'Category is required',
    }),
    salePrice: z.number({
      required_error: 'Sale price is required',
    }),
    productImage: z.string({
      required_error: 'Product image is required',
    }).optional(),
    status: z.boolean({
      required_error: 'Status is required',
    }),
    feature: z.boolean({
      required_error: 'Feature is required',
    }),
    favorite: z.boolean({
      required_error: 'Favorite is required',
    }),
    promotion: z.boolean({
      required_error: 'Promotion is required',
    }),
  }),
}

export const productValidation = z.object({
  productName: z.string({
    required_error: 'Product name is required',
  }).min(2, 'Password too short - should be 2 character minimun'),
  productDescription: z.string({
    required_error: 'Product description is required',
  }).optional(),
  categoryId: z.string({
    required_error: 'Category is required',
  }),
  salePrice: z.number({
    required_error: 'Sale price is required',
  }),
  productImage: z.string({
    required_error: 'Product image is required',
  }).optional(),
  status: z.boolean({
    required_error: 'Status is required',
  }),
  feature: z.boolean({
    required_error: 'Feature is required',
  }),
  favorite: z.boolean({
    required_error: 'Favorite is required',
  }),
  promotion: z.boolean({
    required_error: 'Promotion is required',
  }),
})

export const deleteProductSchema = z.object({
  ...params,
})

export const updateProductSchema = z.object({
  ...params,
  ...payload,
})

export const createProductSchema = z.object({
  ...payload,
})

export const getProductSchema = z.object({
  ...params,
  ...payload,
})

export type CreateProductModel = z.infer <typeof createProductSchema>

export type DeleteProductModel = z.infer<typeof deleteProductSchema>

export type UpdateProductModel = z.infer<typeof updateProductSchema>

export type GetProductModel = z.infer<typeof getProductSchema>
