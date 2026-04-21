import { useState } from 'react'
import PWABadge from './PWABadge.jsx'
import './App.css'

function App() {
    const [formData, setFormData] = useState({ title: '' })
    const [results, setResults] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const query = encodeURIComponent(formData.title)
        const url = `https://dev.to/api/articles?top=1&per_page=10=${query}`

        try {
            const response = await fetch(url)
            const data = await response.json()
            setResults(data.features || [])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title : </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />
                    </div>
                    <button type="submit">Envoyer</button>
                </form>
                <div>
                    {results.map((feature) => (
                        <div key={feature.properties.id}>{feature.properties.label}</div>
                    ))}
                </div>
            </div>
            <PWABadge />
        </>
    )
}

export default App