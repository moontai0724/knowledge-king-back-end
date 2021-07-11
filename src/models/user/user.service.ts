import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClassFromExist } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  CreateUserParam,
  SearchOneUserParam,
  UpdateUserParam,
} from './user.class';
import { User } from './user.entity';
import { UserSchema } from './user.schema';

@Injectable()
export class UserModelService {
  constructor(
    @InjectRepository(UserSchema)
    private repository: Repository<User>,
  ) {}

  create(params: CreateUserParam): Promise<User> {
    const user = new User(params);
    user.password = bcrypt.hashSync(user.password, 5);
    return this.repository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repository.find({
      relations: [
        'histories',
        'histories.details',
        'histories.details.question',
      ],
    });
  }

  findOne(params: SearchOneUserParam | SearchOneUserParam[]): Promise<User> {
    return this.repository.findOneOrFail({
      where: params,
    });
  }

  update(user: User, params: UpdateUserParam): Promise<User> {
    plainToClassFromExist(user, params, {
      strategy: 'excludeAll',
      exposeDefaultValues: true,
    });
    if (params.password) user.password = bcrypt.hashSync(user.password, 5);
    return this.repository.save(user);
  }

  async remove(user: User): Promise<User> {
    return this.repository.remove(user);
  }
}
