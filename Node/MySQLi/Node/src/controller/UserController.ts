import { NextFunction, Request, Response, RequestHandler } from "express";
import UserModel from "../models/usermodel"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/Config";

export const UserSignUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 8);
        const alreadyUser = await UserModel.findOne({ where: { email } })
        if (alreadyUser) {
            return res.status(400).json({
                statis: false,
                message: " Email already registered ",
                data: {}
            })
        }
        await UserModel.create({ email, password: hashpassword }).then(async (create_res: any) => {
            if (create_res) {
                return res.status(200).json({
                    statis: true,
                    message: " User sign up successfully ",
                    data: {}
                })
            }
        }).catch((err: any) => { 
            return res.status(400).json({
                status: true,
                message: "Something went wrong",
                error: err.message
            })
        })
    } catch (error: any) {
        return res.status(500).json({
            status: true,
            message: " Internal server error ",
            errors: error.message
        });
    }
}
export const UserSignIN: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        await UserModel.findOne({ where: { email } }).then(async (data_res: any) => {
            const validate_passowrd = await bcrypt.compare(password, data_res.password);
            console.log(validate_passowrd, "sigin");
            const response = {
                user_id: data_res?.id,
                email: data_res?.email
            }

            const token = await jwt.sign(response, JWT_KEY)
            if (validate_passowrd) {
                return res.status(200).json({
                    statis: true,
                    message: " User sign in successfully ",
                    data: data_res,
                    token:token
                })
            }
        }).catch((err: any) => {
            return res.status(400).json({
                status: true,
                message: "Something went wrong",
                error: err.message
            })
        })
    } catch (error: any) {
        return res.status(500).json({
            status: true,
            message: " Internal server error ",
            errors: error.message
        });
    }
}

export const UserList = async (req: any, res: any) => {
    try {
        await UserModel.findAll().then((data) => {
            return res.status(200).json({
                status: true,
                message: "User list get successfully",
                data: data
            })
        }).catch((err: any) => {
            return res.status(400).json({
                status: true,
                message: "Something went wrong",
                error: err.message
            })
        })
    } catch (error: any) {
        return res.status(500).json({
            status: true,
            message: "internal server error",
            error: error.message
        })
    }
}

export const UserCreate = async (req: any, res: any) => {
    const { name, email } = req.body;
    try {
        await UserModel.create({ name, email }).then((data) => {
            return res.status(200).json({
                status: true,
                message: "User create successfully",
                data: data
            })
        }).catch((err: any) => {
            return res.status(400).json({
                status: true,
                message: "something went wrong",
                error: err.message
            })
        })
    } catch (error: any) {
        return res.status(500).json({
            status: true,
            message: "internal server error",
            error: error.message
        })
    }
}
export const UserUpdate = async (req: any, res: any) => {
    const { name, email, id } = req.body;
    try {
        await UserModel.update({ name, email }, { where: { id: id } }).then((data) => {
            return res.status(200).json({
                status: true,
                message: "User update successfully",
                data: data
            })
        }).catch((err: any) => {
            return res.status(400).json({
                status: true,
                message: "something went wrong",
                error: err.message
            })
        })
    } catch (error: any) {
        return res.status(500).json({
            status: true,
            message: "internal server error",
            error: error.message
        })
    }
}

export const UserDelete = async (req: any, res: any) => {
    const { id } = req.body;
    try {
        await UserModel.destroy({ where: { id: id } }).then((data) => {
            return res.status(200).json({
                status: true,
                message: "User delete successfully",
                data: data
            })
        }).catch((err: any) => {
            return res.status(400).json({
                status: true,
                message: "something went wrong",
                error: err.message
            })
        })
    } catch (error: any) {
        return res.status(500).json({
            status: true,
            message: "internal server error",
            error: error.message
        })
    }
}