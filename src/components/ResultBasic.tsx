import { Award, Star, AlertTriangle, Lightbulb, Layers, Command, TrendingUp, Download, Compass, ArrowRight } from 'lucide-react';
import { type ResultType } from '../data';
import { RadarChartComp } from './RadarChartComp';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface ResultBasicProps {
  result: ResultType;
  onRestart: () => void;
}

export const ResultBasic = ({ result, onRestart }: ResultBasicProps) => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveCooldown, setSaveCooldown] = useState(false);

  const handleSaveImage = async () => {
    if (!captureRef.current || isSaving || saveCooldown) return; // Rate limiting
    try {
      setIsSaving(true);
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#050505',
      });
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      const link = document.createElement('a');
      link.download = `Ferrix_BasicResult_${result.id}.jpg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // 5초 쿨다운 (Rate Limiting)
      setSaveCooldown(true);
      setTimeout(() => setSaveCooldown(false), 5000);
    } catch (err) {
      console.error(err);
      alert('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Capture Wrapper */}
      <div ref={captureRef} style={{ padding: '0 0 1rem 0' }}>

      {/* Header Section */}
      <div style={{ 
        textAlign: 'center', 
        margin: '2rem 0 3rem 0',
        padding: '3rem 1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', padding: '0.4rem 1rem', backgroundColor: 'var(--text-primary)', color: 'var(--bg-color)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px' }}>
          PRIMARY TRAIT
        </div>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {result.nameEN}
        </p>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-1px' }}>
          {result.nameKO}
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 600, wordBreak: 'keep-all', fontStyle: 'italic' }}>
          "{result.coreSentence}"
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <div style={{ display: 'flex', width: 'fit-content', alignItems: 'center', padding: '0.75rem 1.5rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '30px' }}>
            <Award size={18} style={{ marginRight: '10px', color: '#0057aa' }} />
            <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700 }}>유사한 모델: {result.similarFigures}</span>
          </div>
        </div>
      </div>

      {/* Radar Chart & Core Stats */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--text-primary)' }}>
          <Command size={20} style={{ marginRight: '8px' }} /> 역량 분포
        </h3>
        <div style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderRadius: '16px', 
          padding: '2rem', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <RadarChartComp data={result.radar} />
          
          {/* Horizontal bar chart under radar (Enhanced) */}
          <div style={{ width: '100%', marginTop: '2.5rem', display: 'grid', gap: '12px' }}>
            {result.radar.map((r, i) => (
              <div key={i} style={{ 
                backgroundColor: 'var(--bg-color)', 
                padding: '0.8rem 1.25rem', 
                borderRadius: '12px', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 800, minWidth: '60px' }}>{r.item}</span>
                <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${r.A}%`, 
                    height: '100%', 
                    backgroundColor: '#0057aa',
                    borderRadius: '10px'
                  }} />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)', minWidth: '30px', textAlign: 'right' }}>{r.A}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--text-primary)' }}>
          <Layers size={20} style={{ marginRight: '8px' }} /> 심층 분석
        </h3>
        <div style={{ 
          fontSize: '1.05rem', 
          lineHeight: 1.8, 
          color: 'var(--text-primary)', 
          backgroundColor: 'var(--bg-secondary)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          fontWeight: 500
        }}>
          {result.detailedAnalysis}
        </div>
      </div>
        
      {/* Core Strengths */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--text-primary)' }}>
          <Lightbulb size={20} style={{ marginRight: '8px' }} /> 핵심 강점
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {result.coreStrengths.map((strength, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              padding: '1.25rem 1.5rem',
              borderRadius: '12px',
              gap: '1rem'
            }}>
              <div style={{ 
                minWidth: '28px', 
                height: '28px', 
                backgroundColor: '#0057aa', 
                color: 'var(--bg-color)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 800, 
                fontSize: '0.8rem',
                flexShrink: 0
              }}>
                {idx + 1}
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                {strength}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trap + Env Cards */}
      <div style={{ marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', padding: '1.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1rem', gap: '8px' }}>
            <Star size={18} /> 최적의 환경
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500, fontSize: '0.95rem' }}>{result.idealEnvironment}</p>
        </div>
        
        <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '1.75rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, marginBottom: '1rem', color: '#F4F4F5', fontSize: '1rem', gap: '8px' }}>
            <TrendingUp size={18} /> 반드시 극복할 함정
          </div>
          <p style={{ color: '#ccc', lineHeight: 1.6, fontWeight: 500, fontSize: '0.95rem' }}>{result.trap}</p>
        </div>
      </div>

      {/* Reality Check */}
      <div style={{ marginBottom: '4rem', padding: '2rem', backgroundColor: 'var(--bg-color)', border: '2px solid var(--text-primary)', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#e74c3c' }}>
          <AlertTriangle size={20} />
          지금 당장 고쳐야 할 약점
        </h3>
        <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 500 }}>
          {result.realityCheck}
        </p>
      </div>

      {/* Instagram Market CTA (Basic) */}
      <div style={{
        backgroundColor: 'var(--bg-color)',
        border: '1px solid var(--text-primary)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'inline-flex', padding: '0.8rem', backgroundColor: '#0057aa', color: 'var(--bg-color)', borderRadius: '50%', marginBottom: '1.5rem' }}>
          <Compass size={32} />
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.5px', wordBreak: 'keep-all' }}>
          이제, 나만의 자기계발 시스템을 가질 차례입니다.
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem', wordBreak: 'keep-all' }}>
          당신은 '{result.nameKO}' 성향입니다. 타고난 강점과 약점을 알았다면, 이제 의지력에 기대지 않고 환경을 통제할 시스템을 구축해야 합니다.<br /><br />
          <strong>@ferrixclub</strong>을 팔로우하고 날카로운 인사이트와 함께 자신에게 맞는 시스템을 만들어주는 우리의 여정에 동참하세요.<br />
          당신은 삶을 성공적으로 이끌 수 있는 완벽한 루틴을 얻어내어, 마침내 원하는 모습의 인생을 쟁취할 수 있게 될 것입니다.
        </p>
        <a 
          href="https://www.instagram.com/ferrixclub/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '1.2rem',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-color)',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 800,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowRight size={20} />
          시스템 구축 여정 시작하기
        </a>
      </div>

      </div> {/* End Capture Wrapper */}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ textAlign: 'center', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.2rem', wordBreak: 'keep-all' }}>
          이 결과를 친구들과 공유하고 서로의 성향에 대해 의견을 나눠보세요! 
        </p>
        <button 
          onClick={handleSaveImage}
          disabled={isSaving}
          style={{
            width: '100%',
            padding: '1.3rem',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-color)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 800,
            transition: 'all 0.2s ease',
            cursor: isSaving ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseOver={(e) => {
            if (isSaving) return;
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            if (isSaving) return;
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseDown={(e) => { if (!isSaving) e.currentTarget.style.transform = 'scale(0.98)' }}
          onMouseUp={(e) => { if (!isSaving) e.currentTarget.style.transform = 'scale(1)' }}
        >
          <Download size={20} />
          {isSaving ? "이미지 변환 중..." : "기본 유형 결과 갤러리에 저장하기"}
        </button>

        <button 
          onClick={onRestart}
        style={{
          width: '100%',
          padding: '1.3rem',
          backgroundColor: 'transparent',
          color: 'var(--text-primary)',
          border: '2px solid var(--text-primary)',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: 800,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '1.5rem'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--text-primary)';
          e.currentTarget.style.color = 'var(--bg-color)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        처음으로 돌아가기
      </button>
      </div> {/* End Buttons Container */}

      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: 'var(--bg-secondary)', 
        borderRadius: '12px', 
        textAlign: 'center', 
        color: 'var(--text-secondary)', 
        fontSize: '0.9rem', 
        fontWeight: 600,
        border: '1px dashed var(--border-color)',
        marginBottom: '4rem'
      }}>
        <p style={{ margin: 0 }}>
          ※ 현재 결과는 1차 성향 진단 데이터만 반영되었습니다.<br />
          자산, 건강, 전문성 등 <strong>객관적 현실 지표(Reality Check)</strong>를 결합한 종합 분석을 받고 싶다면 상위 1% 진단을 추가로 진행해 보세요.
        </p>
      </div>

      {/* Humanitarian Disclaimer Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        paddingTop: '2rem', 
        textAlign: 'center',
        opacity: 0.6
      }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', lineHeight: 1.7, wordBreak: 'keep-all' }}>
          본 테스트의 결과는 통계적 데이터와 자기관리 성향 분석에 기반한 참조 지표입니다.<br />
          <strong>개인의 고유한 가치를 객관적인 등급으로 규정할 수 없으며,</strong><br />
          본 등급은 당신의 더 건강한 성장을 위한 방향성을 잡는 도구로만 활용해 주시기 바랍니다.
        </p>
        <p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-tertiary)', letterSpacing: '2px' }}>
          © FERRIX TEST 2024. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};
