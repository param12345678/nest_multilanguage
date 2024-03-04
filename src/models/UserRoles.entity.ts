import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user.entity'; // Import the User model if it's in a separate file
import { RoleMst } from './roleMst.entity'; // Import the RoleMst model if it's in a separate file

@Table({ tableName: "UserRoles" })
export class UserRoles extends Model<UserRoles> {

    @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true, })
    Id: bigint;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT, })
    userId: bigint;

    @ForeignKey(() => RoleMst)
    @Column({ type: DataType.BIGINT, })
    roleId: bigint;

    @Column({ type: DataType.BIGINT, })
    templeId: bigint;
}
