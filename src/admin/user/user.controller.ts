import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { RequireRole } from '../../decorators/roles.decorator';
import { CreateUserParam, UserPublicOwn } from '../../models/user/user.class';
import { Role, User } from '../../models/user/user.entity';
import { UserModelService } from '../../models/user/user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@RequireRole(Role.ADMIN)
@Controller('admin/users')
export class UserController {
  constructor(
    private userModelService: UserModelService,
    private authService: AuthService,
  ) {}

  @RequireRole(Role.AUDITOR)
  @Get()
  async findAll(): Promise<UserPublicOwn[]> {
    const users = await this.userModelService.findAll();
    return users.map((user) => new UserPublicOwn(user));
  }

  @RequireRole(Role.AUDITOR)
  @Get(':id')
  async findOne(@Param('id') userId: number): Promise<UserPublicOwn> {
    const user = await this.userModelService.findOne({
      id: userId,
    });
    return new UserPublicOwn(user);
  }

  @Post()
  async create(@Body() registerDto: CreateUserDto): Promise<UserPublicOwn> {
    const userToCreate: CreateUserParam = new CreateUserParam(registerDto);
    userToCreate.account = userToCreate.account.toLowerCase();
    userToCreate.email = userToCreate.email.toLowerCase();

    const user: User = await this.authService.register(userToCreate);
    return new UserPublicOwn(user);
  }

  @Patch(':id')
  async patchOne(
    @Param('id') id: number,
    @Body() patchUserParam: UpdateUserDto,
  ): Promise<UserPublicOwn> {
    const user: User = await this.userModelService.findOne({ id: id });

    return this.userModelService
      .update(user, patchUserParam)
      .catch(() => {
        throw new BadRequestException('email or account may already exists.');
      })
      .then((user) => new UserPublicOwn(user));
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<UserPublicOwn> {
    const target: User = await this.userModelService
      .findOne({ id: id })
      .catch(() => null);
    if (!target)
      throw new NotFoundException('user which you specific is not found');

    return this.userModelService
      .remove(target)
      .then((user) => new UserPublicOwn(user));
  }
}
