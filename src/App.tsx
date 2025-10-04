import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './components/pages/HomePage'
import { ReviewPage } from './components/pages/ReviewPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/review/:id" element={<ReviewPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
