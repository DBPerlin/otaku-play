import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Favorites } from './favorites.entity';
import { Anime } from '../anime/anime.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let favoritesRepo: Repository<Favorites>;
  let animeRepo: Repository<Anime>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(Favorites),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Anime),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    favoritesRepo = module.get(getRepositoryToken(Favorites));
    animeRepo = module.get(getRepositoryToken(Anime));
  });

  describe('addFavorite', () => {
    it('deve adicionar um anime aos favoritos', async () => {
      const userId = 'user123';
      const mediaId = 'anime123';

      jest.spyOn(animeRepo, 'findOne').mockResolvedValue({ id: mediaId } as Anime);
      jest.spyOn(favoritesRepo, 'create').mockReturnValue({ userId, mediaId } as Favorites);
      jest.spyOn(favoritesRepo, 'save').mockResolvedValue({} as Favorites);

      await expect(service.addFavorite(userId, mediaId)).resolves.not.toThrow();
    });

    it('deve lançar erro se o anime não existir', async () => {
      jest.spyOn(animeRepo, 'findOne').mockResolvedValue(null);

      await expect(service.addFavorite('user123', 'anime404')).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeFavorite', () => {
    it('deve remover um favorito sem erro', async () => {
      jest.spyOn(favoritesRepo, 'delete').mockResolvedValue({ affected: 1 } as any);
      await expect(service.removeFavorite('user123', 'anime123')).resolves.not.toThrow();
    });
  });

  describe('listFavorites', () => {
    it('deve listar os animes favoritados', async () => {
      const favorites = [
        { userId: 'user123', anime: { title: 'Naruto' } },
        { userId: 'user123', anime: { title: 'Bleach' } },
      ] as Favorites[];

      jest.spyOn(favoritesRepo, 'find').mockResolvedValue(favorites);

      const result = await service.listFavorites('user123');
      expect(result).toEqual([{ title: 'Naruto' }, { title: 'Bleach' }]);
    });
  });
});
