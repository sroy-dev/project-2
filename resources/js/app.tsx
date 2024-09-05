import ReactDOM from 'react-dom/client';
import React from 'react';
import AppRoutes from '@/routes';

ReactDOM.createRoot(document.getElementById('app')!).render(
	<React.StrictMode>
        <AppRoutes />
    </React.StrictMode>
)