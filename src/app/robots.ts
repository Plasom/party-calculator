import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '*/checkout', '*/payment'],
    },
    sitemap: 'https://sushiro-calculator.vercel.app/sitemap.xml',
  }
}
