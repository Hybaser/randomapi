# Random API

This project is a flexible Random Generator API capable of producing integers, GUIDs, random strings, and topic-based content.

> **Note:** This API was entirely developed by an **Artificial Intelligence**. The development process was managed through automated tasks (similar to Jira), where the AI planned, implemented, and verified each feature step-by-step.

## Features

-   **Integer Generation**: Random numbers within a configurable range.
-   **GUID Generation**: Standard UUID v4.
-   **Random Strings**: Customizable length and character sets (special characters).
-   **Topic-based Strings**: Generates words related to specific topics (e.g., Science, Technology).
-   **Swagger Documentation**: Fully documented interactive API interface.

## AI Development Process

The project was built using an agentic AI workflow:
1.  **Planning**: Created a detailed implementation plan and task list.
2.  **Execution**: Systematically implemented features (Core Logic -> API Layer -> Validation).
3.  **Verification**: Wrote and ran unit/integration tests to ensure quality.

## Getting Started

### Prerequisites

-   Node.js
-   npm

### Installation

```bash
npm install
```

### Running the Application

To start the development server (default port: 3005):

```bash
npm run dev
```

### Testing

Run the automated test suite:

```bash
npm test
```

## API Documentation

Once the server is running, visit the interactive Swagger documentation at:

```
http://localhost:3005/api-docs
```

## API Endpoints

-   `GET /api/random?type=integer&min=1&max=100`
-   `GET /api/random?type=guid`
-   `GET /api/random?type=string&len=12&special=true`
-   `GET /api/random?topic=technology`
