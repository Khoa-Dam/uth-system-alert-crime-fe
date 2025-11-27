import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/unauthorized'],
    },
    sitemap: 'https://www.guardm.space/sitemap.xml',
  }
}
