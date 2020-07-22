import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ReadingsModule } from './readings/readings.module';
import { SessionsModule } from './sessions/sessions.module';
import { SetUserInterceptor } from './shared/interceptors/set-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppendMetadataInterceptor } from './shared/interceptors/append-metadata.interceptor';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    BooksModule,
    ReadingsModule,
    SessionsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SetUserInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AppendMetadataInterceptor,
    }
  ],
})
export class AppModule {}
