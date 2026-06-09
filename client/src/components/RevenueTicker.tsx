import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

export function RevenueTicker() {
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [weekRevenue, setWeekRevenue] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate revenue updates
    const interval = setInterval(() => {
      // Random small revenue increase (0-5 EUR)
      const increase = Math.random() * 5;
      setTodayRevenue(prev => prev + increase);
      setWeekRevenue(prev => prev + increase);
      setMonthRevenue(prev => prev + increase);
      
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-600" />
        <span className="text-sm font-medium text-gray-700">Heute:</span>
        <span className={`text-sm font-bold text-green-600 transition-all ${isAnimating ? 'scale-110' : 'scale-100'}`}>
          €{todayRevenue.toFixed(2)}
        </span>
      </div>
      
      <div className="h-4 w-px bg-gray-300" />
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Diese Woche:</span>
        <span className="text-sm font-bold text-blue-600">
          €{weekRevenue.toFixed(2)}
        </span>
      </div>

      <div className="h-4 w-px bg-gray-300" />

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Dieser Monat:</span>
        <span className="text-sm font-bold text-purple-600">
          €{monthRevenue.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
