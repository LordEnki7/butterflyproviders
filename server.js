#!/usr/bin/env node

// Root entry point for production deployment
import('./dist/index.js').catch(err => {
  console.error('Error starting application:', err);
  process.exit(1);
});
