import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Session } from './session.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) { }

  createOne(username: string, email: string, password: string) {
    const signup = this.userRepository.create({ username, email, password });
    return this.userRepository.save(signup);
  }

  sessionCreate(userid: string, token: string) {
    const session = this.sessionRepository.create({ userid, token });
    return this.sessionRepository.save(session);
  }

  async getOne(id: User['id']) {
    const signup = await this.userRepository.findOneBy({ id });
    if (!signup) throw new NotFoundException('Task not exist');
    return signup;
  }

  listAll() {
    return this.userRepository.find();
  }

  // async updateOne(
  //   id: User['id'],
  //   changes: Partial<Pick<User, 'username' | 'email' | 'password'>>,
  // ) {
  //   const task = await this.getOne(id);
  //   this.userRepository.merge(task, changes);
  //   return this.userRepository.save(task);
  // }

  async removeOne(id: User['id']) {
    const task = await this.getOne(id);
    await this.userRepository.delete({ id });
    return task;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
