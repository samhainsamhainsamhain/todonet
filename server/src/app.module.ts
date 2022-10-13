import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodosModule } from './todos/todos.module';

import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

import { User } from './typeorm/entities/User';
import { TodoList } from './typeorm/entities/TodoList';
import { Todos } from './typeorm/entities/Todo';
import { Session } from './typeorm/entities/Session';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TodoListModule,
    TodosModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'todonet_mysql',
      entities: [User, TodoList, Todos, Session],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
