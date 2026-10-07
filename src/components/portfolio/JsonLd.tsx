import { knowsAbout, site } from '@content/portfolio';

export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.targetRoles.join(', '),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    sameAs: [site.linkedin, site.github],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Monash University',
    },
    knowsAbout,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
