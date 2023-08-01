import './App.css';
import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';

import ManagerBook from './admin/ManagerBook';
import Edit_AddBook from './admin/Edit_AddBook';
import Header from './Customer/Header';
import Home from './Customer/Home';
import Footer from './Customer/Footer';
import Collection from './Customer/Collection';
import Search from './Customer/Search';
import NotFoundPage from './Customer/NotFoundPage';
import Login from './login_logup/Login';
import NotFoundAdminPage from './admin/NotFoundAdminPage';
import Product from './Customer/Product';
import Payment from './Customer/Payment';
import Cart from './Customer/Cart';
import Bills from './Customer/Bills';
import BillDetail from './Customer/BillDetail';
import ManagerBill from './admin/ManagerBill';
import ManagerBillDetail from './admin/ManagerBillDetail';

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const showHeaderandFooter = !location.pathname.startsWith("/admin");

  // Scroll đến phần header khi chuyển trang mới
  useEffect(() => {
    scroll.scrollToTop({
      duration: 0,
      smooth: false
    });
  }, [location]);

  return (
    <div className="App">
      {showHeaderandFooter && <Header user={user} />}
      <Routes>
        <Route path='/*' element={<NotFoundPage />}></Route>
        <Route path='/admin/*' element={user?.position === 'Admin' ? <NotFoundAdminPage user={user} /> : <Login check={2} />}></Route>
        <Route path='/admin' element={<ManagerBook user={user} />}></Route>
        <Route path='/admin/books' element={<ManagerBook user={user} />}></Route>
        <Route path='/admin/bills' element={user?.position === 'Admin' ?<ManagerBill user={user} />: <Login check={2} />}></Route>
        <Route path='/admin/bill/:id' element={user?.position === 'Admin' ?<ManagerBillDetail user={user} />: <Login check={2} />}></Route>
        <Route path='/admin/book/:id' element={user?.position === 'Admin' ? <Edit_AddBook user={user} /> : <Login check={2} />} />
        <Route path='/' element={<Home user={user} />}></Route>
        <Route path='/trang-chủ' element={<Home user={user} />}></Route>
        <Route path='/books/:name' element={<Collection user={user} />}></Route>
        <Route path='/search/:text' element={<Search user={user} />}></Route>
        <Route path='/book/:author/:title' element={<Product user={user} />}></Route>
        <Route path='/cart' element={<Cart user={user} />}></Route>
        <Route path='/payment' element={user?.position === 'Admin' ? <NotFoundPage />: <Payment user={user} />}></Route>
        <Route path='/order' element={ user?.position === 'Admin' ? <NotFoundPage /> :<Bills user={user} />}></Route>
        <Route path='/order/:id' element={user?.position === 'Admin' ? <NotFoundPage /> : <BillDetail user={user} />}></Route>
      </Routes>
      {showHeaderandFooter && <Footer />}
    </div>
  );
}

export default App;
