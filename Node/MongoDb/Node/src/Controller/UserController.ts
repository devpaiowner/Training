import UserModel from '../Model/UserModel';
import bcrypt from 'bcrypt';
import { Status, StatusCode, StatusMessage } from "../constants/HttpConstant";
import { MessageContant } from "../constants/Constant";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from 'express';
import { JWT_KEY } from '../config/config';
import jwt from 'jsonwebtoken';
import SessionModel from '../Model/SessionModel';
import path from 'path';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';

 const multer = require('multer');



export const getItems = async (req: any, res: any) => {
    try {
        const items = await UserModel.find();
        res.json(items);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    if (req?.body?.password != req?.body?.confirm_password) {
        return res.status(StatusCode?.HTTP_VALIDATION).json({
            status: Status?.STATUS_FALSE,
            message: MessageContant?.PASSWORD_NOT_MATCH,
            
        })
    }
    //name can not be blank
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(StatusCode?.HTTP_VALIDATION).json({
            status: Status?.STATUS_FALSE,
            message: MessageContant?.NAME_CANT_BLANK,
        });
    }

  // Additional validation to check if the "phone_number" field is not zero
  const phoneNumber = req.body.phone_number;

  if (!phoneNumber || phoneNumber.trim() === "" || parseInt(phoneNumber) === 0) {
      return res.status(StatusCode?.HTTP_VALIDATION).json({
          status: Status?.STATUS_FALSE,
          message:MessageContant?.PHONE_CANT_BE_ZERO,
      });
  }
  //Phone number must be a valid number between 7 and 15 digits.
  if (!phoneNumber || phoneNumber.trim() === "" || isNaN(phoneNumber) || phoneNumber.length < 7 || phoneNumber.length > 15) {
    return res.status(StatusCode?.HTTP_VALIDATION).json({
        status: Status?.STATUS_FALSE,
        message: MessageContant?.PHONE_VALIDATION,
    });
}
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(req.body.password)) {
        return res.status(StatusCode?.HTTP_VALIDATION).json({
            status: Status?.STATUS_FALSE,
            message: MessageContant?.PASSWORD_VALIDATION,
        });
    }
    const errors: any = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(StatusCode?.HTTP_VALIDATION).json({
            status: Status?.STATUS_FALSE,
            message: StatusMessage?.HTTP_VALIDATION,
            errors: errors.mapped()
        })
    }
    const checkEmail = req.body.email;
    const found = await UserModel.findOne({ email: checkEmail }).exec();
    // if found is not empty meaning a match was found
    if (found) {
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            message: MessageContant?.EMAIL_ALREADY_EXITS,
        });
    } else {

        try {
            const { email, password, phone_number, name, confirm_password, dob } = req.body;
            const dateOfBirth = new Date(dob);

            const hashPassword = await bcrypt.hash(password, 8);

            await UserModel.create({
                email,
                password: hashPassword,
                phone_number,
                name,
                confirm_password: hashPassword,
                dob: dateOfBirth

            }).then(async (create_res) => {
                if (create_res) {
                    return res.status(StatusCode?.HTTP_OK).json({
                        status: Status?.STATUS_TRUE,
                        message: StatusMessage?.HTTP_OK,
                        data: create_res
                    })
                } else {
                    return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                        status: Status?.STATUS_FALSE,
                        message: StatusMessage?.HTTP_BAD_REQUEST,
                        errors: "error.message"
                    })
                }
            }).catch((error: any) => {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: StatusMessage?.HTTP_BAD_REQUEST,
                    errors: error.message
                })
            })
        } catch (error: any) {
            return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
                status: Status?.STATUS_FALSE,
                message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
                errors: error.message
            })
        }
    }
}
export const SignIn = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(StatusCode?.HTTP_VALIDATION).json({
            status: Status?.STATUS_FALSE,
            message: StatusMessage?.HTTP_VALIDATION,
            errors: errors.mapped()
        })
    }
    const checkEmail = req.body.email;
    const found = await UserModel.findOne({ email: checkEmail }).exec();
    // if found is not empty meaning a match was found
    if (!found) {
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            message: MessageContant?.USER_NOT_FOUND,
        });
    } else {
        try {
            const { email, password } = req.body;
            await UserModel.findOne({ email }).then(async (create_res: any) => {
                const checkPassword = await bcrypt.compare(password, create_res?.password)
                if (checkPassword) {
                    const response = {
                        id: create_res?.id,
                        email: create_res?.email,
                    }
                    const token = jwt.sign(response, JWT_KEY, {})
                    await SessionModel.create({
                        Userid: create_res?.id,
                        token: token

                    })
                    return res.status(StatusCode?.HTTP_OK).json({
                        status: Status?.STATUS_TRUE,
                        message: StatusMessage?.HTTP_OK,
                        data: create_res,
                        token: token
                    })
                }
            }).catch((error: any) => {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: StatusMessage?.HTTP_BAD_REQUEST,
                    errors: error.message
                })
            })
        } catch (error: any) {
            return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
                status: Status?.STATUS_FALSE,
                message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
                errors: error.message
            })
        }
    }
}

export const DetailUser = async (req: Request, res: Response, next: NextFunction) => {
    const auth:any = AuthMiddleware(req, res, next)
    if(auth==true){
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(StatusCode?.HTTP_VALIDATION).json({
            status: Status?.STATUS_FALSE,
            message: StatusMessage?.HTTP_VALIDATION,
            errors: errors.mapped()
        })
    }
    const id = req.body.id;
    const found = await UserModel.findOne({ _id: id }).exec();
    // if found is not empty meaning a match was found
    // console.log("found", found);
    if (!found) {
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            message: MessageContant?.USER_NOT_FOUND,
        });
    } else {
        try {
            const { id } = req.body;
            await UserModel.findOne({ _id: id }).then(async (detail_res) => {
                if (detail_res) {
                    return res.status(StatusCode?.HTTP_OK).json({
                        status: Status?.STATUS_TRUE,
                        message: StatusMessage?.HTTP_OK,
                        data: detail_res
                    })
                }
            }).catch((error: any) => {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: StatusMessage?.HTTP_BAD_REQUEST,
                    errors: error.message
                })
            })
        } catch (error: any) {
            return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
                status: Status?.STATUS_FALSE,
                message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
                errors: error.message
            })
        }
    }
}
}
export const UpdateUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(StatusCode?.HTTP_VALIDATION).json({
            status: Status?.STATUS_FALSE,
            message: StatusMessage?.HTTP_VALIDATION,
            errors: errors.mapped()
        })
    }
    const id = req.body.id;
    const found = await UserModel.findOne({ _id: id }).exec();
    // if found is not empty meaning a match was found
    //console.log("found",found);
    if (!found) {
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            message: MessageContant?.USER_NOT_FOUND,
        });
    } else {
        try {
            const { id, email, password, phone_number, name ,profile_image} = req.body;
            const hashPassword = await bcrypt.hash(password, 8);
           
            // const storage = multer.diskStorage({
            //     destination: './uploads/', // Specify the destination folder for uploaded files
            //     filename: profile_image.fieldname + '-' + Date.now() + path.extname(profile_image.originalname)
            //     });
              
              // Initialize multer middleware
           
            await UserModel.findOneAndUpdate({ email, password: hashPassword, id, phone_number, name,profile_image}).then(async (update_res) => {
                
                if (update_res) {
                    return res.status(StatusCode?.HTTP_OK).json({
                        status: Status?.STATUS_TRUE,
                        message: StatusMessage?.HTTP_OK,
                        data: update_res
                    })
                }
            }).catch((error: any) => {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: StatusMessage?.HTTP_BAD_REQUEST,
                    errors: error.message
                })
            })
        } catch (error: any) {
            return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
                status: Status?.STATUS_FALSE,
                message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
                errors: error.message
            })
        }
    }
}
