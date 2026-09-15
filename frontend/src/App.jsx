import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

import ProtectedRoute from "./routes/ProtectedRoute";

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
          <Route path="/login" element={<AuthPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />

            <Route path="products" element={<ProductsPage />} />

            <Route path="products/new" element={<CreateProductPage />} />
            <Route
              path="/dashboard/products/:id/edit"
              element={
                <AdminRoute>
                  <EditProductPage />
                </AdminRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
