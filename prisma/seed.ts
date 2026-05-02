import "dotenv/config";
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true
  }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // 1. Superadmin
  await prisma.profile.upsert({
    where: { username: 'superadmin' },
    update: {},
    create: {
      id: 'superadmin-user-id',
      username: 'superadmin',
      displayName: 'Zenith Admin',
      role: 'superadmin',
      passwordHash: 'XTzNc7xinvj/voF+HMdMSvTpEN1Tfyfj7NXL2nQddKPz+gXva/cMsd3IUwjaCYmO' // admin123 (PBKDF2)
    }
  })

  // 2. Genres
  const genres = ['Action', 'Adventure', 'Fantasy', 'Sci-Fi', 'Supernatural', 'Comedy', 'Drama', 'Psychological']
  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: {
        name,
        slug: name.toLowerCase()
      }
    })
  }

  // 3. Anime
  const animeData = [
    {
      id: 'sl-s1',
      slug: 'solo-leveling-s1',
      title: 'Solo Leveling Season 1',
      synopsis: 'Sung Jinwoo, hunter terlemah, mendapatkan kemampuan unik untuk level up setelah insiden di double dungeon.',
      status: 'completed',
      type: 'TV',
      year: 2024,
      season: 'winter',
      totalEpisodes: 12,
      score: 8.7,
    },
    {
      id: 'jjk-s1',
      slug: 'jujutsu-kaisen-s1',
      title: 'Jujutsu Kaisen Season 1',
      synopsis: 'Yuji Itadori menjadi wadah Sukuna dan bergabung dengan Jujutsu High.',
      status: 'completed',
      type: 'TV',
      year: 2020,
      season: 'fall',
      totalEpisodes: 24,
      score: 8.6,
    }
  ]

  for (const data of animeData as any[]) {
    await prisma.anime.upsert({
      where: { slug: data.slug },
      update: data,
      create: data
    })
  }

  // 4. Episodes
  await prisma.episode.upsert({
    where: { animeId_episodeNumber: { animeId: 'sl-s1', episodeNumber: 1 } },
    update: {},
    create: {
      id: 'sl-s1-e1',
      animeId: 'sl-s1',
      episodeNumber: 1,
      title: 'Masa Depan Terlemah',
      synopsis: 'Jinwoo memasuki dungeon ganda yang misterius.',
      videoSources: {
        create: {
          id: 'sl-s1-e1-360p',
          quality: 'p360',
          format: 'mp4',
          r2Key: 'dummy',
          url: 'https://cdn.zenith.dyzulk.net.eu.org/anime/demo/episode/1/360p.mp4'
        }
      }
    }
  })

  // 5. Settings
  await prisma.siteSetting.upsert({
    where: { key: 'comment_system' },
    update: {},
    create: {
      key: 'comment_system',
      value: 'polling'
    }
  })

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
