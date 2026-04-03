'use client'
import { Link } from 'react-router-dom';
import { logout } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Box, Button } from '@mui/material';
import './Navigation.scss';

const Navigation = () => {

    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => Boolean(state.user.token)
    );

    return (
        <Box sx={{
            position: 'fixed',
            zIndex: '3',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#27A6F5',
            color: '#fff',
            padding: '20px'

        }}>
            <ul className='nav__menu'>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/new-post'>New post</Link>
                </li>
                <li>
                    <Link to='/'>Stripe</Link>
                </li>
            </ul>
            {isAuthenticated
                ? <Button className="nav__btn" onClick={() => dispatch(logout())}
                    sx={{
                        backgroundColor: 'white',
                        fontWeight: 700,
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#CDEDF7'
                        }
                    }}
                >Log out
                </Button>
                : <Link to='/login'>
                    <Button className="nav__btn"
                        sx={{
                            backgroundColor: 'white',
                            fontWeight: 700,
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#CDEDF7'
                            }
                        }}
                    >Log in</Button>
                </Link>}
        </Box>

    )
}

export default Navigation