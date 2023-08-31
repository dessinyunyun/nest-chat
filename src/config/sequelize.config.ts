export const sequelizeConfig = {
  dialect: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  // models: [],
  autoLoadModels: true,
};
