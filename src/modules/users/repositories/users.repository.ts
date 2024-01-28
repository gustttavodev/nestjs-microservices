import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UsersRepository {
  private users: any = [];

  create(user: { name: string; email: string }) {
    const userData = {
      name: user.name,
      email: user.email,
      id: randomUUID(),
    };

    this.users.push(userData);

    return userData;
  }

  findAll() {
    return this.users;
  }

  updateUserById(id: string, data: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);

    for (const key in data) {
      user[key] = data[key];
    }

    return user;
  }

  deleteUserById(id: string) {
    const index = this.users.find((user) => user.id === id);

    this.users.splice(index, 1);
  }
}
