import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>
);
