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
                <div className="text-content">
            <h1>WELCOME TO</h1>
            <h2>MY CHANNEL</h2>

            <article>
                <p>I'm Summer.</p>
                <p>A desiner in ShenZhen.</p>
                <p>I like to do some interesting</p>
                <p>designs in my free time</p>
                <p>Oh I also like photography and</p>
                <p>diving.</p>
            </article>
        </div>
                    <Route path="/" exact component={ loadDymaticModule('./components/home') } />
                    {/* <Route path="/" exact component={lazy(() => import('./components/home'))} /> */}
                </div>
            </Router>
        )
    }
}


export default App;

