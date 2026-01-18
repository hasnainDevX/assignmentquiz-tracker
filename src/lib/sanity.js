// src/lib/sanity.js
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'fmvvts18', // Your project ID
  dataset: 'production',
  useCdn: true, // set to false if you need fresh data
  apiVersion: '2024-01-18', // use current date
});

// Fetch all assignments
export const fetchAssignments = async () => {
  try {
    const query = '*[_type == "assignment"] | order(dueDate asc)';
    const assignments = await client.fetch(query);
    return assignments.map(assignment => ({
      id: assignment._id,
      title: assignment.title,
      course: assignment.course,
      courseCode: assignment.courseCode,
      type: assignment.type,
      dueDate: assignment.dueDate,
      description: assignment.description,
      status: 'pending' // Default status, managed locally in localStorage
    }));
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return [];
  }
};

// Fetch single assignment by ID
export const fetchAssignmentById = async (id) => {
  try {
    const query = `*[_type == "assignment" && _id == $id][0]`;
    const assignment = await client.fetch(query, { id });
    return assignment;
  } catch (error) {
    console.error('Error fetching assignment:', error);
    return null;
  }
};