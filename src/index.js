import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import CommentBox from './CommentBox';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<CommentBox />, document.getElementById('root'));
registerServiceWorker();
