import { MetadataRoute } from 'next'
import { features } from '@/lib/features';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://uhurutrade.com';

  const servicesUrls = features.map(feature => ({
    url: `${baseUrl}/services/${feature.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/cookie-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/airdrop-legal-terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/uhurucoin-whitepaper`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
  ];

  return [
    ...staticUrls,
    ...servicesUrls
  ];
}
