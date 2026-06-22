import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Customers from "./pages/customer";
import Products from "./pages/products";
import Invoice from "./pages/invoice";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Auth />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice"
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;