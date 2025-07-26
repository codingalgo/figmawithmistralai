# Figma Test Case Generator

## Overview

This is a Flask-based web application that integrates with Figma's API and Mistral AI to automatically generate test cases from Figma design files. The application extracts UI elements from Figma designs and uses AI to create structured test cases for quality assurance and testing purposes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology**: HTML5 with Bootstrap 5 (dark theme)
- **Styling**: Bootstrap CSS framework with Font Awesome icons
- **JavaScript**: Vanilla JavaScript for DOM manipulation and API calls
- **UI Pattern**: Single-page application with real-time form interactions

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Structure**: Simple MVC pattern with route handlers in `app.py`
- **API Integration**: Custom service class (`SimpleFigmaTestGenerator`) for external API calls
- **Session Management**: Flask sessions with configurable secret key

### Data Processing
- **Input**: Figma file keys and user preferences
- **Processing**: Element extraction from Figma API responses and AI-powered test case generation
- **Output**: Structured test cases in JSON format

## Key Components

### Core Application (`app.py`)
- Main Flask application with two primary routes
- Environment-based configuration for API credentials
- Request handling for test case generation
- Template rendering for the web interface

### Figma Integration (`figma_generator.py`)
- `SimpleFigmaTestGenerator` class for API interactions
- Figma API client for file data extraction
- Mistral AI client for test case generation
- Element parsing and data transformation logic

### Web Interface (`templates/index.html`)
- Bootstrap-based responsive design
- Real-time API status checking
- Form handling for user inputs
- Results display and copy functionality

### Client-Side Logic (`static/js/main.js`)
- Form submission handling
- Mode switching between fixed and AI-generated test cases
- API health checking
- User interaction management

## Data Flow

1. **Input Collection**: User provides Figma file key and selects generation mode
2. **API Authentication**: Application uses environment variables for Figma and Mistral API credentials
3. **Element Extraction**: Figma API call retrieves design file data and parses UI elements
4. **Test Generation**: Based on mode selection:
   - Fixed mode: Uses predefined test case templates
   - AI mode: Sends element data to Mistral AI for custom test case generation
5. **Response Processing**: Test cases are formatted and returned to the client
6. **Display**: Results are shown in the web interface with copy functionality

## External Dependencies

### APIs
- **Figma API**: For accessing design files and extracting UI elements
- **Mistral AI API**: For generating intelligent test cases from design data

### Python Packages
- **Flask**: Web framework for handling HTTP requests and responses
- **requests**: HTTP client library for external API calls

### Frontend Libraries
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library for UI elements

## Deployment Strategy

### Environment Configuration
- API credentials managed through environment variables
- Fallback to demo tokens for development
- Session secret key configurable for production security

### Development Setup
- Simple Flask development server
- Template and static file serving through Flask
- Debug logging enabled for development

### Production Considerations
- Environment variable configuration required for API keys
- Session secret key must be changed from default
- HTTPS recommended for API credential security

### Scalability Notes
- Stateless design allows for horizontal scaling
- External API rate limits may require request throttling
- Session-based architecture suitable for moderate concurrent users

## Architecture Decision Rationale

### Flask Choice
- **Problem**: Need for lightweight web framework
- **Solution**: Flask for simplicity and flexibility
- **Rationale**: Quick development, minimal boilerplate, good for API integration projects

### External API Integration
- **Problem**: Need AI capabilities and design file access
- **Solution**: Direct API integration with Figma and Mistral
- **Rationale**: Leverages existing specialized services rather than building complex features

### Client-Side Processing
- **Problem**: Need responsive user interface
- **Solution**: Vanilla JavaScript with Bootstrap
- **Rationale**: Avoids heavy frameworks while maintaining good UX and responsiveness

### Environment-Based Configuration
- **Problem**: Secure credential management
- **Solution**: Environment variables with fallback values
- **Rationale**: Standard practice for API key security and environment separation