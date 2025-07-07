import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard
    'dashboard.title': 'Canadian University Enrollment Analytics',
    'dashboard.subtitle': 'Comprehensive analysis of student enrollment across Canadian universities',
    'dashboard.description': 'Explore enrollment patterns, compare universities, and analyze student demographics across provinces.',
    
    // Charts
    'chart.topUniversities.title': 'Top Universities by Total Enrollment',
    'chart.topUniversities.description': 'Comparison of the largest universities by total student enrollment',
    'chart.studentTypes.title': 'Student Type Distribution',
    'chart.studentTypes.description': 'Breakdown of enrollment by student type across all universities',
    
    // Controls
    'controls.province': 'Province',
    'controls.province.all': 'All Provinces',
    'controls.studentType': 'Student Type',
    'controls.universities': 'Number of Universities',
    
    // Provinces
    'province.alberta': 'Alberta',
    'province.britishColumbia': 'British Columbia',
    'province.manitoba': 'Manitoba',
    'province.newBrunswick': 'New Brunswick',
    'province.newfoundlandLabrador': 'Newfoundland & Labrador',
    'province.novaScotia': 'Nova Scotia',
    'province.ontario': 'Ontario',
    'province.princeEdwardIsland': 'Prince Edward Island',
    'province.quebec': 'Québec',
    'province.saskatchewan': 'Saskatchewan',
    
    // Student Types
    'studentType.fullTimeUndergrad': 'Full-time Undergraduate',
    'studentType.fullTimeGraduate': 'Full-time Graduate',
    'studentType.partTimeUndergrad': 'Part-time Undergraduate',
    'studentType.partTimeGraduate': 'Part-time Graduate',
    
    // Metrics
    'metrics.totalUniversities': 'Total Universities',
    'metrics.totalStudents': 'Total Students',
    'metrics.avgEnrollment': 'Average Enrollment',
    'metrics.topProvince': 'Top Province',
    
    // Language
    'language.english': 'English',
    'language.french': 'Français',
    
    // Common
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.select': 'Select...',
    'common.students': 'Students',
    'common.percentage': 'Percentage',
  },
  fr: {
    // Dashboard
    'dashboard.title': 'Analytique des Inscriptions Universitaires Canadiennes',
    'dashboard.subtitle': 'Analyse complète des inscriptions étudiantes dans les universités canadiennes',
    'dashboard.description': 'Explorez les tendances d\'inscription, comparez les universités et analysez la démographie étudiante par province.',
    
    // Charts
    'chart.topUniversities.title': 'Meilleures Universités par Inscription Totale',
    'chart.topUniversities.description': 'Comparaison des plus grandes universités par nombre total d\'étudiants',
    'chart.studentTypes.title': 'Répartition par Type d\'Étudiant',
    'chart.studentTypes.description': 'Répartition des inscriptions par type d\'étudiant dans toutes les universités',
    
    // Controls
    'controls.province': 'Province',
    'controls.province.all': 'Toutes les Provinces',
    'controls.studentType': 'Type d\'Étudiant',
    'controls.universities': 'Nombre d\'Universités',
    
    // Provinces
    'province.alberta': 'Alberta',
    'province.britishColumbia': 'Colombie-Britannique',
    'province.manitoba': 'Manitoba',
    'province.newBrunswick': 'Nouveau-Brunswick',
    'province.newfoundlandLabrador': 'Terre-Neuve-et-Labrador',
    'province.novaScotia': 'Nouvelle-Écosse',
    'province.ontario': 'Ontario',
    'province.princeEdwardIsland': 'Île-du-Prince-Édouard',
    'province.quebec': 'Québec',
    'province.saskatchewan': 'Saskatchewan',
    
    // Student Types
    'studentType.fullTimeUndergrad': 'Premier cycle à temps plein',
    'studentType.fullTimeGraduate': 'Cycle supérieur à temps plein',
    'studentType.partTimeUndergrad': 'Premier cycle à temps partiel',
    'studentType.partTimeGraduate': 'Cycle supérieur à temps partiel',
    
    // Metrics
    'metrics.totalUniversities': 'Total des Universités',
    'metrics.totalStudents': 'Total des Étudiants',
    'metrics.avgEnrollment': 'Inscription Moyenne',
    'metrics.topProvince': 'Province Principale',
    
    // Language
    'language.english': 'English',
    'language.french': 'Français',
    
    // Common
    'common.loading': 'Chargement...',
    'common.noData': 'Aucune donnée disponible',
    'common.select': 'Sélectionner...',
    'common.students': 'Étudiants',
    'common.percentage': 'Pourcentage',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 