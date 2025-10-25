import { Test, TestingModule } from '@nestjs/testing';
import { AnimeService } from './anime.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Anime } from './anime.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateAnimeDto } from './dto/anime.dto';

describe('AnimeService', () => {
  let service: AnimeService;
  let repo: Repository<Anime>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimeService,
        {
          provide: getRepositoryToken(Anime),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AnimeService>(AnimeService);
    repo = module.get(getRepositoryToken(Anime));
  });

  describe('create', () => {
    it('deve criar um novo anime', async () => {
      const dto: CreateAnimeDto = {
        title: 'Naruto',
        description: 'Um ninja busca se tornar Hokage',
        type: 'tv',
        releaseYear: 2002,
        genre: 'Ação',
      };

      const savedAnime = { id: 'uuid', ...dto } as Anime;

      jest.spyOn(repo, 'create').mockReturnValue(savedAnime);
      jest.spyOn(repo, 'save').mockResolvedValue(savedAnime);

      const result = await service.create(dto);
      expect(result).toEqual(savedAnime);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(savedAnime);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os animes ordenados por createdAt DESC', async () => {
      const mockAnimes = [
        { id: '1', title: 'Bleach' },
        { id: '2', title: 'Naruto' },
      ] as Anime[];

      jest.spyOn(repo, 'find').mockResolvedValue(mockAnimes);

      const result = await service.findAll();
      expect(result).toEqual(mockAnimes);
      expect(repo.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
    });
  });

  describe('findOne', () => {
    it('deve retornar o anime quando encontrado', async () => {
      const anime = { id: 'uuid', title: 'One Piece' } as Anime;
      jest.spyOn(repo, 'findOne').mockResolvedValue(anime);

      const result = await service.findOne('uuid');
      expect(result).toEqual(anime);
    });

    it('deve lançar erro se o anime não for encontrado', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne('nao-existe')).rejects.toThrow(NotFoundException);
    });
  });
});
