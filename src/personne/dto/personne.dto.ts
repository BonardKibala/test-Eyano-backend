import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddPersonneDto {
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;
}

export class UpdatePersonneDto {
  @IsOptional()
  nom: string;

  @IsEmail()
  @IsOptional()
  prenom: string;
}

export class ChangePassword {
  @IsString()
  @IsNotEmpty()
  lastpassword: string;

  @IsString()
  @IsNotEmpty()
  newpassword: string;
}
