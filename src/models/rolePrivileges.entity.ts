import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { RoleMst } from './roleMst.entity';

@Table({ tableName: "RolePrivileges" })
export class RolePrivileges extends Model<RolePrivileges> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, })
    id: number;

    @ForeignKey(() => RoleMst)
    @Column({ type: DataType.INTEGER, })
    roleId: number;

    @Column({ type: DataType.STRING, })
    moduleName: string;

    @Column({ type: DataType.BOOLEAN, })
    isRead: boolean;

    @Column({ type: DataType.BOOLEAN, })
    isWrite: boolean;

    @Column({ type: DataType.BOOLEAN, })
    isDelete: boolean;

    @Column({ type: DataType.BOOLEAN, })
    isVisible: boolean;

    @Column({ type: DataType.DATE, })
    createdAt?: Date;

    @Column({ type: DataType.DATE, })
    updatedAt?: Date;
}
