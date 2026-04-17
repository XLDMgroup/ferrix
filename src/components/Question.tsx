import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface QuestionProps {
  title: string;
  question: any;
  currentNumber: number;
  totalNumber: number;
  maxSelect?: number;
  onAnswer: (val: any) => void;
  onPrev?: () => void;
}

export const Question = ({ title, question, currentNumber, totalNumber, maxSelect = 2, onAnswer, onPrev }: QuestionProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [numberVal, setNumberVal] = useState<string>('');
  const progress = (currentNumber / totalNumber) * 100;

  const toggleOption = (idx: number) => {
    if (maxSelect === 1) {
      if (question.options[idx].points !== undefined) {
        onAnswer(question.options[idx].points);
      } else if (question.options[idx].val !== undefined) {
        onAnswer(question.options[idx].val);
      } else {
        onAnswer(question.options[idx].text);
      }
      return;
    }

    if (selected.includes(idx)) {
      setSelected(selected.filter(i => i !== idx));
    } else {
      if (selected.length < maxSelect) {
        setSelected([...selected, idx]);
      }
    }
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    
    if (question.options[0].points !== undefined) {
      const aggregated: Record<string, number> = {};
      selected.forEach(idx => {
        const pts = question.options[idx].points;
        Object.entries(pts).forEach(([k, v]) => {
          aggregated[k] = (aggregated[k] || 0) + (v as number);
        });
      });
      onAnswer(aggregated);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header / Progress */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {onPrev ? (
          <button 
            onClick={onPrev}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-tertiary)', 
              cursor: 'pointer',
              padding: 0,
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={18} style={{ marginRight: '6px' }} /> 이전
          </button>
        ) : (
          <div style={{ width: '60px' }} />
        )}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: 700, margin: 0, paddingRight: onPrev ? '60px' : '0' }}>{title}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--border-color)', height: '4px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            width: `${progress}%`, 
            backgroundColor: 'var(--text-primary)', 
            height: '100%', 
            transition: 'width 0.3s ease' 
          }} />
        </div>
        <span style={{ marginLeft: '1rem', color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
          {currentNumber} / {totalNumber}
        </span>
      </div>

      <div style={{ flex: 1, paddingBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.4rem', 
          fontWeight: 700, 
          lineHeight: 1.5, 
          marginBottom: '1rem',
          wordBreak: 'keep-all'
        }}>
          {question.text}
        </h2>
        
        {maxSelect > 1 && question.type !== 'number' && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '2rem' }}>
            가장 가까운 항목을 <span style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--text-primary)' }}>1~{maxSelect}개</span> 선택하세요.
          </p>
        )}

        {question.type === 'number' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <input 
              type="number" 
              value={numberVal}
              onChange={(e) => setNumberVal(e.target.value)}
              placeholder="숫자를 입력하세요 (예: 24)"
              autoFocus
              style={{
                width: '100%',
                padding: '1.5rem',
                fontSize: '1.5rem',
                fontWeight: 800,
                textAlign: 'center',
                backgroundColor: 'var(--bg-secondary)',
                border: '2px solid var(--text-primary)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button
              onClick={() => {
                if (numberVal && !isNaN(Number(numberVal))) {
                  onAnswer(Number(numberVal));
                }
              }}
              disabled={!numberVal || isNaN(Number(numberVal))}
              style={{
                width: '100%',
                padding: '1.25rem',
                backgroundColor: (numberVal && !isNaN(Number(numberVal))) ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: (numberVal && !isNaN(Number(numberVal))) ? 'var(--bg-color)' : 'var(--text-secondary)',
                border: (numberVal && !isNaN(Number(numberVal))) ? 'none' : '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: (numberVal && !isNaN(Number(numberVal))) ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              다음으로 <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
          {question.options.map((opt: any, idx: number) => {
            const isSelected = selected.includes(idx);
            
            return (
              <button
                key={idx}
                onClick={() => toggleOption(idx)}
                className="delay-100 fade-in"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  padding: '1.2rem',
                  backgroundColor: isSelected ? 'var(--bg-secondary)' : 'var(--bg-color)',
                  border: isSelected ? '2px solid var(--text-primary)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  color: 'var(--text-primary)',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                  animationDelay: `${idx * 0.03}s`
                }}
              >
                <span style={{ fontWeight: isSelected ? 700 : 500, flex: 1, minWidth: 0 }}>{opt.text}</span>
                {maxSelect > 1 && isSelected && (
                  <CheckCircle2 size={20} style={{ color: 'var(--text-primary)', flexShrink: 0, marginLeft: '12px' }} />
                )}
              </button>
            )
          })}
        </div>
        )}
        
        {maxSelect > 1 && question.type !== 'number' && (
          <button
            onClick={handleNext}
            disabled={selected.length === 0}
            style={{
              width: '100%',
              padding: '1.25rem',
              backgroundColor: selected.length > 0 ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: selected.length > 0 ? 'var(--bg-color)' : 'var(--text-secondary)',
              border: selected.length > 0 ? 'none' : '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: selected.length > 0 ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            다음으로 <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </button>
        )}
      </div>
    </div>
  );
};
