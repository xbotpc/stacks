import { Provider } from 'react-redux';
import store from '../../state/store';
import Game from '../Game/Game';

function App() {

  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
