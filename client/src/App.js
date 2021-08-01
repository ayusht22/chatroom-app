import 'bootstrap/dist/css/bootstrap.min.css'
import Chat from './components/Chat';
import Join from './components/Join';
import {BrowserRouter as Router ,Route} from 'react-router-dom'

function App() {
  
  return (
    <Router>
    
      <Route path="/" exact component={Join}/>
      <Route path="/chat" exact component={Chat}/>
 
    </Router>
  );
}


export default App;
