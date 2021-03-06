import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Comments from '../../components/comments/Comments'
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal'
import VideoMetaData from '../../components/videoMetaData/VideoMetaData'
import { getRelatedVideos, getVideoById } from '../../redux/actions/video.action'
import './_watchScreen.scss'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'


const WatchScreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoById(id));
        dispatch(getRelatedVideos(id))
    }, [dispatch,id])

    const {loading,video} = useSelector(state => state.selectedVideo);

    const {videos, loading: relatedVideosLoading} = useSelector(state => state.relatedVideos)

    
    return (
        <div className="watchScreen">
 <Row>
            <Col lg={8}>
                <div className="watchScreen__player">
                    <iframe
                      src= {`https://www.youtube.com/embed/${id}`}
                      frameBorder="0"
                      allowFullScreen
                      title={video?.snippet?.title}
                      width="100%"
                      height="100%"></iframe>
                </div>

                {
                    !loading? 
                    <VideoMetaData video={video} videoId={id} /> 
                    : <h6>Loading...</h6>
                }

                <Comments videoId={id} totalComments={video?.statistics?.commentCount} />

            </Col>

            
            <Col lg={4}>
                {!relatedVideosLoading ?
                
                videos?.filter(video => video.snippet)
                    .map((video) => (
                    <VideoHorizontal video={video} key={video.id.videoId} />
                )) 
                
                : 

                <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="130px" count={15} />
                </SkeletonTheme>
                
                
                }
            </Col>


        </Row>
        </div>
       
    )
}

export default WatchScreen
