import { MetadataRoute } from 'next'
import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXT_PUBLIC_APP_URL || 'https://guardm.vercel.app'

  return [
    {
      url: baseUrl, // Landing page (/)
      lastModified: new Date(),
      changeFrequency: 'monthly', // Landing page ít thay đổi hơn
      priority: 1, // Quan trọng nhất vì là cửa ngõ
    },
    {
      url: `${baseUrl}/dashboard`, // Main App Entry
      lastModified: new Date(),
      changeFrequency: 'always', // Dashboard thay đổi liên tục (tin tức, báo cáo)
      priority: 0.9,
    },
    {
      url: `${baseUrl}/weather`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wanted`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
