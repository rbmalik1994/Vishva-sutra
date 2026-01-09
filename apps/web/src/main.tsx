import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@vishva-sutra/ui';
import './index.css';
import { createAppRouter, RouterRoot } from './router';

const queryClient = new QueryClient();
const router = createAppRouter(queryClient);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <a href="#main" className="skip-link">
      Skip to main content
    </a>
    <ThemeProvider storageKey="vishva-theme" defaultTheme="system">
      <RouterRoot router={router} queryClient={queryClient} />
    </ThemeProvider>
  </React.StrictMode>
);
