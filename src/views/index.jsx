import React, { lazy } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import loadable from '@loadable/component'

import Home from './components/home';

class App extends React.Component {
    render() {

        let loadDymaticModule = (path) => loadable(()=> import('' + path));


        return (
            <Router>
                <div className="root-wrapper">
                    
                    <Route path="/" exact component={ loadDymaticModule('./components/home') } />
                    {/* <Route path="/" exact component={lazy(() => import('./components/home'))} /> */}
                </div>
            </Router>
        )
    }
}


export default App;

