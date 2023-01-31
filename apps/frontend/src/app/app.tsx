// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Route, Routes, Link } from 'react-router-dom';
import { Summoner } from './summoner/summoner';

export function App() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto my-11 grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3">
          Menu
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
        </div>
        <div className="row-span-2 col-span-2 ...">
          <Routes>
            <Route path="/" element={<Summoner />} />
            <Route path="/summoner" element={<Summoner />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
