import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import Home from './components/home/Home';
import NewWord from './components/newword/NewWord';

function App() {
  let routes = [
      <Route exact path="/" component={Home} key={1}/>,
      <Route path="/login" component={Login} key={2}  />,
      <Route path="/signUp" component={SignUp} key={3}/>,
      <Route path="/new" component={NewWord} key={4}/>
  ]
  return (
    <Switch>{routes}</Switch>
  );
  
}

export default App;
