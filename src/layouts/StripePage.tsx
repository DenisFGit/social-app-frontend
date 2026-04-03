import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPosts } from "../store/slices/exhibitSlices";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Box } from "@mui/material";
import Pagination from "../components/Pagination";
import Post from "../components/Post";
import "./StripePage.scss";

// import { useNewPostSocket } from "../hooks/useNewPostSocket";

const StripePage = () => {

    // useNewPostSocket();

    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const posts = useAppSelector((state) => state.exhibits.items);
    const isLoading = useAppSelector((state) => state.exhibits.isLoading);
    const error = useAppSelector((state) => state.exhibits.error);

    const pageNum = Number(searchParams.get("page")) || 1;
    const [lastPage, setLastPage] = useState<number>(1);

    const changePage = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    useEffect(() => {
        const fetchExhibits = async () => {
            try {
                const response = await dispatch(fetchPosts(pageNum)).unwrap();
                setLastPage(response.lastPage);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchExhibits();
    }, [pageNum, dispatch]);


    if (isLoading) {
        return (
            <Box sx={{ textAlign: 'center', fontSize: '30px' }}>
                Loading exhibits...
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', fontSize: '30px' }}>
                Error in fetching exhibits...
            </Box>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="stripe">
                <h1 className="stripe__title">StripePage</h1>
                There are no exhibits available
            </div>
        );
    }

    return (
        <div className="stripe">
            <h1 className="stripe__title">StripePage</h1>

            <Pagination pageNum={pageNum} lastPage={lastPage} changePage={changePage} />

            <div className="stripe__content">
                {posts.map((item) => (
                    <Post key={item.id} item={item} />
                ))}
            </div>

            <Pagination pageNum={pageNum} lastPage={lastPage} changePage={changePage} />
        </div>
    );
};

export default StripePage;