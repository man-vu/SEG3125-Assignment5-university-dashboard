import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { UniversityData } from '../utils/dataUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface TopUniversitiesChartProps {
  data: UniversityData[];
  maxUniversities: number;
  selectedProvince: string;
}

const TopUniversitiesChart: React.FC<TopUniversitiesChartProps> = ({
  data,
  maxUniversities,
  selectedProvince
}) => {
  const { t, language } = useLanguage();

  // Filter data by province if selected
  const filteredData = selectedProvince === 'All' 
    ? data 
    : data.filter(uni => uni.province === selectedProvince);

  // Get top universities
  const topUniversities = filteredData
    .map(uni => ({
      name: uni.universityName,
      total: uni.fullTimeUndergrad + uni.fullTimeGraduate + uni.partTimeUndergrad + uni.partTimeGraduate,
      fullTimeUndergrad: uni.fullTimeUndergrad,
      fullTimeGraduate: uni.fullTimeGraduate,
      partTimeUndergrad: uni.partTimeUndergrad,
      partTimeGraduate: uni.partTimeGraduate,
      province: uni.province
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, maxUniversities);

  // Format numbers for display
  const formatNumber = (value: number) => {
    if (language === 'fr') {
      return value.toLocaleString('fr-CA');
    }
    return value.toLocaleString('en-CA');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-primary-600">
              {t('studentType.fullTimeUndergrad')}: {formatNumber(payload[0]?.value || 0)}
            </p>
            <p className="text-secondary-600">
              {t('studentType.fullTimeGraduate')}: {formatNumber(payload[1]?.value || 0)}
            </p>
            <p className="text-orange-500">
              {t('studentType.partTimeUndergrad')}: {formatNumber(payload[2]?.value || 0)}
            </p>
            <p className="text-purple-500">
              {t('studentType.partTimeGraduate')}: {formatNumber(payload[3]?.value || 0)}
            </p>
            <p className="text-gray-800 font-semibold border-t pt-1 mt-2">
              Total: {formatNumber(payload.reduce((sum: number, p: any) => sum + (p.value || 0), 0))}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {t('chart.topUniversities.title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('chart.topUniversities.description')}
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topUniversities} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <YAxis 
            tickFormatter={formatNumber}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ paddingBottom: '10px' }}
          />
          <Bar 
            dataKey="fullTimeUndergrad" 
            fill="#3b82f6" 
            name={t('studentType.fullTimeUndergrad')}
            stackId="a"
          />
          <Bar 
            dataKey="fullTimeGraduate" 
            fill="#22c55e" 
            name={t('studentType.fullTimeGraduate')}
            stackId="a"
          />
          <Bar 
            dataKey="partTimeUndergrad" 
            fill="#f97316" 
            name={t('studentType.partTimeUndergrad')}
            stackId="a"
          />
          <Bar 
            dataKey="partTimeGraduate" 
            fill="#a855f7" 
            name={t('studentType.partTimeGraduate')}
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopUniversitiesChart; 