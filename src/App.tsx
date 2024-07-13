import './App.css';
import KpiDashboard from './components/KpiDashboard';

function App() {
  return (
    <div className="py-8 mx-4">
      <h1 className="text-3xl font-medium mb-8 text-center">Metric Tiles</h1>
      <KpiDashboard />
    </div>
  );
}

export default App;
