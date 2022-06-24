import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Add from './pages/Add';
import Categories from './pages/Categories';
import View from './pages/View';
import Start from './pages/Start';
import Profile from './pages/Profile';
import SearchResult from './pages/SearchResult';

const App = () => {
  const [user, setUser] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId !== null) {
      setUser(true);
    }
    else{
      setUser(false);
    }
  }, [userId])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={user ? <Navigate to="/home" /> : <Start />} />
          <Route path="/search/:search" element={user ? <SearchResult /> : <Navigate to="/" />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
          <Route path="/add" element={user ? <Add /> : <Navigate to="/" />} />
          <Route path="/category/:value" element={user ? <Categories /> : <Navigate to="/" />} />
          <Route path="/view/:id" element={user ? <View /> : <Navigate to="/" />} />
          <Route path="/profile/:userId" element={user ? <Profile /> : <Navigate to="/" />} />
          {/* <Route path='/' element={<Start />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/category/:value' element={<Categories />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/search/:search' element={<SearchResult />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App;
