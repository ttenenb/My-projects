import './App.css';

import { useState } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Raffles from './Raffles';
import Home from './Home';
import Weather from './Weather';
import ErrorComponent from './ErrorComponent';
import PageNotFound from './PageNotFound';
import Loading from './Loading';

function App() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const errorDisplay = error ? <ErrorComponent error={error} setError={setError} /> : null;
  const loadingDisplay = loading ? <Loading /> : null;

  return (
    <div className='text-center h-100 w-100'>
      <Header />
      {errorDisplay}

      {loadingDisplay}
      <Switch>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/weather'>
          <Weather setError={setError} setLoading={setLoading} />
        </Route>
        <Route path='/rafflePicker'>
          <Raffles contacts={contacts} setContacts={setContacts} setError={setError} setLoading={setLoading} />
        </Route>

        <Redirect from='/' to='/home' exact />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
