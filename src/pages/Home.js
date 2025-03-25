import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import TodoList from '../components/todo/TodoList';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
      >
        <Typography variant="h5" gutterBottom>
          Please log in to view your todos
        </Typography>
        <Button
          onClick={() => navigate('/login')}
          variant="contained"
          sx={{
            backgroundColor: '#00bcd4',
            borderRadius: '20px',
            px: 4,
            py: 1,
            textTransform: 'none'
          }}
        >
          Login
        </Button>
      </Box>
    );
  }

  return <TodoList />;
};

export default Home;
