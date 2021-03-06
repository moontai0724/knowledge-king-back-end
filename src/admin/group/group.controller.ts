import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { Group } from '../../models/group/group.entity';
import { Role } from '../../models/user/user.entity';
import { GroupModelService } from '../../models/group/group.service';

@Roles(Role.ADMIN)
@Controller('admin/groups')
export class GroupController {
  constructor(private groupModelService: GroupModelService) {}

  @Roles(Role.USER)
  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupModelService.findAll();
  }

  @Roles(Role.USER)
  @Get(':id')
  async findOne(@Param('id') groupId: number): Promise<Group> {
    return this.groupModelService.findOne({ id: groupId });
  }
}
