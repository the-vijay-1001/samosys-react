import logo from './logo.svg';
import './App.css';
import Todo from './components/todo';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import User from './components/user';

function App() {
  return <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/todo' element={<Todo />} />
      <Route path='/user' element={<User />} />
    </Routes>
    {/* <Todo /> */}
  </>
}

export default App;
