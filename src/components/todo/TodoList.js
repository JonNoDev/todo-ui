import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    Paper,
    CircularProgress
} from '@mui/material';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch todos');

                const data = await res.json();
                setTodos(data.todos);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [token]);

    const filteredTodos = todos.filter(todo => {
        if (filter === 'All') return true;
        if (filter === 'COMPLETE') return todo.completed === true;
        if (filter === 'INCOMPLETE') return todo.completed === false;
        return true;
    });


    return (
        <Box sx={{ mt: 10, px: 2, fontFamily: 'Montserrat, sans-serif' }}>
            <Typography variant="h4" align="center" gutterBottom>
                User’s Todo List
            </Typography>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ maxWidth: 800, mx: 'auto', mb: 2 }}
            >
                <Typography variant="subtitle1" sx={{ width: '33%' }}>
                    Name
                </Typography>
                <Typography variant="subtitle1" sx={{ width: '33%' }}>
                    Status
                </Typography>
                <Box sx={{ width: '33%', textAlign: 'right' }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Filters</InputLabel>
                        <Select value={filter} label="Filters" onChange={e => setFilter(e.target.value)}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="COMPLETE">Complete</MenuItem>
                            <MenuItem value="INCOMPLETE">Incomplete</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack spacing={2} sx={{ maxWidth: 800, mx: 'auto' }}>
                    {filteredTodos.map(todo => (
                        <Paper
                            key={todo.id}
                            elevation={1}
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#d5e5f7',
                                borderRadius: '12px'
                            }}
                        >
                            <Typography fontWeight="600" sx={{ width: '33%' }}>
                                {todo.title}
                            </Typography>
                            <Typography fontWeight="bold" sx={{ width: '33%' }}>
                                {todo.completed ? "COMPLETE" : "INCOMPLETE"}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ width: '33%', justifyContent: 'flex-end' }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    component={RouterLink}
                                    to={`/view-todo/${todo.id}`}
                                    sx={{ backgroundColor: '#00bcd4' }}
                                >
                                    View
                                </Button>

                                <Button
                                    size="small"
                                    variant="contained"
                                    component={RouterLink}
                                    to={`/edit-todo/${todo.id}`}
                                    sx={{ backgroundColor: '#ffc107' }}
                                >
                                    Edit
                                </Button>

                                <Button
                                    size="small"
                                    variant="contained"
                                    component={RouterLink}
                                    to={`/delete-todo/${todo.id}`}
                                    sx={{ backgroundColor: '#d32f2f' }}
                                >
                                    Delete
                                </Button>

                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}

            <Box display="flex" justifyContent="center" mt={4}>
                <Button
                    component={RouterLink}
                    to="/add-todo"
                    variant="contained"
                    sx={{
                        backgroundColor: '#00bcd4',
                        borderRadius: '20px',
                        px: 4,
                        py: 1,
                        textTransform: 'none'
                    }}
                >
                    Add Item
                </Button>
            </Box>

        </Box>
    );
};

export default TodoList;
