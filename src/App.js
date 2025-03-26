import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Layout from './Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import DeleteTodo from './pages/DeleteTodo';
import ViewTodo from './pages/ViewTodo';

function App() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const { exp } = jwtDecode(token);
      const now = Date.now() / 1000;

      if (exp < now) {
        localStorage.removeItem('token');
        console.log('Token expired — removed from localStorage');
      }
    } catch (err) {
      console.error('Invalid token — removing');
      localStorage.removeItem('token');
    }
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/edit-todo/:id" element={<EditTodo />} />
          <Route path="/delete-todo/:id" element={<DeleteTodo />} />
          <Route path="/view-todo/:id" element={<ViewTodo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
