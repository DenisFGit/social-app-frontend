import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllExhibits, getMyExhibits, createPost, deleteExhibit } from '../../api/exhibitActions';
import type { Post } from '../../api/exhibitActions';
import { AxiosError } from 'axios';
import type { User } from './userSlice';

export interface Exhibit {
    id: number;
    imageUrl: string,
    description: string;
    user: User,
    commentCount: number;
    createdAt: string;
}

export interface ExhibitState {
    items: Exhibit[];
    myItems: Exhibit[];
    current: Exhibit | null;

    isLoading: boolean;
    error: boolean | null;
}

const initialState: ExhibitState = {
    items: [],
    myItems: [],
    current: null,

    isLoading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk(
    'exhibits/fetchAll',
    async (page: number, { rejectWithValue }) => {
        try {
            const res = await getAllExhibits(page);
            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data || "Fetch failed");
        }
    }
);

export const fetchMyPosts = createAsyncThunk(
    'exhibits/fetchMyPosts',
    async (page: number, { rejectWithValue }) => {
        try {
            const res = await getMyExhibits(page);

            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data || "Fetch failed");
        }
    });


export const sendPost = createAsyncThunk(
    'exhibits/sendPost',
    async (post: Post, { rejectWithValue }) => {

        try {
            const formData = new FormData();
            formData.append('image', post.file!);
            formData.append('description', post.description);

            const res = await createPost(formData);


            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data || "Fetch failed");
        }
    }
)

export const deletePost = createAsyncThunk<number, number>(
    "exhibits/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            await deleteExhibit(id);
            return id;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data || "Failed to delete");
        }
    }
);


const exhibitSlice = createSlice({
    name: 'exhibits',
    initialState,
    reducers: {
        incrementCommentCount: (state, action: { payload: number }) => {
            const postId = action.payload;

            const post = state.items.find((p) => p.id === postId);
            if (post) post.commentCount += 1;

            const myPost = state.myItems.find((p) => p.id === postId);
            if (myPost) myPost.commentCount += 1;
        },

        decrementCommentCount: (state, action: { payload: number }) => {
            const postId = action.payload;

            const post = state.items.find((p) => p.id === postId);
            if (post) post.commentCount -= 1;

            const myPost = state.myItems.find((p) => p.id === postId);
            if (myPost) myPost.commentCount -= 1;
        },

    },
    extraReducers: (builder) => {
        builder
            //Get all posts
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;

            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })

            //Get my posts

            .addCase(fetchMyPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchMyPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myItems = action.payload.data;
            })

            .addCase(fetchMyPosts.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })

            // Create post
            .addCase(sendPost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(sendPost.rejected, (state) => {
                state.error = true;
            })

            // Delete post
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
                state.myItems = state.myItems.filter(item => item.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });

    }

})

export const { incrementCommentCount, decrementCommentCount } = exhibitSlice.actions;
export default exhibitSlice.reducer;