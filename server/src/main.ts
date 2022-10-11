import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;

  const app = await NestFactory.create(AppModule);

  const sessionRepository = new TypeormStore({
    cleanupLimit: 2,
    limitSubquery: false, // If using MariaDB.
    ttl: 86400,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(
    session({
      secret: COOKIE_SECRET, // move cookie secret to .env
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: sessionRepository,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);
}
bootstrap();
