import { useState } from 'react';
import './App.css';
import { PART1_QUESTIONS, PART2_QUESTIONS, RESULTS, type ResultType, calculateRank } from './data';
import { Landing } from './components/Landing';
import { Question } from './components/Question';
import { Loading } from './components/Loading';
import { ResultBasic } from './components/ResultBasic';
import { ResultAdvanced } from './components/ResultAdvanced';

type Step = 'landing' | 'part1' | 'intermission' | 'loading_basic' | 'result_basic' | 'part2' | 'loading_advanced' | 'result_advanced';

function App() {
  const [step, setStep] = useState<Step>('landing');
  const [qIndex, setQIndex] = useState(0);
  
  const [part1Answers, setPart1Answers] = useState<Record<string, number>[]>([]);
  const [finalType, setFinalType] = useState<ResultType | null>(null);

  const [part2Answers, setPart2Answers] = useState<Record<string, any>>({});
  const [finalRank, setFinalRank] = useState<ReturnType<typeof calculateRank> | null>(null);

  const startTest = () => {
    setPart1Answers([]);
    setPart2Answers({});
    setQIndex(0);
    setFinalType(null);
    setFinalRank(null);
    setStep('part1');
  };

  const handlePart1Answer = (points: Record<string, number>) => {
    const newAnswers = [...part1Answers, points];
    setPart1Answers(newAnswers);

    if (qIndex < PART1_QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      // Calculate type
      const agg: Record<string, number> = {};
      newAnswers.forEach(ans => {
        Object.entries(ans).forEach(([k, v]) => {
          agg[k] = (agg[k] || 0) + v;
        });
      });

      let topId = 'PLANNER';
      let maxPoints = -1;
      for (const [id, score] of Object.entries(agg)) {
        if (score > maxPoints) {
          maxPoints = score;
          topId = id;
        }
      }
      setFinalType(RESULTS[topId]);
      setStep('intermission');
    }
  };

  const handlePart1Prev = () => {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
      setPart1Answers(prev => prev.slice(0, -1));
    }
  };

  const skipPart2 = () => {
    setStep('loading_basic');
  };

  const startPart2 = () => {
    setQIndex(0);
    setStep('part2');
  };

  const handlePart2Answer = (val: any) => {
    const currentQ = PART2_QUESTIONS[qIndex];
    const newAnswers = { ...part2Answers, [currentQ.id]: val };
    setPart2Answers(newAnswers);

    if (qIndex < PART2_QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setFinalRank(calculateRank(newAnswers));
      setStep('loading_advanced');
    }
  };

  const handlePart2Prev = () => {
    if (qIndex > 0) {
      setQIndex(qIndex - 1);
    }
  };

  return (
    <div className="app-container">
      {step === 'landing' && <Landing onStart={startTest} />}
      
      {step === 'part1' && (
        <Question 
          key={`p1-${qIndex}`}
          title="자기관리 성향 진단 (1/2)"
          question={PART1_QUESTIONS[qIndex]}
          currentNumber={qIndex + 1}
          totalNumber={PART1_QUESTIONS.length}
          maxSelect={2}
          onAnswer={handlePart1Answer}
          onPrev={qIndex > 0 ? handlePart1Prev : undefined}
        />
      )}

      {step === 'intermission' && (
        <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.4 }}>
            기본 성향 진단이 완료되었습니다.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.6 }}>
            나의 기본 유형 결과만 바로 확인하시겠습니까?<br />
            아니면 11개의 <strong>현실 수준(자산, 피지컬, 성장 환경 등) 심층 진단</strong>을 추가해 종합적인 조언을 확인하시겠습니까?
          </p>
          
          <button 
            onClick={startPart2}
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-color)',
              padding: '1.25rem',
              borderRadius: '8px',
              fontSize: '1.05rem',
              fontWeight: 700,
              marginBottom: '1rem',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            객관적 현실 등급 테스트 추가 진행하기
          </button>

          <button 
            onClick={skipPart2}
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              padding: '1.25rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid var(--border-color)'
            }}
          >
            자기관리 유형 결과만 바로 확인하기
          </button>
        </div>
      )}

      {step === 'loading_basic' && <Loading onComplete={() => setStep('result_basic')} />}

      {step === 'result_basic' && finalType && (
        <ResultBasic 
          result={finalType} 
          onRestart={() => setStep('landing')}
        />
      )}

      {step === 'part2' && (
        <Question 
          key={`p2-${qIndex}`}
          title="상위 1% 객관적 자본 진단 (2/2)"
          question={PART2_QUESTIONS[qIndex]}
          currentNumber={qIndex + 1}
          totalNumber={PART2_QUESTIONS.length}
          maxSelect={1}
          onAnswer={handlePart2Answer}
          onPrev={qIndex > 0 ? handlePart2Prev : undefined}
        />
      )}

      {step === 'loading_advanced' && <Loading onComplete={() => setStep('result_advanced')} />}

      {step === 'result_advanced' && finalType && finalRank && (
        <ResultAdvanced 
          result={finalType} 
          rankData={finalRank}
          onRestart={() => setStep('landing')}
        />
      )}
    </div>
  );
}

export default App;
