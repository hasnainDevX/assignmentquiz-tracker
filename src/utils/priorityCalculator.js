// src/utils/priorityCalculator.js

export const calculatePriority = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const daysUntilDue = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDue < 0) return 'overdue';
  if (daysUntilDue <= 2) return 'urgent';
  if (daysUntilDue <= 7) return 'high';
  if (daysUntilDue <= 14) return 'medium';
  return 'low';
};

export const getPriorityColor = (priority) => {
  const colors = {
    overdue: 'from-red-500 to-rose-600',
    urgent: 'from-orange-500 to-red-500',
    high: 'from-amber-500 to-orange-500',
    medium: 'from-blue-500 to-indigo-500',
    low: 'from-green-500 to-emerald-500'
  };
  return colors[priority] || colors.low;
};

export const getPriorityBadgeColor = (priority) => {
  const colors = {
    overdue: 'bg-red-100 text-red-700 border-red-200',
    urgent: 'bg-orange-100 text-orange-700 border-orange-200',
    high: 'bg-amber-100 text-amber-700 border-amber-200',
    medium: 'bg-blue-100 text-blue-700 border-blue-200',
    low: 'bg-green-100 text-green-700 border-green-200'
  };
  return colors[priority] || colors.low;
};