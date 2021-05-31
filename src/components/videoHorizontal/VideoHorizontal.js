import React, { useEffect, useState } from 'react'
import {AiFillEye} from 'react-icons/ai'
import request from '../../axios'
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Col, Row } from 'react-bootstrap';
import './_videoHorizontal.scss'
import { useHistory } from 'react-router';

const VideoHorizontal = ({video, searchScreen}) => {

    const {
        id,
        snippet: {
           channelId,
           channelTitle,
           description,
           title,
           publishedAt,
           thumbnails: { medium },
           resourceId,
        },
     } = video

     const isVideo = id.kind === "youtube#video";
     const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel';




     const [views,setViews] = useState(null);
     const [duration, setDuration] = useState(null);
     const [channelIcon, setChannelIcon] = useState(null);

    useEffect(() => {
        const get_video_details = async () => {
            const {data:{items}} = await request("/videos", {
                params: {
                    part: "contentDetails, statistics",
                    id: id.videoId
                }
            })
            console.log(items);
            //# items:{contentDetails: {duration,...}, statistics: {commentCount, viewCount,..}}
            setViews(items[0].statistics.viewCount);
            setDuration(items[0].contentDetails.duration);
        }

        get_video_details();
  

    },[id.videoId]);


    useEffect(() => {
        const get_channel_icon = async () => {
            const {data:{items}} = await request("/channels", {
                params: {
                    part: "snippet",
                    id: channelId
                }
            })
            console.log(items[0].snippet.thumbnails.default);
            //# items: {snippet: {thumbnails: {default, high, medium}}}
            setChannelIcon(items[0].snippet.thumbnails.default);
        }

        get_channel_icon();
    

    },[channelId]);

    
    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format("mm:ss")

    const history = useHistory();

    const handleClick = () => {
        isVideo? (
            history.push(`/watch/${id.videoId}`)
        ) : (
            history.push(`/watch/${id.channelId}`)
        )
    }

    return (
        <Row className="videoHorizontal m-1 py-2 align-items-center" onClick={handleClick}>
            <Col xs={6} md={searchScreen? 4:6} className="videoHorizontal__left">
                <LazyLoadImage
                    effect="blur"
                    src={medium?.url}
                    className= {`videoHorizontal__thumbnail ${thumbnail}`}
                    wrapperClassName="videoHorizontal__thumbnail-wrapper" />

                    {isVideo &&  <span className="videoHorizontal__duration"> {_duration} </span> }

                   
            </Col>
            <Col xs={6} md={searchScreen? 8:6} className="videoHorizontal__right p-0">
                <p className="videoHorizontal__title mb-1">
                    {title}
                </p>

                {isVideo && (
                    <div className="videoHorizontal__details">
                    <AiFillEye />  {numeral(views).format('0.a')} Views • &nbsp;
                    {moment(publishedAt).fromNow()}

                </div>
                )}
         

                {isVideo && (
                    <p className="mt-1 videoHorizontal__desc">{description} </p>
                )}

                <div className="videoHorizontal__channel d-flex my-1 align-items-center">
                    {isVideo && (
                        <LazyLoadImage 
                            src={channelIcon?.url} 
                            effect="blur" />
                    )}

                    <p className="mb-0"> {channelTitle} </p>
                </div>


            </Col>

        </Row>
    )
}

export default VideoHorizontal
