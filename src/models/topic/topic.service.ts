import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';
import { TopicSchema } from './topic.schema';

@Injectable()
export class TopicModelService {
  constructor(
    @InjectRepository(TopicSchema)
    private repository: Repository<Topic>,
  ) {}

  findAll(): Promise<Topic[]> {
    return this.repository.find();
  }
}
