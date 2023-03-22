import { Wrapper } from "@googlemaps/react-wrapper";
import "./App.css";
import NavbarApp from "./components/Navbar/Navbar";
import Routes from "./Routes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GOOGLE_MAPS_API_KEY = "AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA";

const App = () => {
  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="App">
        <NavbarApp />
        <ToastContainer autoClose={1500} closeButton={false}/>
        <Routes />
      </div>
    </Wrapper>
  );
};

export default App;
