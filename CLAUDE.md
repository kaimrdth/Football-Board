# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, high-performance Soccer Tactics Board application built with React, TypeScript, and optimized tooling. The application provides an interactive soccer field where users can position and manage players from two teams with advanced drag-and-drop functionality and real-time state management.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom components and glassmorphism design
- **Drag & Drop**: @dnd-kit for performant, accessible drag-and-drop
- **State Management**: Zustand with Immer for efficient state updates
- **Performance**: Optimized with React.memo, selective subscriptions, and code splitting

## Project Structure

```
src/
├── components/          # React components
│   ├── DragContext.tsx  # @dnd-kit drag context provider
│   ├── Player.tsx       # Individual player component
│   ├── Ball.tsx         # Ball component
│   ├── Pitch.tsx        # Soccer field with markings
│   └── Controls.tsx     # Formation and action controls
├── stores/              # Zustand state management
│   └── gameStore.ts     # Main game state with actions
├── types/               # TypeScript type definitions
│   └── index.ts         # Player, Position, Formation types
├── utils/               # Utility functions
│   ├── index.ts         # Common utilities (cn, constrainToPitch, etc.)
│   └── formations.ts    # Formation definitions and player creation
├── hooks/               # Custom React hooks (future use)
├── App.tsx              # Main application component
├── main.tsx             # React application entry point
└── index.css            # Tailwind CSS and custom styles
```

## Key Architecture Decisions

### Performance Optimizations
- **React.memo**: All components are memoized to prevent unnecessary re-renders
- **Selective Subscriptions**: Zustand selectors used to subscribe only to needed state slices
- **@dnd-kit**: Replaces vanilla drag-and-drop for better performance and accessibility
- **Immer Integration**: Immutable state updates with readable syntax
- **Code Splitting**: Vendor chunks separated for better caching

### State Management
- **Zustand Store**: Single source of truth for game state
- **Immer Middleware**: Enables direct state mutations while maintaining immutability  
- **Subscription Optimization**: Components only re-render when their specific data changes

### Component Architecture
- **DragContext**: Centralized drag-and-drop logic with @dnd-kit
- **Isolated Components**: Each component handles its own rendering and local state
- **Type Safety**: Full TypeScript coverage for better developer experience

## Common Development Tasks

### Running the Application
```bash
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Development Workflow
- **Hot Reload**: Vite provides instant updates during development
- **TypeScript**: Full type checking during development and build
- **State Debugging**: Zustand integrates with React DevTools

### Key Files to Understand
- `src/stores/gameStore.ts`: All game state and actions
- `src/components/DragContext.tsx`: Drag-and-drop behavior
- `src/utils/formations.ts`: Formation templates and player positioning
- `src/types/index.ts`: TypeScript interfaces for type safety

## Performance Features

### Drag & Drop Optimizations
- **@dnd-kit**: Accessibility-first, performant drag library
- **Transform-based Movement**: Uses CSS transforms for smooth animations
- **Constraint Logic**: Boundary checking optimized with utility functions
- **Touch Support**: Full mobile/tablet touch interaction support

### Rendering Optimizations
- **Selective Updates**: Only affected components re-render on state changes
- **Memoized Calculations**: Formation positions and colors cached
- **Efficient Event Handling**: Throttled/debounced interactions where needed

### Build Optimizations
- **Code Splitting**: Automatic vendor chunk separation
- **Tree Shaking**: Unused code eliminated in production builds
- **Asset Optimization**: Images and styles optimized by Vite

## Adding New Features

### New Formations
1. Add formation definition to `FORMATIONS` in `src/utils/formations.ts`
2. Update `FormationType` union type in `src/types/index.ts`
3. Add to formation selector options in `src/components/Controls.tsx`

### New Player Actions
1. Add action to Zustand store in `src/stores/gameStore.ts`
2. Use Immer syntax for state updates
3. Export selector hooks if needed for performance

### New Components
1. Follow React.memo pattern for performance
2. Use Tailwind classes with `cn()` utility for styling
3. Subscribe to specific state slices with Zustand selectors

## Code Conventions

- **TypeScript**: Strict mode enabled, full type coverage required
- **React**: Functional components with hooks, memo for optimization
- **Styling**: Tailwind CSS classes, custom components in `index.css`
- **State**: Zustand with Immer, immutable updates only
- **Imports**: Absolute imports from `src/`, organized by type

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Android 90+
- **Features**: CSS Grid, Flexbox, CSS Transforms required