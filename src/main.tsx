
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./features/store/store.js";
import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
      <CustomProvider theme="light">
        <App />
        <ToastContainer />

      </CustomProvider>
      </Provider>
    </BrowserRouter>
  </>
);
