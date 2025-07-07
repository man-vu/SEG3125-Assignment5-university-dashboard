# Canadian University Enrollment Analytics Dashboard

A comprehensive, interactive dashboard for analyzing Canadian university enrollment data built with React, TypeScript, Tailwind CSS, and Recharts.

## Features

### 📊 **Two Interactive Charts**
1. **Bar Chart**: Top Universities by Total Enrollment
   - Stacked bar chart showing enrollment breakdown by student type
   - Interactive filtering by province
   - Configurable number of universities displayed
   - Detailed tooltips with enrollment data

2. **Area Chart**: Student Type Distribution
   - Visual representation of enrollment distribution across student types
   - Percentage breakdown with summary statistics
   - Responsive design with smooth animations

### 🌍 **Bilingual Support (English/French)**
- Complete internationalization with React Context
- Language toggle in the dashboard controls
- Localized number formatting (Canadian locale)
- All UI elements and chart labels support both languages

### 🎛️ **Interactive Controls**
- **Province Filter**: Filter data by Canadian provinces
- **University Count**: Adjust the number of universities displayed (5-25)
- **Language Toggle**: Switch between English and French

### 📈 **Key Metrics Dashboard**
- Total Universities count
- Total Students enrolled
- Average Enrollment per university
- Top Province by enrollment

### 🎨 **Design Principles Applied**

#### **3Cs Framework**
- **Context**: Clear titles, descriptions, and explanations for each chart
- **Clutter-Free**: Clean design with proper spacing, minimal chartjunk
- **Contrast**: Strategic use of colors, typography hierarchy, and visual emphasis

#### **Visual Design Principles**
- **Color Theme**: Consistent blue primary theme with supporting colors
- **Typography**: Clear hierarchy with proper font weights and sizes
- **Layout**: Responsive grid system with proper negative space
- **Visual Hierarchy**: Clear information architecture and flow
- **Gestalt Principles**: Proper grouping, similarity, and continuity

#### **Usability Heuristics**
- **Visibility of System Status**: Loading states and clear feedback
- **User Control and Freedom**: Easy navigation and reset options
- **Consistency and Standards**: Consistent UI patterns throughout
- **Error Prevention**: Proper form validation and user guidance
- **Recognition over Recall**: Clear labels and intuitive controls
- **Flexibility and Efficiency**: Multiple ways to interact with data
- **Aesthetic and Minimalist Design**: Clean, modern interface
- **Help and Documentation**: Clear descriptions and tooltips

## Technical Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Internationalization**: Custom i18n solution

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd university-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx              # Main dashboard component
│   ├── DashboardControls.tsx      # Interactive controls
│   ├── DashboardMetrics.tsx       # Key metrics display
│   ├── TopUniversitiesChart.tsx   # Bar chart component
│   └── StudentTypesChart.tsx      # Area chart component
├── contexts/
│   └── LanguageContext.tsx        # Internationalization context
├── utils/
│   └── dataUtils.ts               # Data processing utilities
├── universities_data.csv          # University enrollment data
└── App.tsx                        # Root application component
```

## Data Source

The dashboard uses Canadian university enrollment data including:
- Full-time Undergraduate students
- Full-time Graduate students
- Part-time Undergraduate students
- Part-time Graduate students
- University names and provinces

## Design Decisions

### Chart Selection
- **Bar Chart**: Chosen for comparing discrete categories (universities) with multiple data series
- **Area Chart**: Selected for showing distribution and proportions across student types

### Color Scheme
- **Primary Blue**: Professional and trustworthy
- **Supporting Colors**: Green, orange, purple for different student types
- **Neutral Grays**: For backgrounds and text

### Layout Strategy
- **Responsive Grid**: Adapts to different screen sizes
- **Card-based Design**: Clear separation of content areas
- **Consistent Spacing**: 8px grid system for visual harmony

### Accessibility Features
- Proper ARIA labels
- Keyboard navigation support
- High contrast color combinations
- Screen reader friendly structure

## Future Enhancements

- Additional chart types (pie charts, scatter plots)
- Data export functionality
- Advanced filtering options
- Historical data comparison
- Mobile-optimized interactions
- Dark mode theme
- Data refresh capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
