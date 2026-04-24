import { type ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/Login";
import { CandidateShell } from "../../components/CandidateShell";
import { StaffShell } from "../../components/StaffShell";
import { CandidateDashboardPage } from "../../pages/CandidateDashboard";
import { CandidateApplicationsPage } from "../../pages/CandidateApplications";
import { CandidateApplicationDetailPage } from "../../pages/CandidateApplicationDetail";
import { CandidateAccountPage } from "../../pages/CandidateAccount";
import { CandidateCurriculumPage } from "../../pages/CandidateCurriculum";
import { CandidateOpportunitiesPage } from "../../pages/CandidateOpportunities";
import { StaffHomePage } from "../../pages/StaffHome";
import { useAuth } from "../../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactElement;
  allowedRoles?: Array<"user" | "admin" | "ti">;
};

function getDefaultRouteForRole(role?: "user" | "admin" | "ti"): string {
  if (role === "user") {
    return "/candidate/home";
  }

  if (role === "admin" || role === "ti") {
    return "/staff/home";
  }

  return "/login";
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDefaultRouteForRole(user.role)} replace />;
  }

  return children;
}

export function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/candidate"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <CandidateShell />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<CandidateDashboardPage />} />
          <Route path="applications" element={<CandidateApplicationsPage />} />
          <Route path="applications/:applicationId" element={<CandidateApplicationDetailPage />} />
          <Route path="account" element={<CandidateAccountPage />} />
          <Route path="curriculum" element={<CandidateCurriculumPage />} />
          <Route path="opportunities" element={<CandidateOpportunitiesPage />} />
          <Route index element={<Navigate to="home" replace />} />
        </Route>
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["admin", "ti"]}>
              <StaffShell />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<StaffHomePage />} />
          <Route index element={<Navigate to="home" replace />} />
        </Route>
        <Route path="*" element={<Navigate to={getDefaultRouteForRole(user?.role)} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
