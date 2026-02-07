
import React, { useState, useEffect } from 'react';;
import Dashboard from './components/Dashboard';
import RunTracker from './components/RunTracker';
import RoutesView from './components/RoutesView';
import WeeklyPlan from './components/WeeklyPlan';
import RouteDetailView from './components/RouteDetailView';
import ActivityHistoryView from './components/ActivityHistoryView';
import AchievementsView from './components/AchievementsView';
import { Activity, UserStats, TrainingPlan, RunningRoute } from './types';
import { TRAINING_PLANS, VIGO_ROUTES } from './constants';
import { Bell, Settings, ArrowLeft } from 'lucide-react';

type ViewState = 'dashboard' | 'routes' | 'run' | 'plans' | 'profile' | 'route-detail' | 'history' | 'achievements';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewState>('dashboard');
  const [lastTab, setLastTab] = useState<ViewState>('dashboard');
  const [selectedRoute, setSelectedRoute] = useState<RunningRoute | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(TRAINING_PLANS[0]);
  
  const [stats, setStats] = useState<UserStats>({
    totalKm: 42.8,
    totalTime: 18450,
    totalRuns: 12,
    personalBest5k: "24:15"
  });

  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', date: new Date().toISOString(), distance: 5.2, duration: 1650, calories: 420, averagePace: "5:17" },
    { id: '2', date: new Date(Date.now() - 86400000).toISOString(), distance: 8.5, duration: 2700, calories: 680, averagePace: "5:18" },
    { id: '3', date: new Date(Date.now() - 259200000).toISOString(), distance: 3.1, duration: 900, calories: 250, averagePace: "4:50" },
    { id: '4', date: new Date(Date.now() - 432000000).toISOString(), distance: 10.0, duration: 3300, calories: 810, averagePace: "5:30" },
    { id: '5', date: new Date(Date.now() - 604800000).toISOString(), distance: 6.2, duration: 1980, calories: 510, averagePace: "5:20" },
  ]);

  const navigateTo = (view: ViewState) => {
    if (['dashboard', 'routes', 'plans', 'profile'].includes(view)) {
      setLastTab(view);
    }
    setActiveTab(view);
  };

  const handleFinishRun = (dist: number, dur: number) => {
    const newActivity: Activity = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      distance: parseFloat(dist.toFixed(2)),
      duration: dur,
      calories: Math.round(dist * 75),
      averagePace: "5:15"
    };

    setActivities([newActivity, ...activities]);
    setStats(prev => ({
      ...prev,
      totalKm: prev.totalKm + newActivity.distance,
      totalRuns: prev.totalRuns + 1,
      totalTime: prev.totalTime + dur
    }));
    setIsTracking(false);
    navigateTo('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          stats={stats} 
          activities={activities} 
          onActivityClick={() => navigateTo('history')}
          onAchievementClick={() => navigateTo('achievements')}
        />;
      case 'routes':
        return <RoutesView onRouteSelect={(route) => {
          setSelectedRoute(route);
          navigateTo('route-detail');
        }} />;
      case 'route-detail':
        return selectedRoute ? (
          <RouteDetailView 
            route={selectedRoute} 
            onBack={() => navigateTo('routes')} 
            onStart={() => setIsTracking(true)}
          />
        ) : null;
      case 'history':
        return <ActivityHistoryView activities={activities} onBack={() => navigateTo('dashboard')} />;
      case 'achievements':
        return <AchievementsView stats={stats} onBack={() => navigateTo('dashboard')} />;
      case 'plans':
        return (
          <div className="flex flex-col space-y-6 pb-32 pt-4">
            {selectedPlan && <WeeklyPlan schedule={selectedPlan.weeklySchedule || []} planTitle={selectedPlan.title} />}
          </div>
        );
      case 'profile':
        return (
          <div className="flex flex-col space-y-6 pb-32 pt-4">
            <div className="flex items-center gap-4">
               <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-3xl font-black border-4 border-slate-900 shadow-xl">V</div>
               <div>
                  <h2 className="text-2xl font-bold">Vigo Runner</h2>
                  <p className="text-slate-400 text-sm">Nivel 14 • Corredor Avanzado</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <button onClick={() => navigateTo('history')} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-left">
                  <div className="text-xl font-bold">{stats.totalRuns}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Carreras Totales</div>
               </button>
               <button onClick={() => navigateTo('achievements')} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-left">
                  <div className="text-xl font-bold">142</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Logros Obtenidos</div>
               </button>
            </div>
          </div>
        );
      default:
        return <Dashboard stats={stats} activities={activities} onActivityClick={() => {}} onAchievementClick={() => {}} />;
    }
  };

  useEffect(() => {
    if (activeTab === 'run') {
      setIsTracking(true);
    }
  }, [activeTab]);

  const showHeader = !isTracking && !['route-detail', 'history', 'achievements'].includes(activeTab);

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-slate-950 px-6">
      {showHeader && (
        <header className="flex justify-between items-center h-16 sticky top-0 bg-slate-950/80 backdrop-blur-lg z-40">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white italic">V</div>
             <span className="font-bold tracking-tight text-xl">VigoRun</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative"><Bell className="w-6 h-6 text-slate-400" /></button>
            <button><Settings className="w-6 h-6 text-slate-400" /></button>
          </div>
        </header>
      )}

      {/* Global Back Button for sub-views that don't have their own header style */}
      {!showHeader && !isTracking && ['history', 'achievements'].includes(activeTab) && (
        <button 
          onClick={() => navigateTo(lastTab)}
          className="flex items-center gap-2 text-slate-400 pt-6 mb-4 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
      )}

      <main>
        {renderContent()}
      </main>

      {!isTracking && (
        <Navigation activeTab={['route-detail'].includes(activeTab) ? 'routes' : (['history', 'achievements'].includes(activeTab) ? 'dashboard' : activeTab)} setActiveTab={(t) => navigateTo(t as ViewState)} />
      )}

      {isTracking && (
        <RunTracker 
          onFinish={handleFinishRun} 
          onCancel={() => {
            setIsTracking(false);
            navigateTo(lastTab);
          }} 
        />
      )}
    </div>
  );
};

export default App;
