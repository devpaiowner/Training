import { Column, Model, Table, AllowNull, Default, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'chats',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})


export class ChatModel extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column
  sender_id: number;

  @AllowNull(true)
  @Column
  receiver_id: number;

  @AllowNull(true)
  @Default('SINGLE')
  @Column({ type: DataType.ENUM('SINGLE', 'GROUP') })
  type: string;

  @AllowNull(true)
  @Column
  group_id: number;

  @AllowNull(true)
  @Column
  last_message_id: number;
}