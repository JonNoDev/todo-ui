import { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';

const TodoForm = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (isEditMode) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    setTodo(data);
                })
                .catch(err => console.error('Failed to load todo', err));
        }
    }, [id, isEditMode, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTodo(prev => ({
            ...prev,
            [name]: name === 'completed' ? value === 'true' : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = isEditMode ? 'PUT' : 'POST';
        const endpoint = isEditMode
            ? `${process.env.REACT_APP_BACKEND_URL}/todos/${id}`
            : `${process.env.REACT_APP_BACKEND_URL}/todos`;

        const payload = isEditMode
            ? todo
            : {
                title: todo.title,
                description: todo.description
            };

        try {
            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error('Failed to submit');

            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mt: 10,
                mx: 'auto',
                width: '100%',
                maxWidth: 500,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                fontFamily: 'Montserrat, sans-serif'
            }}
        >
            <IconButton
                onClick={() => navigate(-1)}
                sx={{ alignSelf: 'flex-start', mt: -2 }}
            >
                <ArrowBackIcon />
            </IconButton>

            <Typography variant="h4" align="center">
                {isEditMode ? `Edit ${todo.title}` : 'Create Task'}
            </Typography>

            <TextField
                label="Name"
                name="title"
                variant="filled"
                value={todo.title}
                onChange={handleChange}
                fullWidth
                required
            />

            <TextField
                label="Description"
                name="description"
                variant="filled"
                value={todo.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={6}
            />

            {isEditMode && (
                <FormControl variant="filled" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="completed"
                        value={todo.completed === true ? 'true' : 'false'}
                        onChange={handleChange}
                    >
                        <MenuItem value="false">Incomplete</MenuItem>
                        <MenuItem value="true">Complete</MenuItem>
                    </Select>
                </FormControl>
            )}

            <Button
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: '#00bcd4',
                    borderRadius: '20px',
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    mx: 'auto'
                }}
            >
                {isEditMode ? 'Submit' : 'Create'}
            </Button>
        </Box>
    );
};

export default TodoForm;
