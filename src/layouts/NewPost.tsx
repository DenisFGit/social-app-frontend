import { useFormik } from "formik";
import * as Yup from "yup";

import { Box, Button, TextField, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { sendPost } from "../store/slices/exhibitSlices";

import { useNavigate } from "react-router-dom";


interface NewPostValues {
    file: File | null;
    description: string;
}

const NewPost = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const error = useAppSelector((state) => state.exhibits.error);

    const formik = useFormik<NewPostValues>({
        initialValues: {
            file: null,
            description: "",
        },
        validationSchema: Yup.object({
            file: Yup.mixed<File>()
                .required("Image is required"),
            description: Yup.string()
                .min(3, "At least 3 characters")
                .required("Description is required"),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(
                    sendPost({
                        file: values.file!,
                        description: values.description,
                    })
                ).unwrap();

                navigate('/');
            } catch (error) {
                console.log('Error: ' + error);
            }
        },
    });

    return (
        <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <Typography variant="h4" mb={3}
                sx={{
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                New post page
            </Typography>

            {error
                ? <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Error while creating a post
                </p>
                : <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Add image and description no create new post
                </p>
            }

            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: '10px' }}
            >
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null;
                        formik.setFieldValue("file", file);
                        formik.setFieldTouched("file", true);
                    }}
                />

                {formik.values.file && !formik.errors.file && (
                    <Typography color="success.main" variant="body2">
                        Image selected: {formik.values.file.name}
                    </Typography>
                )}


                <TextField
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                    }
                    helperText={
                        formik.touched.description &&
                        formik.errors.description
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={formik.isSubmitting}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default NewPost;