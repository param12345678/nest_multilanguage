import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';

@Table
export class Profile extends Model<Profile> {
    @Column({
        type: DataType.STRING,
        allowNull: true, // Assuming it can be nullable
    })
    city: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    state: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
