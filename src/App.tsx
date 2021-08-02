import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from 'src/pages/Home';
import { NewRoom } from 'src/pages/NewRoom';
import { Room } from 'src/pages/Room';
import { AdminRoom } from 'src/pages/AdminRoom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Toaster position="top-right" />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
