// src/router.ts
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen' 

// Create the router instance
export const router = createRouter({
  routeTree,
  context: {}, 
  defaultPreload: 'intent',
})
