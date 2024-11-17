import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SessionAuth from "./middleware/SessionAuth";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NewUser from "./pages/NewUser";
import FindUser from "./pages/FindUser";
import CustomerPage from "./pages/CustomerPage";
import Zone from "./pages/Zone";
import Plans from "./pages/Plans";
import Billings from "./pages/Billings";
import Zoneform from "./components/Zones/Zoneform";
import Planform from "./components/Plans/Planform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <SessionAuth>
              <Dashboard />
            </SessionAuth>
          }
        />
        <Route
          path="/customers"
          element={
            <SessionAuth>
              <Dashboard />
            </SessionAuth>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <SessionAuth>
              <CustomerPage />
            </SessionAuth>
          }
        />
        <Route
          path="/new_user"
          element={
            <SessionAuth>
              <NewUser />
            </SessionAuth>
          }
        />
           <Route
          path="/billings"
          element={
            <SessionAuth>
              <Billings />
            </SessionAuth>
          }
        />
        <Route
          path="/find_users"
          element={
            <SessionAuth>
              <FindUser />
            </SessionAuth>
          }
        />
         <Route
          path="/zones"
          element={
            <SessionAuth>
              <Zone />
            </SessionAuth>
          }
        />
             <Route
          path="/zones/:id"
          element={
            <SessionAuth>
              <Zoneform />
            </SessionAuth>
          }
        />
        <Route
          path="/new_zone"
          element={
            <SessionAuth>
              <Zoneform />
            </SessionAuth>
          }
        />
        <Route
          path="/plans"
          element={
            <SessionAuth>
              <Plans />
            </SessionAuth>
          }
        />
            <Route
          path="/plans/:id"
          element={
            <SessionAuth>
              <Planform />
            </SessionAuth>
          }
        />
          <Route
          path="/new_plan"
          element={
            <SessionAuth>
              <Planform />
            </SessionAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
