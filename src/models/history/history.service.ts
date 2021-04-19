import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';
import { HistorySchema } from './history.schema';

@Injectable()
export class HistoryModelService {
  constructor(
    @InjectRepository(HistorySchema)
    private repository: Repository<History>,
  ) {}

  findAll(): Promise<History[]> {
    return this.repository.find();
  }
}
