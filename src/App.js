import './styles.css';
import { Login } from './login';
import { Movies } from './movies';
import { useSelector, useDispatch } from 'react-redux'
import { isLoggedIn } from './redux/user'

function App() {
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const dispatch = useDispatch()

      dispatch(isLoggedIn())

      //if user is logged in shows Movies page, if not then shows Login page
  return (
    <div id="google_translate_element" className="App">
      {!userLoggedIn ? <Login /> : <Movies /> }
    </div>
  );
}

export default App;
