import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const products = await prisma.product.findMany()
        return products;
    } catch (error: any) {
        console.error(error);
        throw new Error(error).message;
    }
});