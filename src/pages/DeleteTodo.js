import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
  } from '@mui/material';
  import { useParams, useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  
  const DeleteTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
  
    const token = localStorage.getItem('token');
  
    const handleDelete = async () => {
      setDeleting(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (!res.ok) throw new Error('Failed to delete');
  
        navigate('/'); // or wherever you want to go after delete
      } catch (err) {
        console.error(err);
        setDeleting(false);
      }
    };
  
    return (
      <Dialog open onClose={() => navigate(-1)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this todo?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate(-1)} disabled={deleting}>
            No
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteTodo;
  