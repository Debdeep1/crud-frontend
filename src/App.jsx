import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SessionAuth from "./middleware/SessionAuth";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NewUser from "./pages/NewUser";
import FindUser from "./pages/FindUser";
import CustomerPage from "./pages/CustomerPage";
import Zone from "./pages/Zone";

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
          path="/find_users"
          element={
            <SessionAuth>
              <FindUser />
            </SessionAuth>
          }
        />
           <Route
          path="/new_zone"
          element={
            <SessionAuth>
              <Zone />
            </SessionAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
