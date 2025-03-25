import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import DeleteTodo from './pages/DeleteTodo';

function App() {
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
          <Route path="/view-todo/:id" element={<DeleteTodo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
