import ReactDOM from 'react-dom/client';
import './index.css';

import { Test } from '@blog/components/core';

function App() {
	return <Test />;
}

ReactDOM.createRoot(document.querySelector('#app') as Element).render(<App />);
