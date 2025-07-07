export interface UniversityData {
  universityName: string;
  fullTimeUndergrad: number;
  fullTimeGraduate: number;
  partTimeUndergrad: number;
  partTimeGraduate: number;
  province: string;
}

export const provinces = [
  { value: 'Alberta', translationKey: 'province.alberta' },
  { value: 'British Columbia', translationKey: 'province.britishColumbia' },
  { value: 'Manitoba', translationKey: 'province.manitoba' },
  { value: 'New Brunswick', translationKey: 'province.newBrunswick' },
  { value: 'Newfoundland & Labrador', translationKey: 'province.newfoundlandLabrador' },
  { value: 'Nova Scotia', translationKey: 'province.novaScotia' },
  { value: 'Ontario', translationKey: 'province.ontario' },
  { value: 'Prince Edward Island', translationKey: 'province.princeEdwardIsland' },
  { value: 'Québec', translationKey: 'province.quebec' },
  { value: 'Saskatchewan', translationKey: 'province.saskatchewan' }
];

export const studentTypes = [
  { key: 'fullTimeUndergrad', label: { en: 'Full-time Undergraduate', fr: 'Premier cycle à temps plein' } },
  { key: 'fullTimeGraduate', label: { en: 'Full-time Graduate', fr: 'Cycle supérieur à temps plein' } },
  { key: 'partTimeUndergrad', label: { en: 'Part-time Undergraduate', fr: 'Premier cycle à temps partiel' } },
  { key: 'partTimeGraduate', label: { en: 'Part-time Graduate', fr: 'Cycle supérieur à temps partiel' } }
];

export const parseCSVData = (csvText: string): UniversityData[] => {
  const lines = csvText.trim().split('\n');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      universityName: values[0],
      fullTimeUndergrad: parseInt(values[1]) || 0,
      fullTimeGraduate: parseInt(values[2]) || 0,
      partTimeUndergrad: parseInt(values[3]) || 0,
      partTimeGraduate: parseInt(values[4]) || 0,
      province: values[5]?.replace(/\r/g, '').trim() || ''
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
    const cleanProvince = uni.province?.replace(/\r/g, '').trim() || '';
    if (cleanProvince) {
      const total = uni.fullTimeUndergrad + uni.fullTimeGraduate + uni.partTimeUndergrad + uni.partTimeGraduate;
      provinceMap.set(cleanProvince, (provinceMap.get(cleanProvince) || 0) + total);
    }
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
  return data.filter(uni => {
    const cleanProvince = uni.province?.replace(/\r/g, '').trim() || '';
    return cleanProvince === province;
  });
}; 