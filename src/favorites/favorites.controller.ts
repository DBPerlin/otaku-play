import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('users/:userId/favorites')
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @Post()
  @HttpCode(204)
  async addFavorite(@Param('userId') userId: string, @Body('mediaId') mediaId: string) {
    if (!mediaId) throw new NotFoundException('mediaId is required');
    await this.service.addFavorite(userId, mediaId);
  }

  @Get()
  async listFavorites(@Param('userId') userId: string) {
    return this.service.listFavorites(userId);
  }

  @Delete(':mediaId')
  @HttpCode(204)
  async removeFavorite(@Param('userId') userId: string, @Param('mediaId') mediaId: string) {
    await this.service.removeFavorite(userId, mediaId);
  }
}
