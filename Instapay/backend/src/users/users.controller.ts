/* eslint-disable prettier/prettier */
// users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { LinkBankAccountDTO } from './dtos/linkBankAccount.dto';
import { UpdateUserProfileDto } from './dtos/updateUserProfile.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('linkBankAccount')
  async linkBankAccount(
    @Body() linkBankAccountDTO: LinkBankAccountDTO,
    @Req() req: Request,
  ) {
    const account = await this.usersService.linkBankAccount(
      linkBankAccountDTO,
      req.user,
    );
    return { message: 'Bank account linked successfully', account };
  }

  @Delete('unlinkBankAccount/:id')
  async unlinkBankAccount(
    @Param('id') bankAccountNumber: string,
    @Req() req: Request,
  ) {
    await this.usersService.unlinkBankAccount(bankAccountNumber, req.user);
    return { message: 'Bank account unlinked successfully' };
  }

  @Get('showBankAccounts')
  async showBankAccounts(@Req() req: Request) {
    const accounts = await this.usersService.showBankAccounts(req.user);
    return { message: 'Showing user bank accounts', accounts };
  }

  @Patch('updateProfile')
  async updateProfile(
    @Req() req: Request,
    @Body() updateData: UpdateUserProfileDto,
  ) {
    const updatedUser = await this.usersService.updateProfile(
      updateData,
      req.user,
    );
    return { message: 'Profile updated successfully', updatedUser };
  }


  @Get('status')
  async getProfile(@Req() req: Request) {
    const user = await this.usersService.getProfile(req.user);
    return { message: 'user profile returned succesfully', user };
  }

}
