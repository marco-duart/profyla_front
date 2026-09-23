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
import { CandidateAssessmentsPage } from "../../pages/CandidateAssessments";
import { CandidateDiscAssessmentPage } from "../../pages/CandidateDiscAssessment";
import { CandidateEneagramaAssessmentPage } from "../../pages/CandidateEneagramaAssessment";
import { StaffHomePage } from "../../pages/StaffHome";
import { StaffCompaniesPage } from "../../pages/StaffCompanies";
import { StaffJobsPage } from "../../pages/StaffJobs";
import { StaffExamsPage } from "../../pages/StaffExams";
import { StaffFormsPage } from "../../pages/StaffForms";
import { StaffInterviewsPage } from "../../pages/StaffInterviews";
import { StaffHiringsPage } from "../../pages/StaffHirings";
import { StaffKanbanPage } from "../../pages/StaffKanban";
import { StaffAccountPage } from "../../pages/StaffAccount";
import { StaffUsersPage } from "../../pages/StaffUsers";
import { StaffCandidateDetailPage } from "../../pages/StaffCandidateDetail";
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
          <Route path="assessments" element={<CandidateAssessmentsPage />} />
          <Route path="assessments/disc" element={<CandidateDiscAssessmentPage />} />
          <Route path="assessments/eneagrama" element={<CandidateEneagramaAssessmentPage />} />
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
          <Route path="companies" element={<StaffCompaniesPage />} />
          <Route path="jobs" element={<StaffJobsPage />} />
          <Route path="hirings" element={<StaffHiringsPage />} />
          <Route path="exams" element={<StaffExamsPage />} />
          <Route path="forms" element={<StaffFormsPage />} />
          <Route path="interviews" element={<StaffInterviewsPage />} />
          <Route path="kanban" element={<StaffKanbanPage />} />
          <Route path="users" element={<StaffUsersPage />} />
          <Route path="candidates/:id" element={<StaffCandidateDetailPage />} />
          <Route path="account" element={<StaffAccountPage />} />
          <Route index element={<Navigate to="home" replace />} />
        </Route>
        <Route path="*" element={<Navigate to={getDefaultRouteForRole(user?.role)} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
