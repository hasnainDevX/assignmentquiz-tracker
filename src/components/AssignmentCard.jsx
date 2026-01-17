// src/components/AssignmentCard.jsx
import React from 'react';
import { Calendar, Clock, ExternalLink, CheckCircle, Circle, BookOpen, FileText, Brain, Presentation, LucideFlaskConical } from 'lucide-react';
import { calculatePriority, getPriorityColor, getPriorityBadgeColor } from '../utils/priorityCalculator';
import { formatDate } from '../utils/dateUtils';

const AssignmentCard = ({ assignment, onToggleStatus }) => {
  const priority = calculatePriority(assignment.dueDate);
  const priorityGradient = getPriorityColor(priority);
  const priorityBadge = getPriorityBadgeColor(priority);
  const dateInfo = formatDate(assignment.dueDate);

  // Get type icon
  const getTypeIcon = (type) => {
    const icons = {
      quiz: Brain,
      assignment: FileText,
      exam: BookOpen,
      project: ExternalLink,
      presentation: Presentation,
      lab: LucideFlaskConical
    };
    return icons[type] || FileText;
  };

  const TypeIcon = getTypeIcon(assignment.type);

  // Get type display info
  const getTypeInfo = (type) => {
    const types = {
      quiz: { color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Quiz' },
      assignment: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Assignment' },
      exam: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Exam' },
      project: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Project' },
      presentation: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Presentation' },
      lab: { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', label: 'Lab' }
    };
    return types[type] || types.assignment;
  };

  const typeInfo = getTypeInfo(assignment.type);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Priority indicator bar */}
      <div className={`h-1.5 bg-gradient-to-r ${priorityGradient}`}></div>
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`${typeInfo.color} p-2.5 rounded-lg border`}>
              <TypeIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {assignment.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-700">{assignment.course}</span>
                {assignment.courseCode && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{assignment.courseCode}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Status toggle */}
          <button
            onClick={() => onToggleStatus(assignment.id)}
            className="ml-2 flex-shrink-0"
          >
            {assignment.status === 'completed' ? (
              <CheckCircle className="w-6 h-6 text-green-500 hover:text-green-600 transition-colors" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300 hover:text-blue-500 transition-colors" />
            )}
          </button>
        </div>

        {/* Description */}
        {assignment.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {assignment.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Due date */}
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">{dateInfo.text}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              dateInfo.days < 0 ? 'bg-red-100 text-red-700' :
              dateInfo.days <= 2 ? 'bg-orange-100 text-orange-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {dateInfo.label}
            </span>
          </div>

          {/* Type badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${typeInfo.color}`}>
            {typeInfo.label}
          </span>
        </div>

        {/* Priority badge */}
        <div className="mt-3">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${priorityBadge}`}>
            <Clock className="w-3.5 h-3.5 mr-1" />
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;