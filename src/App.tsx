import { LanguageProvider } from './contexts/LanguageContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  );
}

export default App;
