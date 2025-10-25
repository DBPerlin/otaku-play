import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AnimeModule } from '../anime/anime.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites]), AnimeModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
