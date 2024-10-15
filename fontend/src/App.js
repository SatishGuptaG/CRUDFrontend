// src/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/DashboardPage';
import DashboardBrandsPage from './pages/Dashboard/DashboardBrandsPage';
import {
  
  DashboardCategoriesPage,
  ProductPage,
  ProductEditPage,
  CustomAttributesPage,
  CustomAttributesEditPage,
  SettingPage,
  BrandDetailPage,
  CategoryDetailPage

} from "./routes/dashboard";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
     <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/brands" element={<DashboardBrandsPage />} />
            <Route path="/brandDetail/:id" element={<BrandDetailPage />} />
            <Route path="/categories" element={<DashboardCategoriesPage />} />
            <Route path="/categoryDetail/:id" element={<CategoryDetailPage />} />
            <Route path="/Products" element={<ProductPage />} />
            <Route path="/ProductDetail/:id" element={<ProductEditPage />} />
            <Route path="/CustomAttributes" element={<CustomAttributesPage />} />
            <Route path="/customAttributeDetail/:id" element={<CustomAttributesEditPage />} />
            <Route path="/settings" element={<SettingPage />} />
          
          </Routes>
        </header>
      </div>
      <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
  />
    </Router>
  );
}

export default App;
