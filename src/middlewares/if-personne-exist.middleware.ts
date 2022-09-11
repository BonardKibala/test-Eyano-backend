import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AddPersonneDto } from 'src/personne/dto/personne.dto';
import { PersonneEntity } from 'src/personne/entities/personne.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class IfUserExistMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const personneDto: AddPersonneDto = req.body;

    const connection = getConnection();
    const user: PersonneEntity = await connection
      .getRepository(PersonneEntity)
      .findOne({ ...{ nom: personneDto.nom } });

    if (user)
      throw new ConflictException(
        'Ce nom est déjà utilisé par une autre personne',
      );

    next();
  }
}
