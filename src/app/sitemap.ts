import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://party-calculator.vercel.app'
  
  const routes = [
    {
      path: '',
      priority: 1,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/sushiro',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Generate URLs for each locale
  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${route.path}`])
          ),
        },
      })
    }
  }

  return sitemap
}
