import { ArrowRight, AlertTriangle, Crosshair, Award } from 'lucide-react';
import { type ResultType, type calculateRank } from '../data';
import { RadarChartComp } from './RadarChartComp';

interface ResultProps {
  result: ResultType;
  rankData: ReturnType<typeof calculateRank>;
  onRestart: () => void;
}

export const Result = ({ result, rankData, onRestart }: ResultProps) => {
  return (
    <div className="fade-in" style={{ paddingBottom: '4rem' }}>
      {/* 1. Grade/Rank Section (Reality Check) */}
      <div style={{
        marginTop: '2rem',
        padding: '2.5rem 1.5rem',
        borderRadius: '16px',
        backgroundColor: 'var(--text-primary)',
        color: 'var(--bg-color)',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <p style={{ fontSize: '0.9rem', letterSpacing: '2px', opacity: 0.8, marginBottom: '0.5rem' }}>
          현재 당신의 객관적 현실
        </p>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, margin: '0.5rem 0' }}>
          {rankData.rank}
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, opacity: 0.9 }}>
          {rankData.desc}
        </p>
        <div style={{ marginTop: '2rem', textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
            {rankData.advice}
          </p>
        </div>
      </div>

      {/* 2. Type Section */}
      <div style={{ textAlign: 'center', margin: '3rem 0 2rem 0' }}>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {result.nameEN}
        </p>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {result.nameKO}
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 600, wordBreak: 'keep-all', fontStyle: 'italic' }}>
          "{result.coreSentence}"
        </p>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '1.5rem', padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: '30px' }}>
          <Award size={16} style={{ marginRight: '8px', color: 'var(--text-secondary)' }} />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>유사한 롤모델: {result.similarFigures}</span>
        </div>
      </div>

      {/* 3. Radar Chart (No Emojis, Sharp) */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', padding: '1.5rem', marginBottom: '3rem' }}>
        <h3 style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 700 }}>능력치 분배</h3>
        <RadarChartComp data={result.radar} />
      </div>

      {/* 4. Reality Check (팩트 폭행) */}
      <div style={{ marginBottom: '4rem', borderLeft: '4px solid var(--text-primary)', paddingLeft: '1.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
          <AlertTriangle size={24} style={{ marginRight: '10px' }} /> 
          뼈아픈 현실 직시
        </h3>
        <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 500 }}>
          {result.realityCheck}
        </p>
      </div>

      {/* 5. Actionable System */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <Crosshair size={26} style={{ marginRight: '10px' }} />
          상위 1% 도약을 위한 행동 강령
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
          등급을 한 단계 올리기 위한 당장의 조치입니다. 감정이나 의지에 의존하지 말고 기계처럼 수행하세요.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {result.actionableSystem.map((plan, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              padding: '1.5rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px'
            }}>
              <ArrowRight size={20} style={{ minWidth: '20px', marginRight: '1rem', marginTop: '3px', color: 'var(--text-primary)' }} />
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                {plan}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={onRestart}
        style={{
          width: '100%',
          padding: '1.25rem',
          backgroundColor: 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid var(--text-primary)',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 700,
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--text-primary)';
          e.currentTarget.style.color = 'var(--bg-color)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        테스트 다시하기
      </button>
    </div>
  );
};
