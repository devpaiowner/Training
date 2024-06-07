import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Socket } from 'socket.io';
import { CommonConfig } from 'src/config/CommonConfig';
import { ChatModel } from 'src/models/chats.model';
import { UserModel } from 'src/models/users.model';
import { CatchErrorResponseHelper } from 'src/utils/ErrorHandler';

@Injectable()
export class ChatsService {

    connectedClients: any = [];

    async user_join(socket: Socket) {
        this.connectedClients.push({ socket_id: socket?.id, user_id: socket?.handshake?.query?.user_id });
        console.log("Active Users :", this.connectedClients);
    }

    async user_leave(socket: Socket) {
        this.connectedClients = this.connectedClients.filter((user: any) => user.socket_id !== socket?.id);
        console.log("Remaining Users :", this.connectedClients);
    }

    async get_other_user(id: any) {
        let other = this.connectedClients.find((user: any) => user?.user_id == id);
        return other;
    }

    async send_message(socket: Socket, payload: any) {
        try {
            const user_id = socket?.handshake?.query?.user_id;
            const { receiver_id } = payload;

            const otherUser = await this.get_other_user(receiver_id);

            console.log('payload------------------>', payload, user_id)
            socket.to(otherUser?.socket_id).emit('receive_message', 'Hello bro! you received this message.');

            // const chat = await ChatModel.findOne({
            //     where: {
            //         [Op.or]: [
            //             { sender_id: user_id, receiver_id: receiver_id },
            //             { user_id: receiver_id, sender_id: user_id }
            //         ]
            //     }
            // });

            // const chatExist = await ChatModel.findOne({
            //     where:{

            //     }
            // })
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error",
                error: error?.message
            }
        }
    }

    async all_users(socket: Socket, payload: any) {
        try {
            const { search } = payload;
            const user_id = socket?.handshake?.query?.user_id;
            const page = parseInt(payload.page) || CommonConfig?.PAGE;
            const pageSize = parseInt(payload.pageSize) || CommonConfig?.PAGE_SIZE;

            let whereJsone: any = {
                id: {
                    [Op.not]: user_id
                }
            }

            if (search && search !== undefined && search != '') {
                whereJsone = {
                    [Op.or]: [
                        { name: { [Op.like]: '%' + search + '%' } },
                        { username: { [Op.like]: '%' + search + '%' } }
                    ]
                }
            }
            const getAll = await UserModel.findAndCountAll({
                where: whereJsone,
                limit: pageSize,
                offset: (page) * pageSize,
                order: [['id', CommonConfig?.ORDER_DIRECTION]]
            });

            const data = {
                status: true,
                data: getAll,
            }
            socket.emit('get_all_users', data);
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error",
                error: error?.message
            }
        }
    }

    async add_friend(socket: Socket, payload: any) {
        try {
            const { receiver_id } = payload;
            const user_id = socket?.handshake?.query?.user_id;

            const createData = {
                sender_id: user_id,
                receiver_id: receiver_id
            }
            await ChatModel.create(createData);

            return {
                status: true,
                message: "Added successfully"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error",
                error: error?.message
            }
        }
    }

}
