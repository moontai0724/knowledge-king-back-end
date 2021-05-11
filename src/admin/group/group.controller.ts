import { Controller, Get, Param } from '@nestjs/common';
import { RequireRole } from '../../decorators/roles.decorator';
import { Group } from '../../models/group/group.entity';
import { Role } from '../../models/user/user.entity';
import { GroupModelService } from '../../models/group/group.service';

@RequireRole(Role.ADMIN)
@Controller('admin/groups')
export class GroupController {
  constructor(private groupModelService: GroupModelService) {}

  @RequireRole(Role.USER)
  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupModelService.findAll();
  }

  @RequireRole(Role.USER)
  @Get(':id')
  async findOne(@Param('id') groupId: number): Promise<Group> {
    return this.groupModelService.findOne({ id: groupId });
  }
}
