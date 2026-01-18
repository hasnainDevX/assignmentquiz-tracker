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
  saveAssignments,
  getAssignments
} from './utils/localStorage';
import { fetchAssignments } from './lib/sanity';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPrefs, setUserPrefs] = useState(() => getUserPreferences());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(userPrefs.filterType);
  const [sortBy, setSortBy] = useState(userPrefs.sortBy);
  const [viewMode, setViewMode] = useState(userPrefs.viewMode);
  const [userStats, setUserStats] = useState(() => getStats());

  // Fetch assignments from Sanity on mount
  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        // Fetch from Sanity
        const sanityAssignments = await fetchAssignments();
        
        // Get local storage assignments (for status tracking)
        const localAssignments = getAssignments();
        
        // Merge: Use Sanity data but preserve local status
        const mergedAssignments = sanityAssignments.map(sanityAssignment => {
          const localMatch = localAssignments.find(local => local.id === sanityAssignment.id);
          return {
            ...sanityAssignment,
            status: localMatch?.status || 'pending'
          };
        });
        
        setAssignments(mergedAssignments);
        saveAssignments(mergedAssignments);
      } catch (error) {
        console.error('Error loading assignments:', error);
        // Fallback to localStorage if Sanity fails
        const localAssignments = getAssignments();
        setAssignments(localAssignments);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  // Save to localStorage whenever assignments change
  useEffect(() => {
    if (!loading) {
      saveAssignments(assignments);
    }
  }, [assignments, loading]);

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

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
            <p className="text-gray-500">
              {assignments.length === 0 
                ? 'Add assignments from your Sanity dashboard to get started'
                : 'Try adjusting your filters or search term'
              }
            </p>
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