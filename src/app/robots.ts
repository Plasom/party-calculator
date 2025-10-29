import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '*/checkout', '*/payment'],
    },
    sitemap: 'https://party-calculator.vercel.app/sitemap.xml',
  }
}
