import { Environment } from './env.validation';

export default () => ({
  environment: process.env.NODE_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    timezone: process.env.DATABASE_TIMEZONE,
  },
  log: {
    enabled: process.env.NODE_ENV !== Environment.Production,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
