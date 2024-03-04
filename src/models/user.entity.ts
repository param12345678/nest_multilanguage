import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: "User" })
export class User extends Model<User> {
    @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true, })
    id: bigint;

    @Column({ type: DataType.STRING, })
    fullName: string;

    @Column({ type: DataType.JSON, })
    gender: any;

    @Column({ type: DataType.DATE, })
    dob: Date;

    @Column({ type: DataType.STRING, unique: true, allowNull: false, })
    email: string;

    @Column({ type: DataType.STRING, })
    phone: string;

    @Column({ type: DataType.STRING, })
    password: string;

    @Column({ type: DataType.BOOLEAN, })
    status: boolean;

    @Column({ type: DataType.BOOLEAN, })
    isVerified: boolean;

    @Column({ type: DataType.STRING, })
    otpSent: string;

    @Column({ type: DataType.STRING, })
    deviceType: string;

    @Column({ type: DataType.STRING, })
    deviceToken: string;

    @Column({ type: DataType.INTEGER, })
    appVersion: number;

    @Column({ type: DataType.STRING, })
    bio: string;

    @Column({ type: DataType.STRING, })
    address: string;

    @Column({ type: DataType.STRING, })
    rashifal: string;

    @Column({ type: DataType.STRING, })
    profilPic: string;

    @Column({ type: DataType.STRING, })
    referalCode: string;

    @Column({ type: DataType.BIGINT, })
    referalUserId: bigint;

    @Column({ type: DataType.DATE, })
    createdAt?: Date;

    @Column({ type: DataType.DATE, })
    updatedAt?: Date;
}
