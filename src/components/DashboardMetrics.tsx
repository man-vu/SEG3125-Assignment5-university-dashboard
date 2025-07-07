import React from 'react';
import { getEnrollmentByProvince, filterByProvince } from '../utils/dataUtils';
import type { UniversityData } from '../utils/dataUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardMetricsProps {
  data: UniversityData[];
  selectedProvince: string;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  data,
  selectedProvince
}) => {
  const { t, language } = useLanguage();

  // Filter data by province if selected
  const filteredData = filterByProvince(data, selectedProvince);

  // Calculate metrics
  const totalUniversities = filteredData.length;
  const totalStudents = filteredData.reduce((sum, uni) => 
    sum + uni.fullTimeUndergrad + uni.fullTimeGraduate + uni.partTimeUndergrad + uni.partTimeGraduate, 0
  );
  const avgEnrollment = totalUniversities > 0 ? Math.round(totalStudents / totalUniversities) : 0;
  
  // Get top province from filtered data, or overall data if no province is selected
  const dataForTopProvince = selectedProvince === 'All' ? data : filteredData;
  const provinceEnrollment = getEnrollmentByProvince(dataForTopProvince);
  const topProvince = provinceEnrollment[0];

  // Format numbers for display
  const formatNumber = (value: number) => {
    if (language === 'fr') {
      return value.toLocaleString('fr-CA');
    }
    return value.toLocaleString('en-CA');
  };

  const metrics = [
    {
      label: t('metrics.totalUniversities'),
      value: formatNumber(totalUniversities),
      icon: '🏛️',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      label: t('metrics.totalStudents'),
      value: formatNumber(totalStudents),
      icon: '👥',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      label: t('metrics.avgEnrollment'),
      value: formatNumber(avgEnrollment),
      icon: '📊',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      label: t('metrics.topProvince'),
      value: topProvince?.province || 'N/A',
      icon: '🗺️',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className={`metric-card ${metric.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {metric.label}
              </p>
              <p className="text-2xl font-bold">
                {metric.value}
              </p>
            </div>
            <div className="text-3xl">
              {metric.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics; 