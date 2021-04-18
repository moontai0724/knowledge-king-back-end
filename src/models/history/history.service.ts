import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';

@Injectable()
export class HistoryModelService {
  constructor(
    @InjectRepository(History)
    private repository: Repository<History>,
  ) {}

  findAll(): Promise<History[]> {
    return this.repository.find();
  }
}
