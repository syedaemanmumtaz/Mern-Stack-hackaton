import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskBoard from './pages/TaskBoard';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
    </Router>
  );
}

export default App;