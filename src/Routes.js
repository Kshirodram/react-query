import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MovieView from './pages/MovieView';
import Layout from './components/Layout';

const AppRoutes = () => (
  <Routes>
    <Route
      exact
      path="/"
      element={
        <Layout>
          <MovieView />
        </Layout>
      }
    />
    <Route
      path="/:type"
      element={
        <Layout>
          <MovieView />
        </Layout>
      }
    />
  </Routes>
);

export default AppRoutes;
