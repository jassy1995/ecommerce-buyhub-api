import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import logger from './lib/logger';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { createServer } from 'http';
// import { Server } from 'socket.io';
// import socket from './controllers/socket';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
// import passport from 'passport';
// import session from 'express-session';
// import './lib/passport';

process.env.TZ = 'Etc/UTC';

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error('DB_CONNECTION_STRING environment variable is not defined');
}

if (!process.env.PORT) {
  throw new Error('PORT environment variable is not defined');
}

const app = express();
const server = createServer(app);
// const io = new Server(server, {
//   cors: { origin: '*' },
// });

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => logger.info('Database connected'))
  .catch(e => logger.error(e));

const PORT = process.env.PORT || 2100;

// app.set('trust proxy', 2);

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    },
  })
);
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 500,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
// app.use(
//   session({
//     secret: 'something secretive',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 * 60 },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use(routes);

// socket(io);

app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

// const relax = async () => {
//   await mongoose.connection.close();
//   logger.info('💀 Db connection closed');
//   server.close(() => {
//     logger.info('💀 Server connection closed');
//     process.exit(0);
//   });
// };

// process.on('SIGTERM', relax);
// process.on('SIGINT', relax);

