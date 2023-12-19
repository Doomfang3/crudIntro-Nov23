import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AllProjectsPage = () => {
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/projects`)
      if (response.ok) {
        const productsData = await response.json()
        setProjects(productsData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async idToDelete => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/projects/${idToDelete}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>All the projects</h1>
      <ul>
        {projects.map(project => (
          <Fragment key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <li>{project.title}</li>
            </Link>
            <button type='button' onClick={() => handleDelete(project.id)}>
              Delete
            </button>
          </Fragment>
        ))}
      </ul>
    </>
  )
}

export default AllProjectsPage
