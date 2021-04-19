import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionSchema } from './question.schema';

@Injectable()
export class QuestionModelService {
  constructor(
    @InjectRepository(QuestionSchema)
    private repository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.repository.find();
  }
}
