import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator


enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}
export class CreateAuthDto {
    @ApiProperty() // Add ApiProperty decorator to add Swagger metadata
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    readonly gender: Gender;

    @ApiProperty()
    readonly city: string;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly state: string;
}
