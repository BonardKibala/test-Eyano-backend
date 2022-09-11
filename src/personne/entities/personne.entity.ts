import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personne')
export class PersonneEntity {
  @PrimaryGeneratedColumn('uuid')
  personneId: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;
}
