import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideoByCategory } from '../../redux/actions/video.action';
import './_categoriesBar.scss';

const keywords = [
    'All',
    'Coding',
    'Web Development',
    'React js',
    'Node js',
    'Blockchain',
    'Data Science'
] 

const CategoriesBar = () => {
    const [activeElement, setActiveElement] = useState("All");

    const dispatch = useDispatch();

    const handleClick = (value) => {
        setActiveElement(value);
        if(value === 'All') {
            dispatch(getPopularVideos())

        } else {
            
            dispatch(getVideoByCategory(value))
        }

    }
    
    return (
        <div className="categoriesBar">
       
           {
               keywords.map((value,i) => (
                   <span
                     key={i}
                     onClick={() => handleClick(value)}
                     className={activeElement === value? 'active' : ''}>{value}</span>
               ))
           }
        </div> 
    )
}

export default CategoriesBar
