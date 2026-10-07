import { ImageResponse } from 'next/og';
import { proofTiles, site } from '@content/portfolio';

export const runtime = 'edge';
export const alt = 'Sai Vanamali — portfolio';
export const size = { width: 1200, height: 630 };

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#ffffff',
          color: '#0a0a0a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em' }}>
            {site.name}
          </div>
          <div style={{ fontSize: 28, marginTop: 16, maxWidth: 900 }}>
            {site.positioning}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 48, fontSize: 22 }}>
          {proofTiles.map((t) => (
            <div key={t.id}>
              <div style={{ fontWeight: 700, color: t.color === 'data' ? '#3d4bff' : '#e8541a' }}>
                {t.headline}
              </div>
              <div style={{ fontSize: 14, color: '#5c5c5c', marginTop: 8, maxWidth: 280 }}>
                {t.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
