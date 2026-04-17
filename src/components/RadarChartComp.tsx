import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { type ResultType } from '../data';

export const RadarChartComp = ({ data }: { data: ResultType['radar'] }) => {
  return (
    <div style={{ width: '100%', height: 300, margin: '1rem 0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis 
            dataKey="item" 
            tick={{ fill: '#555', fontSize: 13, fontWeight: 500 }} 
          />
          <Radar 
            name="Skills" 
            dataKey="A" 
            stroke="#111111" 
            strokeWidth={2}
            fill="#111111" 
            fillOpacity={0.15} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
