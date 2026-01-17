// src/utils/dateUtils.js

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  
  const formatted = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  if (diff < 0) return { text: `${formatted}`, label: 'Overdue', days: diff };
  if (diff === 0) return { text: `${formatted}`, label: 'Today', days: diff };
  if (diff === 1) return { text: `${formatted}`, label: 'Tomorrow', days: diff };
  if (diff <= 7) return { text: `${formatted}`, label: `${diff} days`, days: diff };
  return { text: formatted, label: `${diff} days`, days: diff };
};

export const getDaysUntilDue = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
};