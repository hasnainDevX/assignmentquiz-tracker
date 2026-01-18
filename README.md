# AssignmentHub - Academic Assignment Tracker

A modern assignment tracking system for students to manage their academic deadlines efficiently. Built with React, Vite, Tailwind CSS, and Sanity CMS.

## Overview

AssignmentHub helps students stay organized by providing a clean interface to track assignments, quizzes, exams, and projects. The application features smart priority indicators based on due dates, completion tracking, and real-time statistics.

## Features

- Track multiple assignment types (quizzes, assignments, exams, projects, presentations, labs)
- Automatic priority calculation based on due dates
- Color-coded urgency indicators (overdue, urgent, high, medium, low)
- Filter and sort assignments by type, date, or priority
- Real-time statistics dashboard showing total, upcoming, overdue, and completed assignments
- Grid and list view options
- Persistent completion tracking using localStorage
- Responsive design for all screen sizes
- Integration with Sanity CMS for content management

## Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **Icons:** Lucide React
- **Storage:** LocalStorage API for user preferences and completion status

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/hasnaindevx/assignmentquiz-tracker.git
cd assignment-tracker
```

2. Install dependencies
```bash
npm install
```

3. Install Sanity dependencies
```bash
cd sanity
npm install
cd ..
```

4. Configure Sanity
   - Create a Sanity account at [sanity.io](https://www.sanity.io)
   - Update `src/lib/sanity.js` with your project ID and dataset
   - Add your localhost to CORS origins in Sanity settings

5. Run the development servers

Terminal 1 (React app):
```bash
npm run dev
```

Terminal 2 (Sanity Studio):
```bash
cd sanity
npm run dev
```

The React app will run on `http://localhost:5173` and Sanity Studio on `http://localhost:3333`

## Project Structure

```
assignment-tracker/
├── src/
│   ├── components/
│   │   ├── AssignmentCard.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── StatsOverview.jsx
│   ├── lib/
│   │   └── sanity.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   ├── localStorage.js
│   │   └── priorityCalculator.js
│   ├── App.jsx
│   └── main.jsx
├── sanity/
│   ├── schemaTypes/
│   │   ├── assignment.js
│   │   └── index.js
│   └── sanity.config.js
└── package.json
```

## Usage

### Adding Assignments

1. Open Sanity Studio at `http://localhost:3333`
2. Create a new Assignment document
3. Fill in the required fields:
   - Title
   - Course/Subject
   - Course Code
   - Type (quiz, assignment, exam, project, presentation, lab)
   - Due Date
   - Description
4. Publish the document
5. The assignment will appear in your React app

### Managing Assignments

- Click the circle icon on any assignment card to mark it as complete
- Use the search bar to find specific assignments or courses
- Filter assignments by type using the dropdown
- Sort by due date, priority, or course name
- Switch between grid and list views

## Sanity Schema

The assignment schema includes:
- `title` - Assignment title (required)
- `course` - Course/subject name (required)
- `courseCode` - Course identifier (e.g., CS101)
- `type` - Assignment type (required)
- `dueDate` - Due date and time (required)
- `description` - Assignment details

## Future Enhancements

Planned features for future releases:
- Browser notifications for upcoming deadlines
- Multi-page application with routing
- To-do list for daily tasks
- GPA calculator
- Study timer (Pomodoro technique)
- Calendar view
- Dark mode
- Export/import functionality
- Analytics and insights

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Built by [Hasnain](https://github.com/hasnaindevx)

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- CMS by [Sanity](https://www.sanity.io)
- Styling with [Tailwind CSS](https://tailwindcss.com)