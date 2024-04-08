import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../components/baseLayout";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ForgotPassword from "../pages/forgot_password/forgot-password";
import { ConfirmAccount } from "../services/register";
import Confirm from "../pages/confirm_account/confirm_account";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm/:id/:action_key" element={<Confirm />} />
        {/* <Route path="/" element={<PasswordRecovery />} />
        <Route path="/admin" element={<BaseLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/" element={<CNPJ />} />
          <Route path="/" element={<Kanban />} />
          <Route path="/" element={<Candidates />} />
          <Route path="/" element={<Exams />} />
          <Route path="/" element={<Configurações />} />
          <Route path="/" element={<Notificações />} />
          <Route path="/" element={<Skills-Knowledges-Profiles />} />
        </Route>
        <Route path="/home" element={<BaseLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/" element={<Profile />} />
          <Route path="/" element={<Vagas />} />
          <Route path="/" element={<Processos />} />
          <Route path="/" element={<Configurações />} />
          <Route path="/" element={<Notificações />} />
          <Route path="/" element={<QuemSomos />} />
          <Route path="/" element={<Suporte />} />
        </Route>*/}
      </Routes>
    </BrowserRouter>
  );
}
