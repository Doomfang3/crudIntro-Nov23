import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AllProjectsPage from './pages/AllProjects'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import NewProjectPage from './pages/NewProjectPage'
import UpdateProjectPage from './pages/UpdateProjectPage'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/projects'>All projects</Link>
          </li>
          <li>
            <Link to='/projects/new'>New project</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<AllProjectsPage />} />
        <Route path='/projects/new' element={<NewProjectPage />} />
        <Route path='/projects/:projectId' element={<ProjectDetailsPage />} />
        <Route path='/projects/:projectId/update' element={<UpdateProjectPage />} />

        <Route path='*' element={<h1>404 page</h1>} />
      </Routes>
    </>
  )
}

export default App
