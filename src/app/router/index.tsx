import { type PropsWithChildren, type ReactElement } from "react";
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
import { StaffAuditLogsPage } from "../../pages/StaffAuditLogs";
import { CandidateOpportunityDetailPage } from "../../pages/CandidateOpportunityDetail";
import { StaffComparePage } from "../../pages/StaffCompare";
import { StaffMetricsPage } from "../../pages/StaffMetrics";
import { PublicCompanyJobsPage } from "../../pages/PublicCompanyJobs";
import { PublicJobDetailPage } from "../../pages/PublicJobDetail";
import { PublicJobsPage } from "../../pages/PublicJobs";
import { UnsubscribePage } from "../../pages/Unsubscribe";
import { StaffCandidateDetailPage } from "../../pages/StaffCandidateDetail";
import { StaffCandidatesPage } from "../../pages/StaffCandidates";
import { ConsentGate } from "../../components/ConsentGate";
import { NotFound } from "../../components/NotFound";
import { EmailConfirmedPage } from "../../pages/EmailConfirmed";
import { ForgotPasswordPage } from "../../pages/ForgotPassword";
import { ResetPasswordPage } from "../../pages/ResetPassword";
import { LegalDocumentPage } from "../../pages/LegalDocument";
import { RegisterPage } from "../../pages/Register";
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

  return <ConsentGate>{children}</ConsentGate>;
}

// Inside an already-protected shell: only the TI role may open this page.
function TiOnly({ children }: PropsWithChildren) {
  const { user } = useAuth();
  return user?.role === "ti" ? <>{children}</> : <Navigate to="/staff/home" replace />;
}

export function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirmado" element={<EmailConfirmedPage />} />
        <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />
        <Route path="/descadastro" element={<UnsubscribePage />} />
        <Route path="/vagas" element={<PublicJobsPage />} />
        <Route path="/vagas/:id" element={<PublicJobDetailPage />} />
        <Route path="/empresas/:id/vagas" element={<PublicCompanyJobsPage />} />
        <Route path="/redefinir-senha" element={<ResetPasswordPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/termos" element={<LegalDocumentPage kind="terms" />} />
        <Route path="/privacidade" element={<LegalDocumentPage kind="privacy" />} />
        <Route path="/aviso-testes" element={<LegalDocumentPage kind="assessment_notice" />} />
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
          <Route path="opportunities/:id" element={<CandidateOpportunityDetailPage />} />
          <Route path="assessments" element={<CandidateAssessmentsPage />} />
          <Route path="assessments/disc" element={<CandidateDiscAssessmentPage />} />
          <Route path="assessments/eneagrama" element={<CandidateEneagramaAssessmentPage />} />
          <Route index element={<Navigate to="home" replace />} />
          <Route path="*" element={<NotFound homePath="/candidate/home" homeLabel="Voltar ao início" />} />
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
          <Route path="metrics" element={<StaffMetricsPage />} />
          <Route path="users" element={<StaffUsersPage />} />
          <Route
            path="audit"
            element={
              <TiOnly>
                <StaffAuditLogsPage />
              </TiOnly>
            }
          />
          <Route path="candidates" element={<StaffCandidatesPage />} />
          <Route path="candidates/compare" element={<StaffComparePage />} />
          <Route path="candidates/:id" element={<StaffCandidateDetailPage />} />
          <Route path="account" element={<StaffAccountPage />} />
          <Route index element={<Navigate to="home" replace />} />
          <Route path="*" element={<NotFound homePath="/staff/home" homeLabel="Voltar ao painel" />} />
        </Route>
        <Route path="*" element={<Navigate to={getDefaultRouteForRole(user?.role)} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
