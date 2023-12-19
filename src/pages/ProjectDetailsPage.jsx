import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProjectDetailsPage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState()

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/projects/${projectId}`)
      if (response.ok) {
        const productData = await response.json()
        setProduct(productData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/projects/${projectId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        navigate('/projects')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>Details of the project with id {projectId}</h1>
      {product ? (
        <>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <Link to={`/projects/${projectId}/update`}>
            <button type='button'>Update</button>
          </Link>
          <button type='button' onClick={handleDelete}>
            Delete
          </button>
        </>
      ) : null}
    </>
  )
}

export default ProjectDetailsPage
