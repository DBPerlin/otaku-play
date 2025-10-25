import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type AnimeType = 'tv' | 'movie' | 'ova' | 'ona' | 'special';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar' })
  type!: AnimeType;

  @Column({ type: 'int' })
  releaseYear!: number;

  @Column({ length: 200 })
  genre!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
