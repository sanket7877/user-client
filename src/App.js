import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from "./components/HeaderComponent";
import ListUsers from "./components/LIstUsers"
import CreateUser from "./components/CreateUser"

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path = "/" exact component = {ListUsers}/>
            <Route path = "/users" component = {ListUsers}/>
            <Route path = "/add-user/:id" component = {CreateUser}/>

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
