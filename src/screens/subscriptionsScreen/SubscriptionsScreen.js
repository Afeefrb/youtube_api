import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getVideosBySubscriptions } from '../../redux/actions/video.action';
import './_subscriptionsScreen.scss'


const SubscriptionsScreen = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideosBySubscriptions())
    }, [dispatch])

    return (
        <div>
            Subs
        </div>
    )
}

export default SubscriptionsScreen
