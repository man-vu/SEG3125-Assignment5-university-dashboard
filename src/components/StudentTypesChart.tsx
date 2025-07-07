import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { getStudentTypeBreakdown, filterByProvince } from '../utils/dataUtils';
import type { UniversityData } from '../utils/dataUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface StudentTypesChartProps {
  data: UniversityData[];
  selectedProvince: string;
}

const StudentTypesChart: React.FC<StudentTypesChartProps> = ({
  data,
  selectedProvince
}) => {
  const { t, language } = useLanguage();

  // Filter data by province if selected
  const filteredData = filterByProvince(data, selectedProvince);

  // Get student type breakdown
  const breakdown = getStudentTypeBreakdown(filteredData);

  // Create chart data
  const chartData = [
    {
      type: t('studentType.fullTimeUndergrad'),
      value: breakdown.fullTimeUndergrad,
      percentage: ((breakdown.fullTimeUndergrad / (breakdown.fullTimeUndergrad + breakdown.fullTimeGraduate + breakdown.partTimeUndergrad + breakdown.partTimeGraduate)) * 100).toFixed(1)
    },
    {
      type: t('studentType.fullTimeGraduate'),
      value: breakdown.fullTimeGraduate,
      percentage: ((breakdown.fullTimeGraduate / (breakdown.fullTimeUndergrad + breakdown.fullTimeGraduate + breakdown.partTimeUndergrad + breakdown.partTimeGraduate)) * 100).toFixed(1)
    },
    {
      type: t('studentType.partTimeUndergrad'),
      value: breakdown.partTimeUndergrad,
      percentage: ((breakdown.partTimeUndergrad / (breakdown.fullTimeUndergrad + breakdown.fullTimeGraduate + breakdown.partTimeUndergrad + breakdown.partTimeGraduate)) * 100).toFixed(1)
    },
    {
      type: t('studentType.partTimeGraduate'),
      value: breakdown.partTimeGraduate,
      percentage: ((breakdown.partTimeGraduate / (breakdown.fullTimeUndergrad + breakdown.fullTimeGraduate + breakdown.partTimeUndergrad + breakdown.partTimeGraduate)) * 100).toFixed(1)
    }
  ];

  // Format numbers for display
  const formatNumber = (value: number) => {
    if (language === 'fr') {
      return value.toLocaleString('fr-CA');
    }
    return value.toLocaleString('en-CA');
  };

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number; payload: { percentage: string } }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-gray-600">
              {t('common.students')}: {formatNumber(payload[0]?.value || 0)}
            </p>
            <p className="text-gray-600">
              {t('common.percentage')}: {payload[0]?.payload?.percentage || 0}%
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
          {t('chart.studentTypes.title')}
        </h3>
        <p className="text-gray-600 text-sm">
          {t('chart.studentTypes.description')}
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="type" 
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
          <Area 
            type="monotone"
            dataKey="value" 
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
            name={t('common.students')}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Summary statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {chartData.map((item, index) => (
          <div key={index} className="metric-card">
            <h4 className="text-sm font-medium text-gray-600 mb-1">
              {item.type}
            </h4>
            <p className="text-2xl font-bold text-gray-800">
              {formatNumber(item.value)}
            </p>
            <p className="text-sm text-gray-500">
              {item.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTypesChart; 