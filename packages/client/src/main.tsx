import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { AppContextProvider } from './AppContext';
import {
  Cart,
  Dashboard,
  ForgotPassword,
  Products,
  ResetPassword,
  SignIn,
  SignUp,
} from './pages';
import { Home } from './pages/home';
import MerchantDashboard from './pages/merchant/dashboard';
import { Test } from './pages/test';
import {
  AddRestaurant,
  AddProduct,
  RemoveProduct,
  UpdateProduct,
} from './pages/merchant';
import { MerchantHome } from './pages/merchant/home';

const client = new ApolloClient({
  uri: 'http://api.supereats.test/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

const AppRouter: React.FC = (): JSX.Element => (
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/merchant" element={<MerchantDashboard />}>
          <Route index element={<MerchantHome />} />
          <Route path="add-restaurant" element={<AddRestaurant />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product/:productId" element={<UpdateProduct />} />
          <Route path="remove-product" element={<RemoveProduct />} />
        </Route>

        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="test" element={<Test />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  </AppContextProvider>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('root')
);
