import React from 'react';
import { provinces } from '../utils/dataUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardControlsProps {
  selectedProvince: string;
  setSelectedProvince: (province: string) => void;
  maxUniversities: number;
  setMaxUniversities: (count: number) => void;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
  selectedProvince,
  setSelectedProvince,
  maxUniversities,
  setMaxUniversities
}) => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="dashboard-card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Province Filter */}
          <div className="flex-1">
            <label htmlFor="province-select" className="block text-sm font-medium text-gray-700 mb-2">
              {t('controls.province')}
            </label>
            <select
              id="province-select"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="All">{t('controls.province.all')}</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Universities */}
          <div className="flex-1">
            <label htmlFor="universities-select" className="block text-sm font-medium text-gray-700 mb-2">
              {t('controls.universities')}
            </label>
            <select
              id="universities-select"
              value={maxUniversities}
              onChange={(e) => setMaxUniversities(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            {t('language.english')} / {t('language.french')}:
          </span>
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                language === 'fr'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardControls; 