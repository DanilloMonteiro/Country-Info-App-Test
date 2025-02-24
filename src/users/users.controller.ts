import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserEntity } from './entity/users.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return this.userService.findOne(id);
  }
}
