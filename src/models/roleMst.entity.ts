import { Table, Column, Model, DataType } from 'sequelize-typescript';

enum Role {
    SuperAdmin = 'superAdmin',
    ServiceManager = 'serviceManager',
    Operator = 'operator',
    SM = 'sM',
    AccountsMgr = 'accountsMgr',
    ArtistManager = 'artistManager',
    User = 'user', // Added default role 'User'
}

@Table({ tableName: "RoleMst" })
export class RoleMst extends Model<RoleMst> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    // @Column({
    //     type: DataType.ENUM(...Object.values(Role)),
    //     allowNull: false,
    //     defaultValue: Role.User, // Set default value as 'User'
    //     unique: true,
    // })
    // name: Role;


    @Column({ unique: true, allowNull: false, })
    name: string;

    @Column
    createdAt?: Date;

    @Column
    updatedAt?: Date;
}
