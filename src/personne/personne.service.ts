import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { PersonneEntity } from './entities/personne.entity';
import { AddPersonneDto, UpdatePersonneDto } from './dto/personne.dto';

@Injectable()
export class PersonneService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(PersonneEntity)
    private personneRepository: Repository<PersonneEntity>,
  ) {}

  async findAllUsers(): Promise<any> {
    const personnes = await this.personneRepository.find();
    return {
      data: {
        total_pers: personnes.length,
        personnes,
      },
    };
  }

  //Enregistrement du client
  async registerUser(personneDto: AddPersonneDto): Promise<any> {
    const { nom, prenom } = personneDto;

    // création de l'objet user et client
    const personneData = { nom, prenom };
    const personne = this.personneRepository.create({ ...personneData });

    const finduser = await this.personneRepository.findOne({
      nom: personne.nom,
    });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    // Début de la transaction
    await queryRunner.startTransaction();

    try {
      // Enregistrement du user
      if (finduser) {
        return { error: "l'utilisateur existe déjà" };
      }
      await queryRunner.manager.save(personne);

      // Fin de la transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // Annulation des enregistrement en cas d'un echec
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
    return {
      personne,
      success: 'Enregistrement effectué avec succès',
    };
  }

  async getuserById(personeId: string): Promise<PersonneEntity> {
    return await this.personneRepository.findOne(personeId);
  }

  async updateUser(
    personneId: string,
    updatePersonne: UpdatePersonneDto,
  ): Promise<PersonneEntity> {
    const newUser = await this.personneRepository.preload({
      personneId,
      ...updatePersonne,
    });

    if (!newUser) {
      throw new NotFoundException({
        error: 'échec de modification',
      });
    }
    return this.personneRepository.save(newUser);
  }

  async removeUser(personeId: string) {
    const personneToRemove = await this.personneRepository.findOne(personeId);
    if (!personneToRemove) {
      throw new NotFoundException({
        error: `Erreur de suppression ou adresse non existante`,
      });
    }
    return await this.personneRepository.remove(personneToRemove);
  }
}
