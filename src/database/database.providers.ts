// Assuming databaseConfig.development is an object containing database configuration

import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from 'src/models/user.entity';
import { Profile } from 'src/models/profile.entity';

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config: any;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case TEST:
                    config = databaseConfig.test;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }



            const sequelize = new Sequelize(config);
            sequelize.addModels([User, Profile]);
            // await sequelize.sync();
            return sequelize;
        },
    },
];
