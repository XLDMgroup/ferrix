interface LandingProps {
  onStart: () => void;
}

export const Landing = ({ onStart }: LandingProps) => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <img src="/logo.png" alt="Ferrix Test Logo" style={{ width: '120px', height: '120px', objectFit: 'contain', marginBottom: '1.5rem' }} />
        <h1 style={{ 
          fontSize: '3.2rem', 
          fontWeight: 900, 
          lineHeight: 1.2, 
          letterSpacing: '-1px',
          marginBottom: '1.5rem',
          wordBreak: 'keep-all'
        }}>
          문제는 의지가 아니라<br />
          <span style={{ color: '#0057aa' }}>시스템이다.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-tertiary)', lineHeight: 1.5, wordBreak: 'keep-all', fontWeight: 500 }}>
          당신에게 맞는 객관적인 자기관리 방식을 찾아드립니다.
        </p>
      </div>

      <button 
        onClick={onStart}
        className="delay-100 fade-in"
        style={{
          padding: '1.3rem',
          backgroundColor: 'var(--text-primary)',
          color: 'var(--bg-color)',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 800,
          cursor: 'pointer',
          transition: 'transform 0.1s ease, opacity 0.2s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        내 자기관리 성향 검사 시작하기
      </button>
    </div>
  );
};
