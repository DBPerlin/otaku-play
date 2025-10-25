import { IsIn, IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import * as animeEntity from '../anime.entity';

export class CreateAnimeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsIn(['tv', 'movie', 'ova', 'ona', 'special'])
  type!: animeEntity.AnimeType;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  releaseYear!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  genre!: string;
}
