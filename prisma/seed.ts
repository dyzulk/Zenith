import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import { hashPassword } from '../server/utils/crypto'

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Cleaning up existing data...')
  // Order matters due to foreign keys. Since we map everything, we just delete everything
  await prisma.watchHistory.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.bookmark.deleteMany()
  await prisma.videoSource.deleteMany()
  await prisma.subtitle.deleteMany()
  await prisma.episode.deleteMany()
  await prisma.animeGenre.deleteMany()
  await prisma.genre.deleteMany()
  await prisma.anime.deleteMany()
  await prisma.profile.deleteMany()

  await prisma.siteSetting.deleteMany()
  
  // Dynamic Enum Tables
  await prisma.role.deleteMany()
  await prisma.animeStatus.deleteMany()
  await prisma.animeType.deleteMany()
  await prisma.season.deleteMany()
  await prisma.videoQuality.deleteMany()
  await prisma.videoFormat.deleteMany()
  await prisma.bookmarkStatus.deleteMany()

  console.log('Seeding Dynamic Enums (Tables)...')
  
  // Roles
  await prisma.role.createMany({
    data: [
      { id: 'superadmin', name: 'Super Administrator', description: 'Has access to everything' },
      { id: 'admin', name: 'Administrator', description: 'Can manage content and users' },
      { id: 'editor', name: 'Editor', description: 'Can manage content only' },
      { id: 'user', name: 'Member', description: 'Regular member' },
    ]
  })

  // Anime Statuses
  await prisma.animeStatus.createMany({
    data: [
      { id: 'ongoing', name: 'Ongoing', color: 'primary' },
      { id: 'completed', name: 'Completed', color: 'success' },
      { id: 'upcoming', name: 'Upcoming', color: 'info' },
      { id: 'hiatus', name: 'Hiatus', color: 'warning' },
    ]
  })

  // Anime Types
  await prisma.animeType.createMany({
    data: [
      { id: 'TV', name: 'TV Series' },
      { id: 'Movie', name: 'Movie' },
      { id: 'OVA', name: 'OVA' },
      { id: 'ONA', name: 'ONA' },
      { id: 'Special', name: 'Special' },
    ]
  })

  // Seasons
  await prisma.season.createMany({
    data: [
      { id: 'winter', name: 'Winter' },
      { id: 'spring', name: 'Spring' },
      { id: 'summer', name: 'Summer' },
      { id: 'fall', name: 'Fall' },
    ]
  })

  // Video Qualities
  await prisma.videoQuality.createMany({
    data: [
      { id: '360p', name: '360p' },
      { id: '480p', name: '480p' },
      { id: '720p', name: '720p HD' },
      { id: '1080p', name: '1080p FHD' },
    ]
  })

  // Video Formats
  await prisma.videoFormat.createMany({
    data: [
      { id: 'hls', name: 'HLS (.m3u8)' },
      { id: 'mp4', name: 'MP4 (.mp4)' },
      { id: 'dash', name: 'DASH (.mpd)' },
    ]
  })

  // Bookmark Statuses
  await prisma.bookmarkStatus.createMany({
    data: [
      { id: 'watching', name: 'Watching', color: 'primary' },
      { id: 'completed', name: 'Completed', color: 'success' },
      { id: 'plan', name: 'Plan to Watch', color: 'gray' },
      { id: 'dropped', name: 'Dropped', color: 'red' },
    ]
  })

  // Genres
  const genres = [
    { name: 'Action', slug: 'action' },
    { name: 'Adventure', slug: 'adventure' },
    { name: 'Comedy', slug: 'comedy' },
    { name: 'Drama', slug: 'drama' },
    { name: 'Fantasy', slug: 'fantasy' },
    { name: 'Isekai', slug: 'isekai' },
    { name: 'Romance', slug: 'romance' },
    { name: 'Sci-Fi', slug: 'sci-fi' },
    { name: 'Shounen', slug: 'shounen' },
    { name: 'Slice of Life', slug: 'slice-of-life' }
  ]
  
  for (const g of genres) {
    await prisma.genre.create({ data: g })
  }

  console.log('Seeding Superadmin User...')
  const passwordHash = await hashPassword('password123')
  const superadmin = await prisma.profile.create({
    data: {
      id: crypto.randomUUID(),
      username: 'admin',
      displayName: 'System Admin',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1',
      roleId: 'superadmin',
      passwordHash: passwordHash
    }
  })

  console.log('Seeding 3 Completed Animes...')
  const completedAnimes = [
    { slug: 'solo-leveling', title: 'Solo Leveling', epCount: 12 },
    { slug: 'frieren', title: 'Frieren: Beyond Journey\'s End', epCount: 28 },
    { slug: 'jujutsu-kaisen-s2', title: 'Jujutsu Kaisen Season 2', epCount: 23 }
  ]

  for (const a of completedAnimes) {
    const animeId = crypto.randomUUID()
    await prisma.anime.create({
      data: {
        id: animeId,
        slug: a.slug,
        title: a.title,
        synopsis: `${a.title} is an amazing anime full of action and adventure. This is a dummy synopsis for the completed series.`,
        statusId: 'completed',
        typeId: 'TV',
        rating: 'R-17',
        score: 9.0,
        year: 2024,
        seasonId: 'winter',
        posterKey: `https://via.placeholder.com/300x450?text=${encodeURIComponent(a.title)}`,
        bannerKey: `https://via.placeholder.com/1200x400?text=${encodeURIComponent(a.title)}`,
        totalEpisodes: a.epCount,
        genres: {
          create: [
            { genre: { connect: { slug: 'action' } } },
            { genre: { connect: { slug: 'fantasy' } } }
          ]
        }
      }
    })

    // Seed Episodes
    for (let i = 1; i <= a.epCount; i++) {
      const epId = crypto.randomUUID()
      await prisma.episode.create({
        data: {
          id: epId,
          animeId: animeId,
          episodeNumber: i,
          title: `Episode ${i}`,
          durationSeconds: 1420, // 23 mins
          thumbnailKey: `https://via.placeholder.com/640x360?text=Ep+${i}`,
          airedAt: new Date(Date.now() - i * 86400000),
          viewCount: Math.floor(Math.random() * 10000),
          videoSources: {
            create: [
              {
                id: crypto.randomUUID(),
                qualityId: '1080p',
                formatId: 'hls',
                r2Key: `dummy/video_${epId}.m3u8`,
                url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
                isPrimary: true
              }
            ]
          },
          comments: {
            create: [
              {
                id: crypto.randomUUID(),
                userId: superadmin.id,
                body: `This is an amazing episode ${i}! Can't wait for the next one.`,
                isSpoiler: false
              }
            ]
          }
        }
      })
    }
  }

  console.log('Seeding 2 Ongoing Animes...')
  const ongoingAnimes = [
    { slug: 'one-piece', title: 'One Piece', epCount: 1100 },
    { slug: 'ninja-kamui', title: 'Ninja Kamui', epCount: 5 }
  ]

  for (const a of ongoingAnimes) {
    const animeId = crypto.randomUUID()
    await prisma.anime.create({
      data: {
        id: animeId,
        slug: a.slug,
        title: a.title,
        synopsis: `Follow the ongoing journey of ${a.title}. Currently airing every week.`,
        statusId: 'ongoing',
        typeId: 'TV',
        rating: 'PG-13',
        score: 8.5,
        year: 2024,
        seasonId: 'spring',
        posterKey: `https://via.placeholder.com/300x450?text=${encodeURIComponent(a.title)}`,
        bannerKey: `https://via.placeholder.com/1200x400?text=${encodeURIComponent(a.title)}`,
        totalEpisodes: 24, // planned
        genres: {
          create: [
            { genre: { connect: { slug: 'adventure' } } },
            { genre: { connect: { slug: 'shounen' } } }
          ]
        }
      }
    })

    // Seed some aired episodes
    for (let i = 1; i <= a.epCount; i++) {
      const epId = crypto.randomUUID()
      await prisma.episode.create({
        data: {
          id: epId,
          animeId: animeId,
          episodeNumber: i,
          title: `Episode ${i}`,
          durationSeconds: 1420,
          thumbnailKey: `https://via.placeholder.com/640x360?text=Ep+${i}`,
          airedAt: new Date(),
          viewCount: Math.floor(Math.random() * 5000),
          videoSources: {
            create: [
              {
                id: crypto.randomUUID(),
                qualityId: '720p',
                formatId: 'mp4',
                r2Key: `dummy/video_${epId}.mp4`,
                url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                isPrimary: true
              }
            ]
          }
        }
      })
    }
  }

  console.log('Seeding 1 Upcoming Anime...')
  await prisma.anime.create({
    data: {
      id: crypto.randomUUID(),
      slug: 'chainsaw-man-movie',
      title: 'Chainsaw Man - The Movie: Reze Arc',
      synopsis: 'The upcoming blockbuster movie for Chainsaw Man, covering the explosive Reze arc.',
      statusId: 'upcoming',
      typeId: 'Movie',
      rating: 'R-17',
      score: 0,
      year: 2025,
      seasonId: 'summer',
      posterKey: `https://via.placeholder.com/300x450?text=CSM+Movie`,
      bannerKey: `https://via.placeholder.com/1200x400?text=CSM+Movie`,
      totalEpisodes: 1,
      genres: {
        create: [
          { genre: { connect: { slug: 'action' } } },
          { genre: { connect: { slug: 'drama' } } }
        ]
      }
    }
  })

  console.log('Seeding Site Settings...')
  await prisma.siteSetting.createMany({
    data: [
      { key: 'site_name', value: 'ZenithStream' },
      { key: 'site_description', value: 'Premium Anime Streaming Platform' },
      { key: 'theme_color', value: '#3b82f6' }
    ]
  })

  console.log('✅ Super Seeder Completed Successfully!')
  console.log('👉 Superadmin account: username: admin | password: password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
