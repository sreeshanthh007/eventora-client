
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Toaster } from 'sonner'
import ClientRoutes from './routes/ClientRoutes'
import { VendorRoutes } from './routes/VendorRoutes'

function App() {

  return (
    <>
    <AppLayout/>
    </>
  )
}




function AppLayout() {
  return(
    <Router>
      <Toaster theme='dark' position='top-right'/>
      <Routes>
        <Route path='/*' element={<ClientRoutes/>}/>
        <Route path='/vendor/*' element={<VendorRoutes/>}/>
      </Routes>
    </Router>
  )
}

export default App
