// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Route, Routes, Link } from 'react-router-dom';
import { Summoner } from './summoner/summoner';

export function App() {
  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/summoner">Match history by Summoner Name</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Summoner />}
        />
        <Route
          path="/summoner"
          element={<Summoner />}
        />
      </Routes>
    </>
  );
}

export default App;
