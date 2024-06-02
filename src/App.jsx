import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import IdFind from "./pages/Auth/IdFind";
import PwInitCheckId from "./pages/Auth/PwInitCheckId";
import PwInit from "./pages/Auth/PwInit";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SmallNav from "./component/nav/SmallNav";
import IdCheck from "./pages/Auth/IdCheck";
import useCreateFeed from "./store/feed/useCreateFeed";
import CreateFeed from "./component/feed/create/CreateFeed";
import useLoginStore from "./store/login/useLoginStore";
import { refreshAccessTokenInterceptor } from "./util/auth";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProjectHome } from "./pages/project/ProjectHome";
import { CreateProject } from "./pages/project/CreateProject";
import { ProjectCalendar } from "./pages/project/ProjectCalendar";
import { ProjectNav } from "./component/nav/ProjectNav";
import { Profile } from "./pages/Profile";

import ProjectGantt from "./pages/project/ProjectGantt";
import ProJectPost from "./pages/project/ProjectPost";

import { UpdateProject } from "./pages/project/UpdateProject";
import { UpdateParticipants } from "./pages/project/UpdateParticipants";
import { Todo } from "./pages/project/Todo";

// 액세스 토큰 갱신 인터셉터
refreshAccessTokenInterceptor();

function App() {
  const login = localStorage.getItem("login");
  const { toggle } = useCreateFeed((state) => state);
  const { isLogin } = useLoginStore((state) => state);
  return (
    <>
      <BrowserRouter>
        {toggle && <CreateFeed />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<SmallNav />}>
            <Route path="Id" element={<IdFind />} />
            <Route path="CheckId" element={<IdCheck />} />
            <Route path="Password" element={<PwInitCheckId />} />
            <Route path="PasswordInit" element={<PwInit />} />
            <Route path="Home" element={<Home />} />
            <Route path="Search" element={<Search />} />
            <Route path="Project" element={<ProjectHome />} />
            <Route path="Project/Create" element={<CreateProject />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Profile/:id" element={<Profile />} />
            {/* <Route path="Message" element={<Message />} /> */}
          </Route>
          <Route path="/ProjectHome" element={<ProjectNav />}>
            <Route path="InfoUpdate" element={<UpdateProject />} />
            <Route path="Todo/:projectId" element={<Todo />} />
            <Route path="ParticipantsUpdate" element={<UpdateParticipants />} />
            <Route path=":projectId" element={<ProjectCalendar />} />
            <Route path=":projectId/Gantt" element={<ProjectGantt />} />
            <Route path=":projectId/Post" element={<ProJectPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools position="bottom-right" />
    </>
  );
}

export default App;
