import { Column, Model, Table, AllowNull, Default, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'groups',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
})


export class GroupModel extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column
  chat_id: number;

  @AllowNull(true)
  @Column({ type: DataType.TEXT() })
  message: string;

  @AllowNull(true)
  @Default('TEXT')
  @Column({ type: DataType.ENUM('TEXT', 'IMAGE', 'VIDEO', 'FILE', 'AUDIO', 'LOCATION') })
  type: string;

  @AllowNull(true)
  @Column
  url: string;
}