import { Column, Model, Table, IsEmail, AllowNull, Comment, Default, Scopes, PrimaryKey, AutoIncrement, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { CommonConfig } from '../config/CommonConfig';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,

  getterMethods: {
  },
})

@Scopes(() => ({
  excludeData: {
    attributes: {
      exclude: ['password', 'updated_at', 'deleted_at']
    }
  },
  excludeDataOnly: {
    attributes: {
      exclude: ['updated_at', 'deleted_at']
    }
  },
}))

export class UserModel extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column({ type: DataType.STRING(100) })
  username: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING(150) })
  name: string;

  @IsEmail
  @AllowNull(true)
  @Column({ type: DataType.STRING(100) })
  email: string;

  @AllowNull(true)
  @Column({ type: 'datetime' })
  email_verified_at: Date;

  @AllowNull(true)
  @Comment('with + prefix')
  @Column({ type: DataType.STRING(5) })
  phone_country_code: any;

  @AllowNull(true)
  @Column({ type: DataType.STRING(16) })
  phone_number: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING(255) })
  password: string;

  @AllowNull(true)
  @Default(0)
  @Column({ type: DataType.TINYINT })
  status: any

  @AllowNull(true)
  @Column({ type: DataType.STRING(255) })
  social_id: string;

  @AllowNull(true)
  @Comment('APP, WEB, FACEBOOK, GOOGLE, APPLE')
  @Column({ type: DataType.STRING(32) })
  social_type: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING(255) })
  profile_pic: string;

  @AllowNull(true)
  @Default(1)
  @Column({ type: DataType.TINYINT })
  notification: any;
}