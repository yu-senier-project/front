import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import IdFind from './pages/Auth/IdFind';
import PwInitCheckId from './pages/Auth/PwInitCheckId';
import PwInit from './pages/Auth/PwInit';
import Home from './pages/Home';
import Search from './pages/Search';
import SmallNav from './component/nav/SmallNav';
import IdCheck from './pages/Auth/IdCheck';
import useCreateFeed from './store/feed/useCreateFeed';
import CreateFeed from './component/feed/create/CreateFeed';
import useLoginStore from './store/login/useLoginStore';
import { refreshAccessTokenInterceptor } from './util/auth';
import './App.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Message from './pages/Message/Message';
import { ProjectHome } from './pages/project/ProjectHome';
import { CreateProject } from './pages/project/CreateProject';
import { ProjectCalendar } from './pages/project/ProjectCalendar';
import { ProjectNav } from './component/nav/ProjectNav';
import { Profile } from './pages/Profile';
import SearchPost from './component/search/SearchPost';
import { NotFound } from './pages/NotFound';

import ProjectGantt from './pages/project/ProjectGantt';
import ProJectPost from './pages/project/ProjectPost';
import ProjectChannel from "./pages/project/ProjectChannel";
import ChannelDetail from "./pages/project/ChannelDetail";

// <<<<<<< style/message
// import { UpdateProject } from './pages/project/UpdateProject';
// import { UpdateParticipants } from './pages/project/UpdateParticipants';
// import { Todo } from './pages/project/Todo';
// import { Alarm } from './component/alarm/Alarm';
// import { Post } from './pages/Post';
// =======
import { UpdateProject } from "./pages/project/UpdateProject";
import { UpdateParticipants } from "./pages/project/UpdateParticipants";
import { Todo } from "./pages/project/Todo";
import { Alarm } from "./component/alarm/Alarm";
import { Post } from "./pages/Post";
import Nav from "./component/nav/nav";
import SnsNav from "./component/nav/snsNav";
// >>>>>>> dev

import { isAuthenticated } from './util/auth';
import ProtectedRoute from './util/ProtectedRoute';

// 액세스 토큰 갱신 인터셉터
refreshAccessTokenInterceptor();

function App() {
// <<<<<<< style/message
//     const login = localStorage.getItem('login');
//     const { toggle } = useCreateFeed((state) => state);
//     const { isLogin } = useLoginStore((state) => state);
//     return (
//         <>
//             <BrowserRouter>
//                 {/* <AlarmModal /> */}
//                 {toggle && <CreateFeed />}
//                 {/* {login ? <Alarm /> : null} */}
//                 <Routes>
//                     <Route path="/" element={<HomeRedirect />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="Id" element={<IdFind />} />
//                     <Route path="CheckId" element={<IdCheck />} />
//                     <Route path="Password" element={<PwInitCheckId />} />
//                     <Route path="PasswordInit" element={<PwInit />} />
//                     {/* sns 라우터*/}
//                     <Route path="/" element={<SmallNav />}>
//                         <Route path="Home" element={<ProtectedRoute element={Home} />} />
//                         <Route path="Search" element={<ProtectedRoute element={Search} />} />
//                         <Route path="SearchPost" element={<ProtectedRoute element={SearchPost} />} />
//                         <Route path="Project" element={<ProtectedRoute element={ProjectHome} />} />
//                         <Route path="Project/Create" element={<ProtectedRoute element={CreateProject} />} />
//                         <Route path="Profile" element={<ProtectedRoute element={Profile} />} />
//                         <Route path="Profile/:id" element={<ProtectedRoute element={Profile} />} />
//                         <Route path="Message" element={<ProtectedRoute element={Message} />} />
//                         <Route path="Post/:id" element={<ProtectedRoute element={Post} />} />
//                         {/* <Route path="Alarm" element={<ProtectedRoute element={Alarm} />} /> */}
//                     </Route>
//                     {/* 프로젝트 라우터 */}
//                     <Route path="ProjectHome" element={<ProtectedRoute element={ProjectNav} />}>
//                         <Route path="InfoUpdate" element={<ProtectedRoute element={UpdateProject} />} />
//                         <Route path="Todo/:projectId" element={<ProtectedRoute element={Todo} />} />
//                         <Route path="ParticipantsUpdate" element={<ProtectedRoute element={UpdateParticipants} />} />
//                         <Route path=":projectId" element={<ProtectedRoute element={ProjectCalendar} />} />
//                         <Route path="Gantt/:projectId" element={<ProtectedRoute element={ProjectGantt} />} />
//                         <Route path="Post/:projectId" element={<ProtectedRoute element={ProJectPost} />} />
//                     </Route>
//                     <Route path="*" element={<NotFound />}></Route>
//                 </Routes>
//             </BrowserRouter>
//         </>
//     );
// =======
  const login = localStorage.getItem("login");
  const { toggle } = useCreateFeed((state) => state);
  const { isLogin } = useLoginStore((state) => state);
  return (
    <>
      <BrowserRouter>
        {toggle && <CreateFeed />}
        {login ? <Alarm /> : null}
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="Id" element={<IdFind />} />
          <Route path="CheckId" element={<IdCheck />} />
          <Route path="Password" element={<PwInitCheckId />} />
          <Route path="PasswordInit" element={<PwInit />} />
          {/* sns 라우터*/}
          <Route path="/" element={<SnsNav />}>
            <Route path="Home" element={<ProtectedRoute element={Home} />} />
            <Route
              path="Search"
              element={<ProtectedRoute element={Search} />}
            />
            <Route
              path="SearchPost"
              element={<ProtectedRoute element={SearchPost} />}
            />
            <Route
              path="Project"
              element={<ProtectedRoute element={ProjectHome} />}
            />
            <Route
              path="Project/Create"
              element={<ProtectedRoute element={CreateProject} />}
            />
            <Route
              path="Profile"
              element={<ProtectedRoute element={Profile} />}
            />
            <Route
              path="Profile/:id"
              element={<ProtectedRoute element={Profile} />}
            />
            <Route
              path="Message"
              element={<ProtectedRoute element={Message} />}
            />
            <Route
              path="Post/:id"
              element={<ProtectedRoute element={Post} />}
            />
            {/* <Route path="Alarm" element={<ProtectedRoute element={Alarm} />} /> */}
          </Route>
          {/* 프로젝트 라우터 */}
          <Route
            path="ProjectHome"
            element={<ProtectedRoute element={ProjectNav} />}
          >
            <Route
              path="InfoUpdate"
              element={<ProtectedRoute element={UpdateProject} />}
            />
            <Route
              path="Todo/:projectId"
              element={<ProtectedRoute element={Todo} />}
            />
            <Route
              path="ParticipantsUpdate"
              element={<ProtectedRoute element={UpdateParticipants} />}
            />
            <Route
              path=":projectId"
              element={<ProtectedRoute element={ProjectCalendar} />}
            />
            <Route
              path="Gantt/:projectId"
              element={<ProtectedRoute element={ProjectGantt} />}
            />
            <Route
              path="Post/:projectId"
              element={<ProtectedRoute element={ProJectPost} />}
            />
            <Route
              path="Channel/:projectId"
              element={<ProtectedRoute element={ProjectChannel} />}
            />
          </Route>
          <Route
              path="ProjectHome/Channel/:projectId/ChannelDetail/:channelId"
              element={<ProtectedRoute element={ChannelDetail} />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
// >>>>>>> dev
}

const HomeRedirect = () => {
    return isAuthenticated() ? <Navigate to="/Home" /> : <Navigate to="/login" />;
};

export default App;
