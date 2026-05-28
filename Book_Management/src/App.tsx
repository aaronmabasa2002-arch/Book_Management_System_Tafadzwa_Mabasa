import Login from './Login'
import Register from './Register'
import { AppProvider, useApp } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import BookList from './pages/BookList'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import Landing from './pages/Landing'
import './App.css'
import './Dashboard.css'

const AppRoutes = () => {
  const { user, view, setView } = useApp()

  if (!user) {
    if (view === 'register') {
      return (
        <Register
          onSwitchToLogin={() => setView('login')}
          onBackToHome={() => setView('landing')}
        />
      )
    }
    if (view === 'login') {
      return (
        <Login
          onSwitchToRegister={() => setView('register')}
          onBackToHome={() => setView('landing')}
        />
      )
    }
    return <Landing />
  }

  switch (view) {
    case 'books':
      return <BookList />
    case 'add-book':
      return <AddBook />
    case 'edit-book':
      return <EditBook />
    case 'dashboard':
    default:
      return <Dashboard />
  }
}

function App() {
  return (
    <AppProvider>
      <div className="app-root">
        <AppRoutes />
      </div>
    </AppProvider>
  )
}

export default App
