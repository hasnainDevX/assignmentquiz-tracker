// src/components/StatsOverview.jsx
import React from 'react';
import { BookOpen, Clock, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      icon: BookOpen,
      label: 'Total Assignments',
      value: stats.total,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Clock,
      label: 'Due This Week',
      value: stats.upcoming,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: AlertCircle,
      label: 'Overdue',
      value: stats.overdue,
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      icon: CheckCircle2,
      label: 'Completed',
      value: stats.completed,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            
            {/* Progress bar for completion rate */}
            {stat.label === 'Completed' && stats.total > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Completion Rate</span>
                  <span className="font-semibold">{stats.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${stats.completionRate}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;