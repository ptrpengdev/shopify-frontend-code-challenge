import React, {
    useState,
    useCallback
} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { fetchNASA } from '../actions/postActions';
import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';


const theme = createTheme({
    palette: {
        primary: {
            main: '#131313',
        }

    },
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Home({ dispatch, fetchSucess, nasaData, loading, fetching, ...rest }) {

    const [like, setLike] = useState(false);
    const [displayMore, setDisplayMore] = useState(false);
    const [copySucess, setCopySucess] = useState(false);

    const fetchData = useCallback(() => {
        dispatch(fetchNASA())
    }, [dispatch]);


    const onClickDisplayMore = () => {
        setDisplayMore(!displayMore);
    }

    const onClickLike = () => {
        setLike(!like);
    }

    const handleCopySucess = () => {
        setCopySucess(!copySucess);

    }

    const copyToClipboard = (imgUrl) => {
        const element = document.createElement('textarea');
        element.value = imgUrl;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);
        handleCopySucess();
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={false}>
                {fetchSucess ?
                    <Snackbar open={true} autoHideDuration={1000}  >
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Fetch Data Sucess!
                        </Alert>
                    </Snackbar>
                    : null}

                {copySucess ?
                    <Snackbar open={copySucess} autoHideDuration={1500} onClose={handleCopySucess}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Image Link Copied!
                        </Alert>
                    </Snackbar>
                    : null}

                <Box m={2} pt={10}>
                    {nasaData == null ?
                        fetching ? null : <Typography
                            variant="subtitle2"
                            color="textSecondary"
                        >
                            Please Click The Button to Fetch Data.
                    </Typography> :
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={nasaData.url}
                                alt="Image URL invalid"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {nasaData.title} 
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {nasaData.date} 
                                </Typography>
                                {/* Exapand */}
                                <Typography variant="body2" color="text.secondary"
                                    sx={!displayMore ? {
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 10,
                                    } : {}}>
                                    {nasaData.explanation}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Tooltip title={like ? "Unlike" : "Like"}>
                                    <IconButton aria-label="add to favorites" onClick={onClickLike}>
                                        {like ? <FavoriteIcon /> : <FavoriteBorder />}
                                    </IconButton>
                                </Tooltip>
                                <Button 
                                    size="small" 
                                    onClick={() => copyToClipboard(nasaData.url)}>
                                        Share
                                </Button>
                                <Button size="small" onClick={onClickDisplayMore}>
                                    {displayMore ? "Collapse" : "Expand"}
                                </Button>
                            </CardActions>
                        </Card>}

                </Box>

                <Box m={2} pt={3}>
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            {fetching ? null : <LoadingButton
                                onClick={fetchData}
                                endIcon={<FileDownloadRoundedIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                color="primary"
                            >
                                {nasaData == null ?
                                    "Fecch" : "Re-Fetch"}
                            </LoadingButton>}
                        </Grid>
                    </Grid>
                </Box>

            </Container>
        </ThemeProvider>
    );
}

function mapStateToProps(state) {
    return {
        fetchSucess: state.post.fetchSucess,
        loading: state.post.loading,
        fetching: state.post.fetching,
        nasaData: state.post.nasaData
    };
}

export default connect(mapStateToProps)(Home);
