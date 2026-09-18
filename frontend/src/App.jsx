
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import AuthPage from "./pages/AuthPage";

import ProtectedRoute from "./routes/ProtectedRoute";

// User
import HomePage from "./user/pages/Home/Home";

// Admin
import AdminRoute from "./admin/routes/AdminRoute";
import AdminLayout from "./admin/components/AdminLayout";

import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import ProductsPage from "./admin/pages/ProductsPage";
import CreateProductPage from "./admin/pages/CreateProductPage";
import EditProductPage from "./admin/pages/EditProductPage";

import "./App.css";
import "./admin/styles/admin.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>

          {/* =========================
              AUTH
          ========================= */}

          <Route
            path="/login"
            element={<AuthPage />}
          />


          {/* =========================
              USER
          ========================= */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />


          {/* =========================
              ADMIN
          ========================= */}

          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >

            {/* /dashboard */}
            <Route
              index
              element={<AdminDashboardPage />}
            />

            {/* /dashboard/products */}
            <Route
              path="products"
              element={<ProductsPage />}
            />

            {/* /dashboard/products/new */}
            <Route
              path="products/new"
              element={<CreateProductPage />}
            />

            {/* /dashboard/products/:id/edit */}
            <Route
              path="products/:id/edit"
              element={
                <EditProductPage />
              }
            />

          </Route>


          {/* =========================
              FALLBACK
          ========================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

