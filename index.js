// Root entry point for Hostinger deployment
import('./dist/index.js').catch(err => {
  console.error('Failed to load application:', err);
  process.exit(1);
});
