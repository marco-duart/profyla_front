//NATIVE
//LIBRARIES
import { BrowserRouter, Routes, Route } from "react-router-dom";

//COMPONENTS
import BaseLayout from "../components/base-layout";
import { PrivateRoute } from "../components/auth/private-route";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Confirm from "../pages/confirm/confirm";
import ChangePassword from "../pages/reset-password/reset-password";

import Dashboard from "../pages/dashboard/dashboard";
import Home from "../pages/home/home";
import Cnpj from "../pages/cnpj/cnpj";
import Candidates from "../pages/candidates/candidates";
import Exams from "../pages/exams/exams";
import Traits from "../pages/traits/traits";
import Configurations from "../pages/configurations/configurations";
import Notifications from "../pages/notifications/notifications";
import Profile from "../pages/profile/profile";
import Jobs from "../pages/jobs/jobs";
import HiringProcess from "../pages/hiring-process/hiring-process";
import Support from "../pages/support/support";
import AboutUs from "../pages/about-us/about-us";
import Kanban from "../pages/kanban/kanban";

//STYLES
//UTILS
import * as CONSTANTS from "../utils/constants/constants"


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm/:id/:action_key" element={<Confirm />} />
        <Route path="/change-password/:id/:action_key" element={<ChangePassword />} />
        <Route path="/admin" element={<PrivateRoute requiredRoles={CONSTANTS.ADMIN_ONLY} redirectTo="/"><BaseLayout /></PrivateRoute>}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/cnpj" element={<Cnpj />} />
          <Route path="/admin/manager" element={<Kanban />} />
          <Route path="/admin/candidates" element={<Candidates />} />
          <Route path="/admin/exams" element={<Exams />} />
          <Route path="/admin/traits" element={<Traits />} />
          <Route path="/admin/" element={<Configurations />} />
          <Route path="/admin/" element={<Notifications />} />
          <Route path="/admin/about-us" element={<AboutUs />}/>
        </Route>
        <Route path="/user" element={<PrivateRoute requiredRoles={CONSTANTS.USERS_ONLY} redirectTo="/"><BaseLayout /></PrivateRoute>}>
          <Route path="/user/home" element={<Home />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/jobs" element={<Jobs />} />
          <Route path="/user/hiring-process" element={<HiringProcess />} />
          <Route path="/user/configurations" element={<Configurations />} />
          <Route path="/user/notifications" element={<Notifications />} />
          <Route path="/user/about-us" element={<AboutUs />}/>
          <Route path="/user/support" element={<Support />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
