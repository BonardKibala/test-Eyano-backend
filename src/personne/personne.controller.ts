import { Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import { AddPersonneDto, UpdatePersonneDto } from './dto/personne.dto';
import { PersonneEntity } from './entities/personne.entity';
import { PersonneService } from './personne.service';

@Controller('personne')
export class PersonneController {
  constructor(private readonly personneService: PersonneService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAllUser(): Promise<PersonneEntity> {
    return await this.personneService.findAllUsers();
  }

  @Post('/register')
  async registerClient(@Body() userUserDto: AddPersonneDto): Promise<any> {
    return await this.personneService.registerUser(userUserDto);
  }

  @Get(':personneId')
  async getUserById(
    @Param('personneId') personneId: string,
  ): Promise<PersonneEntity> {
    return await this.personneService.getuserById(personneId);
  }

  @Patch(':personneId')
  async updateUser(
    @Body() updateUser: UpdatePersonneDto,
    @Param('personneId') personneId: string,
  ): Promise<PersonneEntity> {
    return await this.personneService.updateUser(personneId, updateUser);
  }

  @Delete(':personneId')
  async removeUser(@Param('personneId') personneId: string) {
    return await this.personneService.removeUser(personneId);
  }
}
