import { Toaster } from "react-hot-toast";
import Router from "./routes";
import { toastConfig } from "./configs/toast-config";

function App() {
  return (
    <>
      <Toaster toastOptions={toastConfig} />
      <Router />
    </>
  );
}

export default App;
