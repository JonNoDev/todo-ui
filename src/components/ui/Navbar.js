import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#333' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <RouterLink to="/">
                    <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
                </RouterLink>

                <Box display="flex" alignItems="center" gap={2}>
                    {isLoggedIn ? (
                        <>
                            <Button
                                component={RouterLink}
                                to="/"
                                sx={{ color: '#fff', textTransform: 'none' }}
                            >
                                Home
                            </Button>
                            <Button
                                onClick={handleLogout}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#00bcd4',
                                    textTransform: 'none',
                                    borderRadius: '20px',
                                    px: 3
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                component={RouterLink}
                                to="/register"
                                sx={{ color: '#fff', textTransform: 'none' }}
                            >
                                Register
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#00bcd4',
                                    textTransform: 'none',
                                    borderRadius: '20px',
                                    px: 3
                                }}
                            >
                                Login
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
