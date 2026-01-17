// src/utils/localStorage.js

const STORAGE_KEY = 'assignmentTracker';

// Get all data from localStorage
export const getStorageData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Return null if no data exists (first time user)
    return null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

// Save all data to localStorage
export const saveStorageData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Get assignments only
export const getAssignments = () => {
  const data = getStorageData();
  return data?.assignments || [];
};

// Save assignments
export const saveAssignments = (assignments) => {
  const data = getStorageData() || { 
    assignments: [],
    userPreferences: { viewMode: 'grid', sortBy: 'dueDate', filterType: 'all', theme: 'light' },
    stats: { totalCompleted: 0, currentStreak: 0, bestStreak: 0, lastCompletedDate: null }
  };
  data.assignments = assignments;
  return saveStorageData(data);
};

// Toggle assignment completion status
export const toggleAssignmentStatus = (id, assignments) => {
  const data = getStorageData() || { 
    assignments: [],
    userPreferences: { viewMode: 'grid', sortBy: 'dueDate', filterType: 'all', theme: 'light' },
    stats: { totalCompleted: 0, currentStreak: 0, bestStreak: 0, lastCompletedDate: null }
  };
  
  // Update the assignments array
  data.assignments = assignments.map(assignment => {
    if (assignment.id === id) {
      const wasCompleted = assignment.status === 'completed';
      const newStatus = wasCompleted ? 'pending' : 'completed';
      
      // Update stats
      if (!wasCompleted) {
        data.stats.totalCompleted += 1;
        data.stats.lastCompletedDate = new Date().toISOString();
        updateStreak(data);
      } else {
        data.stats.totalCompleted = Math.max(0, data.stats.totalCompleted - 1);
      }
      
      return { ...assignment, status: newStatus };
    }
    return assignment;
  });
  
  saveStorageData(data);
  return data.assignments;
};

// Update streak tracking
const updateStreak = (data) => {
  const today = new Date().toDateString();
  const lastCompleted = data.stats.lastCompletedDate 
    ? new Date(data.stats.lastCompletedDate).toDateString() 
    : null;
  
  if (lastCompleted === today) {
    // Already completed today, don't update streak
    return;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  if (lastCompleted === yesterdayStr) {
    // Continue streak
    data.stats.currentStreak += 1;
  } else {
    // Start new streak
    data.stats.currentStreak = 1;
  }
  
  // Update best streak
  if (data.stats.currentStreak > data.stats.bestStreak) {
    data.stats.bestStreak = data.stats.currentStreak;
  }
};

// Get user preferences
export const getUserPreferences = () => {
  const data = getStorageData();
  return data?.userPreferences || {
    viewMode: 'grid',
    sortBy: 'dueDate',
    filterType: 'all',
    theme: 'light'
  };
};

// Save user preferences
export const saveUserPreferences = (preferences) => {
  const data = getStorageData() || {
    assignments: [],
    userPreferences: { viewMode: 'grid', sortBy: 'dueDate', filterType: 'all', theme: 'light' },
    stats: { totalCompleted: 0, currentStreak: 0, bestStreak: 0, lastCompletedDate: null }
  };
  data.userPreferences = { ...data.userPreferences, ...preferences };
  return saveStorageData(data);
};

// Get stats
export const getStats = () => {
  const data = getStorageData();
  return data?.stats || {
    totalCompleted: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastCompletedDate: null
  };
};

// Initialize with mock data if needed
export const initializeWithMockData = (mockAssignments) => {
  const existing = getStorageData();
  if (!existing || existing.assignments.length === 0) {
    const data = {
      assignments: mockAssignments,
      userPreferences: { viewMode: 'grid', sortBy: 'dueDate', filterType: 'all', theme: 'light' },
      stats: { totalCompleted: 0, currentStreak: 0, bestStreak: 0, lastCompletedDate: null }
    };
    saveStorageData(data);
    return mockAssignments;
  }
  return existing.assignments;
};

// Clear all data (reset)
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};