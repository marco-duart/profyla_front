import { Toaster } from "react-hot-toast";
import { AppRouter } from "./app/router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { toastConfig } from "./configs/toast-config";

function App() {
  return (
    <>
      <Toaster toastOptions={toastConfig} />
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </>
  );
}

export default App;
