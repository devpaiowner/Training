import { MessageContant } from "../constants/Constant";
import bcrypt from 'bcrypt';
import { JWT_KEY } from '../config/config';
import jwt from 'jsonwebtoken';
import SessionModel from "../Model/SessionModel";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";
const UserModel = require('../Model/UserModel');

export const authResolvers = {
    Query: {
        Users: async () => {
            try {
                const UserDetails = await UserModel.find();
                return UserDetails;
            } catch (error) {
                throw error;
            }
        },
    },
    Mutation: {
        updateUser: async (_: any, { _id, ...args }: any, context: any) => {
            console.log('context', context?.headers);
            const tokenVerify:any = await AuthMiddleware(context)
            console.log('tokenVerify',tokenVerify);
            if(tokenVerify?.status){
                const updatedUser = await UserModel.findOneAndUpdate({ _id }, { $set: args }, { new: true });
                return updatedUser;
            }else{
                throw new Error(tokenVerify?.message);
            }
        },

        removeUser: async (_: any, args: any) => {
            try {
                await UserModel.deleteOne({ _id: args?._id });
                throw new Error(MessageContant?.ACCOUNT_DELETED_SUCCESS)
            } catch (error: any) {
                throw error;
            }
        },

        // Login Start
        login: async (_: any, args: any) => {
            const { email, password } = args;
            const user = await UserModel.findOne({ email: email }).exec();
            if (!user) {
                throw new Error(MessageContant?.USER_NOT_FOUND);
            } else {
                const checkPassword = await bcrypt.compare(password, user?.password)
                if (checkPassword) {
                    const response = {
                        id: user?._id,
                        email: user?.email,
                    }
                    const token = jwt.sign(response, JWT_KEY, {})
                    await SessionModel.create({
                        Userid: user?.id,
                        token: token
                    })
                    return { user, token };
                } else {
                    throw new Error(MessageContant?.PASSWORD_NOT_MATCH);
                }
            }
        },
        // Login End

        // SignUp Start
        signup: async (_: any, args: any) => {
            const existingUser = await UserModel.findOne({ email: args.email }).exec();
            if (existingUser) {
                throw new Error(MessageContant?.EMAIL_ALREADY_EXITS);
            }
            try {
                const { email, password, username } = args;
                const hashPassword = await bcrypt.hash(password, 8);
                const user = await UserModel.create({
                    email,
                    password: hashPassword,
                    username,
                });
                return user;
            } catch (error: any) {
                throw error;
            }
        },
        // SignUp End

    },
};
