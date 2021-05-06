import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneTopicParam } from './topic.class';
import { Topic } from './topic.entity';
import { TopicSchema } from './topic.schema';

@Injectable()
export class TopicModelService {
  constructor(
    @InjectRepository(TopicSchema)
    private repository: Repository<Topic>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return this.repository.find();
  }

  async findOne(
    where: FindOneTopicParam | FindOneTopicParam[],
  ): Promise<Topic> {
    return this.repository.findOneOrFail({
      where: where,
    });
  }

  async save(topic: Topic): Promise<Topic> {
    return this.repository.save(topic);
  }

  async remove(topic: Topic): Promise<Topic> {
    return this.repository.remove(topic);
  }
}
