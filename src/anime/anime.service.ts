import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anime } from './anime.entity';
import { CreateAnimeDto } from './dto/anime.dto';

@Injectable()
export class AnimeService {
  constructor(@InjectRepository(Anime) private repo: Repository<Anime>) {}

  create(dto: CreateAnimeDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Anime not found');
    return found;
  }
}
