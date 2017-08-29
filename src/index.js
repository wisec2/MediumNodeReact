import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import CityBox from './CityBox';

ReactDOM.render(<CityBox 
                 url='http://localhost:3001/api/lookup' />, 
                 document.getElementById('root')
               );

registerServiceWorker();
