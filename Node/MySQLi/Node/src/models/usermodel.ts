import { Sequelize, AllowNull, PrimaryKey, Column, Table, Model, AutoIncrement} from "sequelize-typescript";

export interface User{
    id?: number | null
    name: string
    email: string
    password:string 
}

@Table({
    tableName:"user",
    timestamps: true
})
export default class UserModel extends Model implements User {
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(true)
    @Column
    name!: string;

    @AllowNull(false)
    @Column
    email!: string;
   
    @AllowNull(false)
    @Column
    password!:string

}
