import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserParam } from '../models/user/user.class';
import { User } from '../models/user/user.entity';
import { UserModelService } from '../models/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userModelService: UserModelService) {}

  async register(userToCreate: CreateUserParam): Promise<User> {
    try {
      const existingUser = await this.userModelService.findOne([
        { email: userToCreate.email },
        { account: userToCreate.account },
      ]);

      const keys = ['email', 'account'];
      const conflictedAttributes = [];

      keys.forEach((key) => {
        if (existingUser[key] === userToCreate[key]) {
          conflictedAttributes.push(key + ' already exists');
        }
      });

      throw new ConflictException(conflictedAttributes);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
    }

    return this.userModelService.create(userToCreate);
  }
}
