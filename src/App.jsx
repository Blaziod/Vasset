import { HashRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import "./styles.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout />
        <Toaster />
      </AuthProvider>
    </Router>
  );
};

export default App;
