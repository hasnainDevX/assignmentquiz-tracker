// src/App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import AssignmentCard from './components/AssignmentCard';
import {
  initializeWithMockData,
  toggleAssignmentStatus,
  getUserPreferences,
  saveUserPreferences,
  getStats,
  saveAssignments
} from './utils/localStorage';

// Mock data for initial load (only if localStorage is empty)
const mockAssignments = [
  {
    id: 1,
    title: 'React Component Architecture Quiz',
    course: 'Web Development',
    courseCode: 'CS301',
    type: 'quiz',
    dueDate: '2026-01-18T10:00:00',
    status: 'pending',
    description: 'Covering hooks, state management, and component lifecycle'
  },
  {
    id: 2,
    title: 'Database Design Project',
    course: 'Database Systems',
    courseCode: 'CS402',
    type: 'project',
    dueDate: '2026-01-25T23:59:00',
    status: 'pending',
    description: 'Design and implement a normalized database schema'
  },
  {
    id: 3,
    title: 'Algorithm Analysis Assignment',
    course: 'Data Structures',
    courseCode: 'CS201',
    type: 'assignment',
    dueDate: '2026-01-20T17:00:00',
    status: 'pending',
    description: 'Big O notation and time complexity analysis'
  },
  {
    id: 4,
    title: 'Midterm Exam',
    course: 'Software Engineering',
    courseCode: 'CS350',
    type: 'exam',
    dueDate: '2026-01-22T14:00:00',
    status: 'pending',
    description: 'Chapters 1-5, SDLC, Agile, Testing'
  },
  {
    id: 5,
    title: 'Linear Algebra Problem Set',
    course: 'Mathematics',
    courseCode: 'MATH205',
    type: 'assignment',
    dueDate: '2026-02-01T23:59:00',
    status: 'pending',
    description: 'Matrix operations and eigenvalues'
  },
  {
    id: 6,
    title: 'UI/UX Presentation',
    course: 'Human-Computer Interaction',
    courseCode: 'CS380',
    type: 'presentation',
    dueDate: '2026-01-28T11:00:00',
    status: 'pending',
    description: 'Present usability testing results'
  },
  {
    id: 7,
    title: 'Machine Learning Lab 3',
    course: 'Artificial Intelligence',
    courseCode: 'CS450',
    type: 'lab',
    dueDate: '2026-01-19T23:59:00',
    status: 'pending',
    description: 'Implement neural network from scratch'
  },
  {
    id: 8,
    title: 'Research Paper Draft',
    course: 'Computer Science Research',
    courseCode: 'CS499',
    type: 'project',
    dueDate: '2026-01-30T23:59:00',
    status: 'pending',
    description: 'Submit first draft of research paper'
  }
];

function App() {
  // Load from localStorage or use mock data
  const [assignments, setAssignments] = useState(() => {
    return initializeWithMockData(mockAssignments);
  });

  const [userPrefs, setUserPrefs] = useState(() => getUserPreferences());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(userPrefs.filterType);
  const [sortBy, setSortBy] = useState(userPrefs.sortBy);
  const [viewMode, setViewMode] = useState(userPrefs.viewMode);
  const [userStats, setUserStats] = useState(() => getStats());

  // Save to localStorage whenever assignments change
  useEffect(() => {
    saveAssignments(assignments);
  }, [assignments]);

  // Save preferences when they change
  useEffect(() => {
    saveUserPreferences({
      viewMode,
      sortBy,
      filterType
    });
  }, [viewMode, sortBy, filterType]);

  // Toggle assignment status
  const handleToggleStatus = (id) => {
    const updatedAssignments = toggleAssignmentStatus(id, assignments);
    setAssignments(updatedAssignments);
    setUserStats(getStats());
  };

  // Filter and sort assignments
  const filteredAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || assignment.type === filterType;
      return matchesSearch && matchesType;
    });

    // Sort by selected criteria
    filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'priority') {
        const calculatePriority = (dueDate) => {
          const now = new Date();
          const due = new Date(dueDate);
          const days = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
          if (days < 0) return 0;
          if (days <= 2) return 1;
          if (days <= 7) return 2;
          if (days <= 14) return 3;
          return 4;
        };
        return calculatePriority(a.dueDate) - calculatePriority(b.dueDate);
      }
      if (sortBy === 'course') {
        return a.course.localeCompare(b.course);
      }
      return 0;
    });

    return filtered;
  }, [assignments, searchTerm, filterType, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const upcoming = assignments.filter(a => {
      const due = new Date(a.dueDate);
      const days = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
      return days >= 0 && days <= 7 && a.status !== 'completed';
    }).length;

    const overdue = assignments.filter(a => new Date(a.dueDate) < now && a.status !== 'completed').length;
    const completed = assignments.filter(a => a.status === 'completed').length;

    return {
      total: assignments.length,
      upcoming,
      overdue,
      completed,
      completionRate: Math.round((completed / assignments.length) * 100) || 0,
      streak: userStats.currentStreak,
      bestStreak: userStats.bestStreak
    };
  }, [assignments, userStats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header stats={userStats} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Assignments Grid/List */}
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No assignments found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredAssignments.map(assignment => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;