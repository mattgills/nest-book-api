import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ReadingsModule } from './readings/readings.module';
import { SessionsModule } from './sessions/sessions.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BooksModule,
    ReadingsModule,
    SessionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
