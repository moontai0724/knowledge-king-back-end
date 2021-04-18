import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';

@Injectable()
export class TopicModelService {
  constructor(
    @InjectRepository(Topic)
    private repository: Repository<Topic>,
  ) {}

  findAll(): Promise<Topic[]> {
    return this.repository.find();
  }
}
