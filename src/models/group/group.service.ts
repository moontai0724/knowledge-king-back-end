import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupModelService {
  constructor(
    @InjectRepository(Group)
    private repository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.repository.find();
  }
}
