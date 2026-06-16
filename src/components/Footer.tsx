import React from 'react';

export default function Footer() {
  return (
    <footer className="app-header" style={{ padding: '1rem 0', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid var(--surface-border)', borderBottom: 'none' }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>
        <a 
          href="https://www.linkedin.com/in/dev-pedro/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          © p3dru | 2026
        </a>
      </p>
    </footer>
  );
}
