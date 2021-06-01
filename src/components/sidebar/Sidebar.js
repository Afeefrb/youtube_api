import React from 'react';
import './_sidebar.scss';

import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp, 
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied,
 } from 'react-icons/md'

 import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/actions/auth.action';
import { Link, useHistory } from 'react-router-dom';

const Sidebar = ({sidebar, handleToggleSidebar}) => {

   const dispatch = useDispatch();
   const history = useHistory();

   const accessToken = useSelector(state => state.auth?.accessToken);

   const logoutHandler = () => {
      dispatch(logOut());
      history.push("/");

   }

    return (
        <nav  className={sidebar? "sidebar open" : "sidebar"} onClick={() => handleToggleSidebar(false)}>
           <Link to="/">

              {sidebar && <AiFillCloseCircle className="sidebar__icon" size={23} />}
           
           <li>
                <MdHome size={23} />
                <span>Home</span>
            </li>

           </Link>

           {/* <Link to="/feed/subscriptions">
               <li>
                  <MdSubscriptions size={23} />
                  <span>Subscriptions</span>
               </li>
           
           </Link>
   
     

            <li>
            <MdThumbUp size={23} />
            <span>Liked Video</span>
         </li>

         <li>
            <MdHistory size={23} />
            <span>History</span>
         </li>

         <li>
            <MdLibraryBooks size={23} />
            <span>Library</span>
         </li>

         <li>
            <MdSentimentDissatisfied size={23} />
            <span>I don't Know</span>
         </li>

 */}

       

         {accessToken && 
         
        
         <li onClick={logoutHandler}>
            <hr />
            <MdExitToApp size={23} />
            <span>Log Out</span>
            <hr />
         </li>
         
         }
         
 

        
            
        </nav>
    )
}

export default Sidebar
