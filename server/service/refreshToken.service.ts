import prisma from '~~/prisma/db'

export const createRefreshToken = (refreshToken: any) => {
  return prisma.refreshToken.create({
    data: refreshToken,
  })
}

export const getRefreshTokenByToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  })
}

export const removeRefreshToken = (token: string) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  })
}
