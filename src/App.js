import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import {Provider} from './Context';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index'
import Lyrics from './components/track/Lyrics';

class  App extends React.Component{
 
  render(){
    return (
      <Provider>
        <React.Fragment>
          <Router>
             <Navbar />
            <div className="container">
                <Switch>
                    <Route path='/' exact component={Index} />
                    <Route path='/lyrics/track/:id' exact component={Lyrics} />
                    <Route path="*">
                        <h1 className="p-4 display-2">Page Not Found, 404!!</h1>
                    </Route>
                </Switch>
            </div>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
 
}

export default App;
