import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AnimeModule } from './anime/anime.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Anime } from './anime/anime.entity';
import { Favorites } from './favorites/favorites.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'otaku',
        password: process.env.DB_PASS || 'otaku',
        database: process.env.DB_NAME || 'otakuplay',
        entities: [Anime, Favorites],
        synchronize: true,
        ssl: (process.env.DB_SSL || 'false') === 'true' ? { rejectUnauthorized: false } : false,
      }),
    }),
    AnimeModule,
    FavoritesModule,
  ],
})
export class AppModule {}
