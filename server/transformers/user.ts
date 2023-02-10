import { IUser } from '~~/types/types';

export const userTransformer = (user: IUser) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        status: user.status,
        isAdmin: user.isAdmin,
        role: user.role
    }
}