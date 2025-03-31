import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/products.entity';
import { Category } from './categories/categories.entity';
import { CategoriesModule } from './categories/categories.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ScheduleModule } from '@nestjs/schedule';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
          user: 'huykhoanguyen0@gmail.com',
          pass: 'ryvoyahwfztecybw', 
        },
      },
      defaults: {
        from: '"nest-modules" <huykhoanguyen0@gmail.com>',
      },
      template: {
        dir: process.cwd() + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/Nest_JS'),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'khoahuy04102004',
      database: 'nestjs-demo-app',
      entities: [Product, Category],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ScheduleModule.forRoot(),
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, ChatGateway],
})
export class AppModule {}
