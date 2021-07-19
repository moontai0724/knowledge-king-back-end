import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Roles } from '../../decorators/roles.decorator';
import { GroupModelService } from '../../models/group/group.service';
import { Topic } from '../../models/topic/topic.entity';
import { TopicModelService } from '../../models/topic/topic.service';
import { Role } from '../../models/user/user.entity';
import { CreateTopicDto, PatchTopicDto } from './topic.class';

@Roles(Role.ADMIN)
@Controller('admin/topics')
export class TopicController {
  constructor(
    private topicModelService: TopicModelService,
    private groupModelService: GroupModelService,
  ) {}

  @Roles(Role.USER)
  @Get()
  async findAll(): Promise<Topic[]> {
    return this.topicModelService.findAll();
  }

  @Roles(Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Topic> {
    const target: Topic = await this.topicModelService
      .findOne({ id: id })
      .catch(() => null);
    if (!target)
      throw new NotFoundException('topic which you specific is not found');

    return target;
  }

  @Post()
  async create(@Body() createTopicParam: CreateTopicDto): Promise<Topic> {
    const topic: Topic = plainToClass(Topic, createTopicParam, {
      strategy: 'excludeAll',
    });
    if (createTopicParam.group_id)
      topic.group = await this.groupModelService
        .findOne({
          id: createTopicParam.group_id,
        })
        .catch(() => {
          throw new BadRequestException('Can not find any group with given id');
        });

    return this.topicModelService.save(topic);
  }

  @Patch(':id')
  async patchOne(
    @Param('id') id: number,
    @Body() patchTopicParam: PatchTopicDto,
  ): Promise<Topic> {
    const topic: Topic = await this.topicModelService.findOne({ id: id });
    plainToClassFromExist(topic, patchTopicParam, {
      strategy: 'excludeAll',
      exposeDefaultValues: true,
    });

    if (patchTopicParam.group_id)
      topic.group = await this.groupModelService.findOne({
        id: patchTopicParam.group_id,
      });

    return this.topicModelService.save(topic);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<Topic> {
    const target: Topic = await this.topicModelService
      .findOne({ id: id })
      .catch(() => null);
    if (!target)
      throw new NotFoundException('topic which you specific is not found');

    return await this.topicModelService.remove(target);
  }
}
