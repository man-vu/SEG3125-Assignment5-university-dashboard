import React, { useState, useEffect } from 'react';
import { parseCSVData } from '../utils/dataUtils';
import type { UniversityData } from '../utils/dataUtils';
import { useLanguage } from '../contexts/LanguageContext';
import DashboardControls from './DashboardControls';
import DashboardMetrics from './DashboardMetrics';
import TopUniversitiesChart from './TopUniversitiesChart';
import StudentTypesChart from './StudentTypesChart';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<UniversityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [maxUniversities, setMaxUniversities] = useState(10);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/universities_data.csv');
        const csvText = await response.text();
        const parsedData = parseCSVData(csvText);
        setData(parsedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {t('dashboard.subtitle')}
            </p>
            <p className="text-sm text-gray-500 max-w-3xl mx-auto">
              {t('dashboard.description')}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <DashboardControls
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          maxUniversities={maxUniversities}
          setMaxUniversities={setMaxUniversities}
        />

        {/* Metrics */}
        <DashboardMetrics
          data={data}
          selectedProvince={selectedProvince}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Top Universities Chart */}
          <div>
            <TopUniversitiesChart
              data={data}
              maxUniversities={maxUniversities}
              selectedProvince={selectedProvince}
            />
          </div>

          {/* Student Types Chart */}
          <div>
            <StudentTypesChart
              data={data}
              selectedProvince={selectedProvince}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>
              Data source: Canadian University Enrollment Statistics
            </p>
            <p className="mt-1">
              Built with React, TypeScript, Tailwind CSS, and Recharts
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard; 