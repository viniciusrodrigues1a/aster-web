import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthRoute } from "./RequireAuth";
import { SignIn } from "../pages/signin";
import { SignUp } from "../pages/signup";
import { Dashboard } from "../pages/dashboard";
import { Transactions } from "../pages/transactions";
import { Expenses } from "../pages/expenses";

function Fallback() {
  return <Navigate to="/signup" replace={true} />;
}

export default function RoutesAPP() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <AuthRoute isPrivate={false}>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <AuthRoute isPrivate={false}>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute isPrivate={true}>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <AuthRoute isPrivate={true}>
              <Transactions />
            </AuthRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <AuthRoute isPrivate={true}>
              <Expenses />
            </AuthRoute>
          }
        />
        <Route path="/*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
}
