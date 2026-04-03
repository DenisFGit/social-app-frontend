import { Box, Button } from "@mui/material";
import { useAppSelector } from "../store/hooks";

interface PaginationProps {
    pageNum: number;
    lastPage: number;
    changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    pageNum,
    lastPage,
    changePage
}) => {
    const loading = useAppSelector((state) => state.exhibits.isLoading);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px"
            }}
        >
            <Button
                variant="contained"
                onClick={() => changePage(pageNum - 1)}
                disabled={loading || pageNum === 1}
            >
                Prev
            </Button>

            <div style={{ fontSize: "20px" }}>{pageNum}</div>

            <Button
                variant="contained"
                onClick={() => changePage(pageNum + 1)}
                disabled={loading || pageNum === lastPage}
            >
                Next
            </Button>
        </Box>
    );
};

export default Pagination;