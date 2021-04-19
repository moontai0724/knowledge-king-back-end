import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryDetail } from './history-detail.entity';
import { HistoryDetailSchema } from './history-detail.schema';

@Injectable()
export class HistoryDetailModelService {
  constructor(
    @InjectRepository(HistoryDetailSchema)
    private repository: Repository<HistoryDetail>,
  ) {}

  findAll(): Promise<HistoryDetail[]> {
    return this.repository.find();
  }
}
