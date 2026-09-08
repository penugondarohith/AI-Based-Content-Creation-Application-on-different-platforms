# ContentForge AI

Industry-Aware AI Content Intelligence Platform

## Live Demo

Explore the interactive public demo here:

- https://ai-based-content-creation-applicati.vercel.app/demo
- Local demo route: http://localhost:3000/demo

## Overview

ContentForge AI is a comprehensive content intelligence platform that helps teams move from industry insight to campaign execution. The platform combines brand context, content strategy, AI-generated campaign copy, visual direction, post composition, and multi-platform optimization in one workflow.

## Key Features

- Industry-aware strategy and planning
- Brand knowledge and creativity capture
- Content generation workflow with quality review
- AI-driven visual generation
- Final post composition and export-ready creative generation
- Public interactive demo mode for product walkthroughs
- Platform-specific adaptation for Instagram, LinkedIn, Facebook, and X

## Architecture

The project follows a layered architecture:

- App routing and experience layer in src/app
- Component-driven UI in src/components
- Business logic in src/engine
- Service layer in src/services
- Shared types in src/types
- Demo content in src/demo

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### 3. Production build

```bash
npm run build
```

### 4. Run the production build locally

```bash
npm start
```

## Demo Mode

The application includes a public demo route at /demo that allows visitors to explore the product without an account or API key.

This demo includes:

- industry intelligence walkthrough
- brand and campaign configuration overview
- strategy generation flow
- example generated posts
- final post composition and creative preview
- platform optimization explorer
- analytics summary
- guided product tour

## Workflow Summary

1. Configure the project and select an industry
2. Add brand context and references
3. Create or review the content strategy
4. Generate campaign content and visuals
5. Compose final post creatives
6. Review content quality and export results
7. Adapt content for platform-specific market needs

## Deployment

The app is deployed on Vercel:

https://ai-based-content-creation-applicati.vercel.app/

## Notes

- Demo data is preconfigured and stable for public exploration.
- Authentication is required only for the protected app experience.
- Demo mode is isolated from real project data.
- The app keeps the existing Phase 1–8 architecture intact while extending the workflow with final post generation and demo exploration.
