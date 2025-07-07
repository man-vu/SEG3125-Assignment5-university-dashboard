export interface UniversityData {
  universityName: string;
  fullTimeUndergrad: number;
  fullTimeGraduate: number;
  partTimeUndergrad: number;
  partTimeGraduate: number;
  province: string;
}

export const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland & Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Québec',
  'Saskatchewan'
];

export const studentTypes = [
  { key: 'fullTimeUndergrad', label: { en: 'Full-time Undergraduate', fr: 'Premier cycle à temps plein' } },
  { key: 'fullTimeGraduate', label: { en: 'Full-time Graduate', fr: 'Cycle supérieur à temps plein' } },
  { key: 'partTimeUndergrad', label: { en: 'Part-time Undergraduate', fr: 'Premier cycle à temps partiel' } },
  { key: 'partTimeGraduate', label: { en: 'Part-time Graduate', fr: 'Cycle supérieur à temps partiel' } }
];

export const parseCSVData = (csvText: string): UniversityData[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      universityName: values[0],
      fullTimeUndergrad: parseInt(values[1]) || 0,
      fullTimeGraduate: parseInt(values[2]) || 0,
      partTimeUndergrad: parseInt(values[3]) || 0,
      partTimeGraduate: parseInt(values[4]) || 0,
      province: values[5]
    };
  }).filter(uni => uni.universityName && uni.province); // Filter out empty entries
};

export const getTopUniversities = (data: UniversityData[], count: number = 10): UniversityData[] => {
  return data
    .map(uni => ({
      ...uni,
      totalEnrollment: uni.fullTimeUndergrad + uni.fullTimeGraduate + uni.partTimeUndergrad + uni.partTimeGraduate
    }))
    .sort((a, b) => b.totalEnrollment - a.totalEnrollment)
    .slice(0, count);
};

export const getEnrollmentByProvince = (data: UniversityData[]): { province: string; total: number }[] => {
  const provinceMap = new Map<string, number>();
  
  data.forEach(uni => {
    const total = uni.fullTimeUndergrad + uni.fullTimeGraduate + uni.partTimeUndergrad + uni.partTimeGraduate;
    provinceMap.set(uni.province, (provinceMap.get(uni.province) || 0) + total);
  });
  
  return Array.from(provinceMap.entries())
    .map(([province, total]) => ({ province, total }))
    .sort((a, b) => b.total - a.total);
};

export const getStudentTypeBreakdown = (data: UniversityData[]) => {
  const totals = data.reduce((acc, uni) => ({
    fullTimeUndergrad: acc.fullTimeUndergrad + uni.fullTimeUndergrad,
    fullTimeGraduate: acc.fullTimeGraduate + uni.fullTimeGraduate,
    partTimeUndergrad: acc.partTimeUndergrad + uni.partTimeUndergrad,
    partTimeGraduate: acc.partTimeGraduate + uni.partTimeGraduate
  }), {
    fullTimeUndergrad: 0,
    fullTimeGraduate: 0,
    partTimeUndergrad: 0,
    partTimeGraduate: 0
  });
  
  return totals;
};

export const filterByProvince = (data: UniversityData[], province: string): UniversityData[] => {
  if (!province || province === 'All') return data;
  return data.filter(uni => uni.province === province);
}; 