import React, {useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos, getVideoByCategory } from '../../redux/actions/video.action';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';
import './_homeScreen.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const {videos, activeCategory, loading} = useSelector(state => state.homeVideos);
    //#  homeVideos: {videos: [], loading, activeCategory} 


    useEffect(() => {

        dispatch(getPopularVideos())

    }, [dispatch])

    const fetchData = () => {
        if(activeCategory === 'All') {

            dispatch(getPopularVideos())
        } else {
            dispatch(getVideoByCategory(activeCategory))
        }
    }

    return (
        <Container className="homeScreen">
            <CategoriesBar />
            <Row style={{marginTop:"13rem"}}>
                <InfiniteScroll
                className="row"
                    dataLength={videos.length}
                    next={fetchData}
                    hasMore={true}
                    loader={
                        <div className="spinner-border text-danger"></div>
                    }>
                {
                    !loading ? videos.map((video) => (
                        <Col key={video.id} lg={3} md={4}>
                            <Video video={video} />
                        </Col>
                    )) 
                    : [...Array(20)].map(() => (
                        <Col  lg={3} md={4}>
                            <SkeletonVideo/>
                        </Col>
                    ))
                }

                </InfiniteScroll>
            
            </Row>
        </Container>
    )
}

export default HomeScreen
