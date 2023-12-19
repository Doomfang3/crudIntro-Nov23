import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProjectPage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/projects/${projectId}`)
      if (response.ok) {
        const productData = await response.json()
        setTitle(productData.title)
        setDescription(productData.description)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { title, description }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        navigate(`/projects/${projectId}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>Update project with Id {projectId}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title :
          <input value={title} onChange={event => setTitle(event.target.value)} required />
        </label>
        <label>
          Description :
          <input
            value={description}
            onChange={event => setDescription(event.target.value)}
            required
          />
        </label>
        <button type='submit'>Update</button>
      </form>
    </>
  )
}

export default UpdateProjectPage
