import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ate.gg'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/teams',
    '/players',
    '/tournaments',
    '/schools',
    '/school-league',
    '/campus',
    '/academy',
    '/events',
    '/news',
    '/media',
    '/community',
    '/join',
    '/partners',
    '/contact',
    '/leaderboard',
    '/representative',
    '/login',
    '/register',
  ]

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path === '/tournaments' ? 0.9 : 0.7,
  }))
}
