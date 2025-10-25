import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import { Anime } from '../anime/anime.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites) private readonly repo: Repository<Favorites>,
    @InjectRepository(Anime) private readonly animeRepo: Repository<Anime>,
  ) {}

  async addFavorite(userId: string, mediaId: string) {
    const anime = await this.animeRepo.findOne({ where: { id: mediaId } });
    if (!anime) throw new NotFoundException('Anime not found');

    const favorite = this.repo.create({ userId, mediaId });
    await this.repo.save(favorite);
  }

  async listFavorites(userId: string) {
    const favorites = await this.repo.find({ where: { userId } });
    return favorites.map((fav) => fav.anime);
  }

  async removeFavorite(userId: string, mediaId: string) {
    await this.repo.delete({ userId, mediaId });
  }
}
