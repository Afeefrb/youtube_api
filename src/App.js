import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header';
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/homeScreen/HomeScreen';
import './_app.scss';
import LoginScreen from './screens/loginScreen/LoginScreen';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom'
import WatchScreen from './screens/WatchScreen/WatchScreen';
import SearchScreen from './screens/searchScreen/SearchScreen';
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen';


//!---------------------LAYOUT----LAYOUT-----------------------------
const Layout = ({children}) => {

    const [sidebar, toggleSidebar] = useState(false);

    const handleToggleSidebar = (value) => toggleSidebar(value => !value);
    
   

    return (<>
        
            <Header handleToggleSidebar={handleToggleSidebar} />  
            <div className="app__container" >
    
                <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />  
                <Container fluid className="app__main">
                    {children}
                </Container>
            </div>
        </>)
}
//!---------------------LAYOUT----LAYOUT-----------[END]---------------

export default function App() {

    const history = useHistory();

    const {accessToken, loading} = useSelector(state => state.auth); 

    //$ To enforce login for to access any page
    // useEffect(() => {
    //   if(!accessToken && !loading) {
    //       history.push("/auth")
    //   }
    // }, [accessToken, loading, history])

    return (
   
            <Switch>
                    //?-----"/"
                    <Route exact path="/">
                        <Layout>
                            <HomeScreen/> 
                        </Layout>
                    </Route> 
                    //?-----"/auth"
                    <Route path="/auth"> 
                        <LoginScreen /> 
                    </Route> 
                    //?-----"/search"
                    <Route path="/search/:query"> 
                        <Layout>
                            <SearchScreen />
                        </Layout>
                    </Route>
                    //?-----"/watch/:id"
                    <Route path="/watch/:id"> 
                        <Layout>
                            <WatchScreen />
                   
                        </Layout>
                    </Route>

                    <Route path="/feed/subscriptions"> 
                        <Layout>
                            <SubscriptionsScreen />
                   
                        </Layout>
                    </Route>


                    <Route>
                        <Redirect to="/" />
                    </Route>
            </Switch>
 
    
       
    )
}
