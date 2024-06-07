import SessionModel from "../Model/SessionModel";

export const AuthMiddleware = async (req: any) => {
    const token = req?.headers['authorization'];
    if (!token) {
        return {
            status: false,
            message: "No token provided.",
            data: []
        }
    }

    try {
        const bearer = token?.split(' ').pop();
        const isToken = await SessionModel.find({ token: bearer });
        if (isToken?.length == 0) {
            return {
                status: false,
                message: 'Token has expired',
                data: []
            };

        } else {
            return true;
        }
    } catch (error: any) {
        if (error?.name === 'TokenExpiredError') {
            return {
                status: false,
                message: 'Token has expired',
                data: []
            };
        } else {
            return {
                status: false,
                message: 'Invalid Token',
                data: []
            };
        }
    }
}