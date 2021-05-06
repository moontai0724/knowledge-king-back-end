import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneGroupParam } from './group.class';
import { Group } from './group.entity';
import { GroupSchema } from './group.schema';

@Injectable()
export class GroupModelService {
  constructor(
    @InjectRepository(GroupSchema)
    private repository: Repository<Group>,
  ) {}

  findAll(): Promise<Group[]> {
    return this.repository.find();
  }

  findOne(where: FindOneGroupParam | FindOneGroupParam[]): Promise<Group> {
    return this.repository.findOneOrFail({
      where: where,
    });
  }
}
