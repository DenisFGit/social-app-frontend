
import { loginUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginForm from "../components/LoginForm";
import { Typography, Box } from "@mui/material";

const LoginPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector(
        (state) => Boolean(state.user.token)
    );

    const error = useAppSelector((state) => state.user.error);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Not less than 3 characters')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            password: Yup.string()
                .min(3, 'Not less than 3 characters')
                // .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(loginUser(values)).unwrap();

                navigate('/');
            } catch (error) {
                console.log('Error: ' + error);
            }
        },
    });


    return (
        <div>
            <Typography variant="h1"
                sx={{
                    fontSize: '40px',
                    textAlign: 'center',
                    marginTop: '20px'
                }}>LoginPage
            </Typography>
            {error
                ? <Box sx={{
                    textAlign: 'center'
                }}>Invalid username or password
                </Box>
                : null
            }

            {isAuthenticated
                ? <Typography variantMapping={{ body1: 'p' }}
                    sx={{
                        textAlign: 'center',
                        marginTop: '15px'
                    }}>You are logged in successfully</Typography>
                : <p style={{ textAlign: 'center' }}>Enter name and password to log in</p>
            }
            <Box
                component='section'
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <LoginForm formik={formik} />
            </Box>
        </div>

    )
}

export default LoginPage