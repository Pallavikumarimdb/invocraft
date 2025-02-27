import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express'; // ✅ Use default import

// Add these imports
import * as tsconfig from '../tsconfig.json';
import * as tsConfigPaths from 'tsconfig-paths';

async function bootstrap() {
  const baseUrl = './dist';
  tsConfigPaths.register({
    baseUrl,
    paths: tsconfig.compilerOptions.paths || {},
  });
  const server = express(); // ✅ No more import issues
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server)); // ✅ Ensures Express is used

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT ?? 3001;
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
