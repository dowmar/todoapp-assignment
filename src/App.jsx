
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
// import ActivityDetail from "./components/ActivityDetail.jsx";
// import Task from './components/Task.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<ActivityDetail />} />
        {/* <Route path="/tasks/:id" element={<Tasks />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
