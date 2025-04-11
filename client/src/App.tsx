import './App.css'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import { useStateProvider } from './utils/StateProvider';

export default function App() {
  const [{items}] = useStateProvider();

  return (
    items.length === 0 ? <HomePage/> :
    <GamePage/>
  )
}
