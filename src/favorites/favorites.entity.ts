import { Anime } from '../anime/anime.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userId', 'mediaId'])
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  userId!: string;

  @Column({ type: 'uuid' })
  mediaId!: string;

  @ManyToOne(() => Anime, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mediaId' })
  anime!: Anime;
}
