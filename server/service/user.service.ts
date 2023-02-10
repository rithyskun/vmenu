import prisma from "~~/prisma/db";
import bcrypt from "bcrypt"

import { CreateUserModel } from "../schema/user.schema";

export const createUser = async (userData: CreateUserModel['body']) => {

    const finalData = {
        ...userData,
        password: bcrypt.hashSync((userData.password) , 10),
    }

    return await prisma.user.create({
        data: finalData,
    })
}

export const getUserByEmail = async (email: string) => {
    const userEmail = await prisma.user.findMany({
        where: {
            email: email,
            status: true
        },
        take: 1
    })
    return userEmail[0]
}

export const getUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}