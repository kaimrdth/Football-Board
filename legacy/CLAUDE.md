# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Soccer Tactics Board application - a single-page HTML application that provides an interactive soccer field where users can position and manage players from two teams. The entire application is contained in a single HTML file (`footballboard.html`) with embedded CSS and JavaScript.

## Project Structure

- `footballboard.html` - Complete standalone application containing HTML structure, CSS styling, and JavaScript functionality

## Application Features

The application provides:
- Interactive soccer field with proper pitch markings (penalty areas, goal areas, center circle, etc.)
- Two teams (red and blue) with default formations (4-4-2 for red, 4-3-3 for blue)
- Drag-and-drop functionality for players and ball
- Player editing capabilities (name, number, color) via double-click
- Roster management modal for bulk editing
- Formation reset and team switching functions
- Responsive design with glassmorphism UI styling

## Architecture

### Core Data Structure
- `teams` object contains player arrays for 'red' and 'blue' teams
- Each player object has: id, number, name, color, team properties
- Formations are defined as coordinate arrays (x, y percentages)

### Key Functions
- `createPlayer()` - Creates player data and DOM element
- `setupDragAndDrop()` - Handles mouse/touch drag interactions
- `setFormation()` - Positions players according to formation templates
- `openPlayerModal()` / `openRosterModal()` - Manage editing interfaces

### Styling
- CSS custom properties for theming (dark background with cyan accents)
- Glassmorphism effects using backdrop-filter
- Responsive player positioning using absolute coordinates
- Modal overlays for editing interfaces

## Development Notes

Since this is a single HTML file application:
- No build process or package manager required
- Open `footballboard.html` directly in a web browser to run
- All dependencies are vanilla HTML/CSS/JavaScript
- No external libraries or frameworks used

## Common Tasks

- **Run Application**: Open `footballboard.html` in any modern web browser
- **Test Changes**: Refresh browser after saving modifications to the HTML file
- **Debug**: Use browser developer tools console for JavaScript debugging

## Code Conventions

- Vanilla JavaScript (no frameworks)
- CSS custom properties for consistent theming
- Event delegation for drag/drop interactions
- Modular function structure for different features (player management, formations, UI)
- Inline styles for dynamic positioning and colors