import { TextField, Button, Box } from "@mui/material";
import type { FormikProps } from "formik";

interface LoginFormValues {
    username: string;
    password: string;
}

interface LoginFormProps {
    formik: FormikProps<LoginFormValues>;
}

const LoginForm = ({ formik }: LoginFormProps) => {
    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 300,
                marginTop: '15px'
            }}
        >
            <TextField
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;