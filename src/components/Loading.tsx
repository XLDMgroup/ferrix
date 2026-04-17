import { useEffect, useState } from 'react';

interface LoadingProps {
  onComplete: () => void;
}

export const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const [messages] = useState([
    "응답을 분석하고 있습니다...",
    "당신의 성향을 시스템과 매칭하는 중...",
    "최적의 자기관리 방식을 도출하고 있습니다..."
  ]);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1200);

    const finishTimeout = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimeout);
    };
  }, [messages.length, onComplete]);

  return (
    <div className="fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--border-color)',
        borderTop: '3px solid var(--text-primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '2rem'
      }} />
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
      <p className="slow-fade-in" key={msgIndex} style={{ 
        fontSize: '1.2rem', 
        fontWeight: 600, 
        color: 'var(--text-secondary)'
      }}>
        {messages[msgIndex]}
      </p>
    </div>
  );
};
