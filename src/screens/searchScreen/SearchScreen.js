import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { getVideoBySearch } from '../../redux/actions/video.action';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'
import './_searchScreen.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SearchScreen = () => {
    const {query} = useParams();
    // console.log(query);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoBySearch(query))
    }, [query, dispatch])

    const {loading, videos} = useSelector(state => state.searchedVideos);

    return (
        <Container className="searchScreen">
            {!loading ? 
            videos?.map(video => (
                <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
            )) 
            : 
            (<SkeletonTheme color="#343a40" highlightColor="#3c4147">
             <Skeleton width="100%" height="160px" count={20} />
            </SkeletonTheme>)
        }
        </Container>

    )
}

export default SearchScreen
