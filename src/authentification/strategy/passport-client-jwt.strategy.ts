import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PersonneEntity } from 'src/personne/entities/personne.entity';
import { Repository } from 'typeorm';
import { IPayload } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(PersonneEntity)
    private PersonneRepository: Repository<PersonneEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: IPayload) {
    const personne = await this.PersonneRepository.findOne({
      nom: payload.nom,
    });

    //Si le client exist, il est retourné dans la requette
    if (personne) {
      return personne;
    } else {
      throw new UnauthorizedException("Vous n'avez pas l'autorisation requis");
    }
  }
}
