import { Crosshair, Lightbulb, Command, Layers, ShieldX, TrendingUp, Star, CheckCircle, Download } from 'lucide-react';
import { type ResultType, type calculateRank } from '../data';
import { RadarChartComp } from './RadarChartComp';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface ResultAdvancedProps {
  result: ResultType;
  rankData: ReturnType<typeof calculateRank>;
  onRestart: () => void;
}

const RANK_ORDER = ['D', 'C', 'B', 'A', 'S', 'SSS'];

export const ResultAdvanced = ({ result, rankData, onRestart }: ResultAdvancedProps) => {
  const currentRankIdx = RANK_ORDER.indexOf(rankData.rank);
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    try {
      setIsSaving(true);
      // html2canvas 실행
      const canvas = await html2canvas(captureRef.current, {
        scale: 2, // 고해상도 지원
        useCORS: true,
        backgroundColor: '#050505', // 모노톤 다크 백그라운드 매칭
      });
      // 데이터 url 생성 후 jpg 포맷, 0.85 퀄리티 압축
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      // 로컬 다운로드 구동
      const link = document.createElement('a');
      link.download = `Ferrix_Result_${rankData.rank}.jpg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      alert('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 세부 스탯 바를 위한 데이터 매핑
  const statLabels: Record<string, string> = {
    F: '자본력',
    P: '신체·활력',
    B: '성장 환경',
    E: '전문성',
    Fr: '자유도'
  };

  const statColors: Record<string, string> = {
    F: '#2ecc71', // 긍정적 그린 계열
    P: '#e74c3c', // 역동적 레드 계열
    B: '#9b59b6', // 인프라/환경 퍼플 계열
    E: '#3498db', // 전문성 블루 계열
    Fr: '#f1c40f' // 리버티 옐로우 계열
  };

  return (
    <div className="fade-in" style={{ paddingBottom: '4rem', marginTop: '1rem' }}>
      
      {/* Capture Wrapper */}
      <div ref={captureRef} style={{ padding: '0 0 1rem 0' }}>

      {/* Label */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '0.4rem 1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '20px' }}>
          종합 진단 스탠다드 리포트
        </div>
      </div>

      {/* Humanitarian Disclaimer (Moved to top) */}
      <div style={{ 
        backgroundColor: 'var(--bg-secondary)',
        border: '1px dashed var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem', 
        textAlign: 'center',
        marginBottom: '2.5rem'
      }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, wordBreak: 'keep-all', margin: 0 }}>
          <strong style={{ color: 'var(--text-primary)' }}>[주의 사항]</strong> 본 결과는 통계적 데이터와 자기관리 성향 분석에 기반한 참조용 지표입니다.<br />
          <strong>개인의 고유한 가치를 절대적인 등급으로 규정할 수 없으며,</strong> 더 나은 성장을 위한 지침표로만 활용해 주시기 바랍니다.
        </p>
      </div>

      {/* Grade/Rank Reality Check (Enhanced) */}
      <div style={{
        marginTop: '0.5rem',
        padding: '4rem 2rem 3rem',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, var(--text-primary) 0%, #333 100%)',
        color: 'var(--bg-color)',
        textAlign: 'center',
        marginBottom: '1.5rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative circle */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <p style={{ fontSize: '0.9rem', letterSpacing: '4px', opacity: 0.8, marginBottom: '1.5rem', fontWeight: 800, textTransform: 'uppercase' }}>
          현실 수준 데이터 진단 결과
        </p>
        <h1 style={{ fontSize: '7rem', fontWeight: 900, lineHeight: 1, margin: '0 0 1rem 0', letterSpacing: '-4px', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.2))' }}>
          {rankData.rank}
        </h1>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', display: 'inline-flex', flexDirection: 'column', gap: '4px', padding: '0.75rem 2rem', borderRadius: '40px', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            {rankData.desc}
          </p>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.9, color: '#ffd700' }}>
            {rankData.percentileKorea} (대한민국 상위 기준)
          </p>
        </div>
        <div style={{ textAlign: 'left', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, fontWeight: 600, margin: 0, wordBreak: 'keep-all' }}>
            {rankData.advice}
          </p>
        </div>
      </div>

      {/* Comparison Stats Cards (New Section) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>전세계 평균</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-secondary)' }}>C-</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>Standard</p>
        </div>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>대한민국 평균</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-secondary)' }}>C+</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>High Standard</p>
        </div>
        <div style={{ backgroundColor: 'var(--text-primary)', padding: '1.5rem', borderRadius: '16px', border: 'none', textAlign: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--bg-color)', opacity: 0.8, marginBottom: '0.5rem' }}>당신의 위치</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--bg-color)' }}>{rankData.rank}</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--bg-color)', opacity: 0.9, marginTop: '4px' }}>{rankData.percentileGlobal} Global</p>
        </div>
      </div>

      {/* Rank Progress Bar (Enhanced) */}
      <div style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        border: '1px solid var(--border-color)',
        borderRadius: '24px', 
        padding: '2rem',
        marginBottom: '3.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '1px' }}>성장 레벨 진행도</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>RANK MAP</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', padding: '10px 0' }}>
          {RANK_ORDER.map((rank, i) => {
            const isActive = i === currentRankIdx;
            const isPast = i < currentRankIdx;
            return (
              <div key={rank} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '100%',
                  height: isActive ? '14px' : '8px',
                  backgroundColor: isActive ? 'var(--text-primary)' : isPast ? 'var(--text-secondary)' : 'var(--border-color)',
                  borderRadius: '10px',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: isActive ? '0 0 15px rgba(0,0,0,0.1)' : 'none'
                }} />
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: isActive ? 900 : 600, 
                  color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}>
                  {rank}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: 'var(--bg-color)', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          border: '1px dashed var(--border-color)'
        }}>
          <TrendingUp size={16} style={{ color: 'var(--text-primary)' }} />
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, margin: 0 }}>
            시스템 최적화 시 <strong style={{ color: 'var(--text-primary)' }}>{RANK_ORDER[currentRankIdx + 1] ?? '최고 등급'}</strong> 도달 가능성이 매우 높습니다.
          </p>
        </div>
      </div>

      {/* Trait Head */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {result.nameEN}
        </p>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {result.nameKO}
        </h2>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', fontWeight: 600, wordBreak: 'keep-all', fontStyle: 'italic' }}>
          "{result.coreSentence}"
        </p>
      </div>

      {/* Radar Chart & Core Stats (Refined) */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--text-primary)' }}>
          <Command size={22} style={{ marginRight: '10px' }} /> 자기관리 역량 분포도
        </h3>
        <div style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderRadius: '24px', 
          padding: '2.5rem', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.01)'
        }}>
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: 600, marginBottom: '2rem' }}>
              항목별 수치는 100점 만점으로 환산된 객관적 지표입니다.
            </p>
          </div>
          <RadarChartComp data={result.radar} />

          <div style={{ width: '100%', marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '15px' }}>
            {result.radar.map((r, i) => (
              <div key={i} style={{ 
                backgroundColor: 'var(--bg-color)', 
                padding: '1rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 800 }}>{r.item}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)' }}>{r.A} / 100</span>
                </div>
                <div style={{ height: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${r.A}%`, 
                    height: '100%', 
                    backgroundColor: 'var(--text-primary)',
                    borderRadius: '10px',
                    transition: 'width 1.2s ease-out'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--text-primary)' }}>
          <Layers size={20} style={{ marginRight: '8px' }} /> 잠재력과 고유 무기
        </h3>
        <div style={{ 
          fontSize: '1.05rem', 
          lineHeight: 1.8, 
          color: 'var(--text-primary)', 
          backgroundColor: 'var(--bg-secondary)',
          padding: '2rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          marginBottom: '2rem',
          fontWeight: 500
        }}>
          {result.detailedAnalysis}
        </div>

        {/* Core Strengths as visual cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                backgroundColor: 'var(--text-primary)', 
                color: 'var(--bg-color)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 800, 
                fontSize: '0.8rem',
                flexShrink: 0
              }}>
                <Lightbulb size={14} />
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                {strength}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal Environment + Trap Cards */}
      <div style={{ marginBottom: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', padding: '1.75rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1rem', gap: '8px' }}>
            <Star size={18} />
            최적의 환경
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500, fontSize: '0.95rem' }}>{result.idealEnvironment}</p>
        </div>
        <div style={{ backgroundColor: '#111', borderRadius: '16px', padding: '1.75rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, marginBottom: '1rem', color: '#fff', fontSize: '1rem', gap: '8px' }}>
            <TrendingUp size={18} />
            반드시 극복할 함정
          </div>
          <p style={{ color: '#ccc', lineHeight: 1.6, fontWeight: 500, fontSize: '0.95rem' }}>{result.trap}</p>
        </div>
      </div>

      {/* Reality Check Advisory */}
      <div style={{ marginBottom: '4rem', padding: '2rem', backgroundColor: 'var(--bg-color)', border: '2px solid var(--text-primary)', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
          <ShieldX size={20} style={{ marginRight: '10px' }} />
          지금 당장 고쳐야 할 약점
        </h3>
        <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 500 }}>
          {result.realityCheck}
        </p>
      </div>

      {/* Detailed Stat Bars (New) */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <Command size={18} style={{ display: 'inline', verticalAlign: 'sub', marginRight: '6px' }} />
          5대 심층 스탯 분석
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {['F', 'P', 'B', 'E', 'Fr'].map((key) => {
            // @ts-ignore
            const score = Math.round(rankData.detailedScores?.[key] || 0);
            return (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{statLabels[key]}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: statColors[key] }}>{score} / 100</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${score}%`, 
                    height: '100%', 
                    backgroundColor: statColors[key],
                    borderRadius: '10px',
                    transition: 'width 1s ease-in-out'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Relatable Persona (New Fact-Violence Section) */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        borderLeft: '4px solid var(--text-primary)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f39c12', marginBottom: '0.8rem', letterSpacing: '0.5px' }}>
          [분석] 당신과 같은 등급 사람들의 특징
        </h4>
        {/* @ts-ignore */}
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#f1f2f6', fontWeight: 500, margin: 0, wordBreak: 'keep-all' }}>
          "{rankData.relatablePersona}"
        </p>
      </div>

      {/* Actionable System */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
          <Crosshair size={28} style={{ marginRight: '10px' }} />
          지금 바로 실천할 행동 3가지
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1rem', fontWeight: 500 }}>
          {rankData.rank} 등급과 당신의 자기관리 성향을 종합해 도출한 실천 항목입니다. 감정이나 의지에 의존하지 말고 그대로 수행하세요.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {result.actionableSystem.map((plan, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              padding: '1.75rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              transition: 'transform 0.2s ease',
              cursor: 'default',
              gap: '1.25rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ 
                backgroundColor: 'var(--text-primary)', 
                color: 'var(--bg-color)', 
                borderRadius: '8px', 
                minWidth: '36px', 
                height: '36px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 900, 
                fontSize: '1rem',
                flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>
                  {plan}
                </p>
              </div>
              <CheckCircle size={20} style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: '2px' }} />
            </div>
          ))}
        </div>

      {/* 1 Year Scenario (New) */}
      <div style={{
        marginTop: '3rem',
        marginBottom: '3rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          1년 뒤 시나리오 예측
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1.2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--text-primary)', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>■ 행동을 즉각 전환했을 때</div>
            {/* @ts-ignore */}
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
              {rankData.futureScenarioGood}
            </p>
          </div>

          <div style={{ padding: '1.2rem', backgroundColor: 'var(--bg-color)', border: '1px dashed #e74c3c', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#e74c3c', marginBottom: '0.5rem' }}>■ 현재에 안주했을 때</div>
            {/* @ts-ignore */}
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-tertiary)', margin: 0 }}>
              {rankData.futureScenarioBad}
            </p>
          </div>
        </div>
      </div>

      {/* WANT Goal Advisory (New) */}
      <div style={{
        marginTop: '2rem',
        marginBottom: '4rem',
        padding: '2rem',
        backgroundColor: '#111',
        borderLeft: '4px solid #fff',
        borderRadius: '0 12px 12px 0'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '0px' }}>
          당신의 궁극적 지향점에 대한 조언
        </h3>
        {/* @ts-ignore */}
        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#e0e0e0', fontWeight: 500, margin: 0 }}>
          {rankData.wantAdvice}
        </p>
      </div>
      
      </div> {/* End Capture Wrapper */}

      {/* Buttons Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
        {/* Save Image Button */}
        <button 
          onClick={handleSaveImage}
          disabled={isSaving}
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
            cursor: isSaving ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseOver={(e) => {
            if (isSaving) return;
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            if (isSaving) return;
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseDown={(e) => { if (!isSaving) e.currentTarget.style.transform = 'scale(0.98)' }}
          onMouseUp={(e) => { if (!isSaving) e.currentTarget.style.transform = 'scale(1)' }}
        >
          <Download size={20} />
          {isSaving ? "이미지 변환 중..." : "이 결과를 갤러리에 저장하기"}
        </button>

        {/* Final Button */}
        <button 
          onClick={onRestart}
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
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '3rem'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        모든 과정 다시하기
      </button>
      </div> {/* End Buttons Container */}
    </div>
  );
};
