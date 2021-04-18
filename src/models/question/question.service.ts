import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionModelService {
  constructor(
    @InjectRepository(Question)
    private repository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.repository.find();
  }
}
