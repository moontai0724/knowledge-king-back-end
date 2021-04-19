import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserSchema } from './user.schema';

@Injectable()
export class UserModelService {
  constructor(
    @InjectRepository(UserSchema)
    private repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
