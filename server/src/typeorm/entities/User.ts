import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoList } from './TodoList';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList[];
}
