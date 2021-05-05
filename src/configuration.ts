import { Environment } from './env.validation';

export default () => ({
  environment: process.env.NODE_ENV,
  host: process.env.HOST,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    timezone: process.env.DATABASE_TIMEZONE,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    tls: Boolean(process.env.MAIL_TLS_ENABLED),
  },
  log: {
    enabled: process.env.NODE_ENV !== Environment.Production,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
