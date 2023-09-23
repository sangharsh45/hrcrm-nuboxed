import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
const MyApp = (props) => <div>helloworld</div>
it('renders without crashing', () => {
  const div = document.createElement('div');
  console.log(div)
  ReactDOM.render(<MyApp />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
