import SignUp1 from "pages/Auth/signUp1";
import SignIn from "pages/Auth/signIn";
import SignUp2 from "pages/Auth/signUp2";
import SignUp3 from "pages/Auth/signUp3";
import SignUp4 from "pages/Auth/signUp4";
import Dashboard from "pages/Dashboard";
import Assets from "pages/Assets";
import Transactions from "pages/Transactions";
import TrustFund from "pages/TrustFund";
import Profile from "pages/Profile";
import Invest from "pages/Invest";
import Loan from "pages/Loan";
import ProtectedRoute from "./protectedRoute"; // Update this with the actual path
import { Component } from "react";

export const Routes = {
  SignUp1: "/signup1",
  SignUp2: "/signup2",
  SignUp3: "/signup3",
  SignUp4: "/signup4",
  SignIn: "/signin",
  Dashboard: "/app/dashboard",
  TrustFund: "/app/trustfund",
  Loan: "/app/loan",
  Assets: "/app/assets",
  Profile: "/app/profile",
  Invest: "/app/invest",
  Transactions: "/app/transactions",
};

export const AppRoutes = [
  //Pages
  {
    path: Routes.Dashboard,
    exact: true,
    isPrivate: true,
    component: <Dashboard />,
  },
  {
    path: Routes.Transactions,
    exact: true,
    isPrivate: true,
    component: <Transactions />,
  },
  {
    path: Routes.Profile,
    exact: true,
    isPrivate: true,
    component: <Profile />,
  },
  {
    path: Routes.TrustFund,
    exact: true,
    isPrivate: true,
    component: <TrustFund />,
  },
  {
    path: Routes.Assets,
    exact: true,
    isPrivate: true,
    component: <Assets />,
  },
  {
    path: Routes.Loan,
    exact: true,
    isPrivate: true,
    component: <Loan />,
  },
  {
    path: Routes.Invest,
    exact: true,
    isPrivate: true,
    component: <Invest />,
  },

  //Auth Pages
  {
    path: Routes.SignUp1,
    exact: true,
    isPrivate: false,
    component: <SignUp1 />,
  },
  {
    path: Routes.SignUp2,
    exact: true,
    isPrivate: false,
    component: <SignUp2 />,
  },
  {
    path: Routes.SignUp3,
    exact: true,
    isPrivate: false,
    component: <SignUp3 />,
  },
  {
    path: Routes.SignUp4,
    exact: true,
    isPrivate: false,
    component: <SignUp4 />,
  },
  {
    path: Routes.SignIn,
    exact: true,
    isPrivate: false,
    component: <SignIn />,
  },
];

export const renderRoutes = (routes) =>
  routes.map(({ path, element, isPrivate }) =>
    isPrivate ? (
      <ProtectedRoute key={path} path={path} element={element} />
    ) : (
      <Route key={path} path={path} element={element} />
    )
  );
