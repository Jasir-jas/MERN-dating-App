import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './Pages/LandingPage/LandingPage';
import PersonalDetail from './Pages/PersonalDetail_page/PersonalDetail';
import JobStatusComponent from './Pages/JobStatus/JobStatus'
import RelationshipGoals from './Pages/RelationShipGoals/RelationshipGoals';
import ChooseApp from './Pages/ChooseApp/ChooseApp';
import Received from "./Pages/Received/Received";
import Accepted from "./Pages/Accepted/Accepted";
import Rejected from "./Pages/Rejected/Rejected";
import Shortlisted from "./Pages/Shortlisted/Shortlisted";
import "./App.css";
import Sent from "./Pages/Sent/Sent";
import Contacted from "./Pages/Contacted/Contacted";
import ShortlistedBy from "./Pages/ShortlistedBy/ShortlistedBy";
import Messages from "./Pages/Messages/Messages";
import RightSideModal from "./Components/RightSideModal/RightSideModal";
import ViewedMyProfile from "./Pages/ViewedMyProfile/ViewedMyProfile";

import ProfileView from './Components/ProfileView/ProfileView'
import ViewStory from './Components/viewStory/viewStory'
import Settings from './Components/Settings/Settings'
import PrivacySettings from './Components/PrivacySettings/PrivacySettings'
import UpgradeView from './Components/UpgradeView/UpgradeView'
import OwnProfileView from './Components/OwnProfileView/OwnProfileView'

import ChangePassword from './Components/ChangePassword/ChangePassword'
import EditMyProfile from './Components/EditMyProfile/EditMyProfile'



import UserHomePage from './Pages/UserHome/UserHomePage';
import Qualification from './Pages/Qualification/Qualification';
import LocationPage from './Pages/Location/LocationPage';
import DesignationPage from './Pages/Designation/DesignationPage';
import MatchesPage from './Pages/Matches/MatchesPage';
import UpgradePopup from './Pages/UpgradePopup/UpgradePopup';
import NearByUser from './Pages/NearByUser/NearByUser';

import NotFound404 from './Pages/NotFound404/NotFound404';
import NotFound403 from './Pages/NotFound403/NotFound403';
import SubscriptionPlan from './Pages/SubscriptionPlan/SubscriptionPlan';
import PaymentMethods from './Components/PaymentMethods/PaymentMethods';
import Groups from './Pages/Groups/Groups';
import CreateGroup from './Pages/CreateGroup/CreateGroup';
import { ModalProvider } from './StateManagement/ModalContext';
import AddCards from './Pages/AddCard/AddCard';



const App = () => {

   return <>
      <ModalProvider>
         {/* <BrowserRouter> */}

         <Routes className="content">
            <Route path='/' element={<LandingPage />} />
            <Route path='/personalDetail' element={<PersonalDetail />} />
            <Route path='/employement' element={<JobStatusComponent />} />
            <Route path='/relationship-goals' element={<RelationshipGoals />} />
            <Route path='/choose-app' element={<ChooseApp />} />

            <Route path='/userhome' element={<UserHomePage />} />
            {/* <Route path='/qualification' element={<Qualification />} />
            <Route path='/location' element={<LocationPage />} />
            <Route path='/designation' element={<DesignationPage />} /> */}
            <Route path='/matches' element={<MatchesPage />} />
            <Route path='/upgradepopup' element={<UpgradePopup />} />
            <Route path='/near-by-user' element={<NearByUser />} />

            <Route path='/profileview/:profileId' element={<ProfileView />} />
            <Route path='/viewstory' element={<ViewStory />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/privacysettings' element={<PrivacySettings />} />
            <Route path='/upgradeview' element={<UpgradeView />} />
            <Route path='/ownProfileview' element={<OwnProfileView />} />

            <Route path="/sent" element={<Sent />} />
            <Route path="/viewed-my-profile" element={<ViewedMyProfile />} />
            <Route path="/accepted" element={<Accepted />} />
            <Route path="/rejected" element={<Rejected />} />
            <Route path="/received" element={<Received />} />
            <Route path="/shortlisted" element={<Shortlisted />} />
            <Route path="/contacted" element={<Contacted />} />
            <Route path="/shortlistedBy" element={<ShortlistedBy />} />
            <Route path="/messages" element={<Messages />} />


            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/edit-my-profile" element={<EditMyProfile />} />



            <Route path='/create-group' element={<CreateGroup />} />
            <Route path='/group' element={<Groups />} />
            <Route path='/subscriptionPlan' element={<SubscriptionPlan />} />
            <Route path='/payment-method' element={<PaymentMethods />} />
            <Route path='/addcard' element={<AddCards />} />

            <Route path='/404' element={<NotFound404 />} />
            <Route path='/403' element={<NotFound403 />} />
         </Routes>
         <RightSideModal />
         {/* </BrowserRouter> */}
      </ModalProvider>

   </>
}
export default App