import { Toaster } from "react-hot-toast";
import { AppRouter } from "./app/router";
import { toastConfig } from "./configs/toast-config";

function App() {
  return (
    <>
      <Toaster toastOptions={toastConfig} />
      <AppRouter />
    </>
  );
}

export default App;
