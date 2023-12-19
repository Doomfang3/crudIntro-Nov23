import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewProjectPage = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { title, description }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.status === 201) {
        const newProject = await response.json()
        console.log(newProject)
        navigate(`/projects/${newProject.id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>New project</h1>
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
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default NewProjectPage
