import { z } from 'zod'

const params = {
  params: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
  }),
}

const payload = {
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a valid',
    }).email(),
    password: z.string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 characters minimun'),
    repeatPassword: z.string({
      required_error: 'Confirm password is required',
    }),
    status: z.boolean({
      required_error: 'Status is required',
    }).default(true),
    profileImage: z.string({
      required_error: 'Profile image is required',
    }).optional(),
  }).refine(data => data.password === data.repeatPassword, {
    message: 'Password do not match',
    path: ['repeatPassword'],
  }),
}

export const registerValidation = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a valid',
  }).email(),
  password: z.string({
    required_error: 'Password is required',
  }).min(6, 'Password too short - should be 6 characters minimun'),
  repeatPassword: z.string({
    required_error: 'Confirm password is required',
  }),
  status: z.boolean({
    required_error: 'Status is required',
  }).default(true),
  profileImage: z.string({
    required_error: 'Profile image is required',
  }).optional(),
}).refine(data => data.password === data.repeatPassword, {
  message: 'Password do not match',
  path: ['repeatPassword'],
})

export const deleteUserSchema = z.object({
  ...params,
})

export const updateUserSchema = z.object({
  ...params,
  ...payload,
})

export const createUserSchema = z.object({
  ...payload,
})

export const getUserSchema = z.object({
  ...params,
  ...payload,
})

export type CreateUserModel = Omit<z.infer <typeof createUserSchema>, 'body.repeatPassword'>

export type DeleteUserModel = z.infer<typeof deleteUserSchema>

export type UpdateUserModel = z.infer<typeof updateUserSchema>

export type GetUserModel = z.infer<typeof getUserSchema>
