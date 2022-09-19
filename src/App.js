import './App.css';
import ResponsiveAppBar from './components/AppBar'
import { Route, Routes } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import CategoriesList from './pages/CategoriesList'
import BucketView from './pages/BucketView'
import BucketProvider from './contexts/BucketContext'
import OrdersList from './pages/OrdersList'
import UserProvider from './contexts/UserContext'
import axios from 'axios'
import LoggedInOnly from './components/LoggedInOnly'
import PromotionsList from './pages/PromotionsList'

axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BucketProvider>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<ProductsList/>}/>
            <Route path="/products" element={<ProductsList/>}/>
            <Route path="/categories" element={<CategoriesList/>}/>
            <Route path="/promotions" element={<PromotionsList/>}/>
            <Route path="/orders" element={<LoggedInOnly><OrdersList/></LoggedInOnly>}/>
            <Route path="/bucket" element={<BucketView/>}/>
          </Routes>
        </BucketProvider>
      </UserProvider>
    </div>
  );
}

export default App;
