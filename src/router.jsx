import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SelectPlayer from './pages/SelectPlayer';
import SelectMatch from './pages/SelectMatch';
import PlayerStats from './pages/PlayerStats';
import PlayerPage from './pages/PlayerPage';
import ComparePage from './pages/ComparePage';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/player', element: <SelectPlayer /> },
  { path: '/match', element: <SelectMatch /> },
  { path: '/player-stats', element: <PlayerStats /> },
  { path: '/player/:id', element: <PlayerPage /> },
  { path: '/compare/:id1/:id2', element: <ComparePage /> },
  { path: '*', element: <div>페이지를 찾을 수 없습니다.</div> },
]);
