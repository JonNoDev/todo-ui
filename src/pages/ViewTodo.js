import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    CircularProgress,
    IconButton
} from '@mui/material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 404) {
                    setTodo(null);
                    return;
                }

                if (!res.ok) throw new Error('Failed to fetch todo');

                const data = await res.json();
                setTodo(data);
            } catch (err) {
                console.error('Error loading todo:', err);
            } finally {
                setLoading(false);
            }
        };


        fetchTodo();
    }, [id, token]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    if (!todo) {
        return (
            <Typography variant="h6" align="center" mt={10}>
                Todo not found
            </Typography>
        );
    }

    return (
        <Box
            maxWidth="700px"
            mx="auto"
            mt={10}
            px={3}
        >
            <IconButton
                onClick={() => navigate(-1)}
                sx={{ alignSelf: 'flex-start', mb: 1 }}
            >
                <ArrowBackIcon />
            </IconButton>



            <Typography variant="h4" gutterBottom sx={{
                    textAlign: 'center',
                }}>
                {todo.title}
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    lineHeight: 1.8,
                    textAlign: 'center',
                    mb: 4
                }}
            >
                {todo.description}
            </Typography>

            <Typography variant="subtitle1" gutterBottom sx={{
                    textAlign: 'center',
                }}>
                <strong>Status:</strong>{' '}
                <span style={{ fontWeight: 700 }}>
                    {todo.complete ? 'COMPLETE' : 'INCOMPLETE'}
                </span>
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                <Button
                    component={RouterLink}
                    to={`/edit-todo/${todo.id}`}
                    variant="contained"
                    sx={{
                        backgroundColor: '#ffc107',
                        textTransform: 'none',
                        borderRadius: '20px',
                        px: 3
                    }}
                >
                    Edit
                </Button>
                <Button
                    component={RouterLink}
                    to={`/delete-todo/${todo.id}`}
                    variant="contained"
                    sx={{
                        backgroundColor: '#d32f2f',
                        textTransform: 'none',
                        borderRadius: '20px',
                        px: 3
                    }}
                >
                    Delete
                </Button>
            </Stack>
        </Box>
    );
};

export default ViewTodo;
