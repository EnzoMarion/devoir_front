import { useEffect, useState } from 'react'
import PWABadge from './PWABadge.jsx'
import './App.css'

function App() {
    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchArticles = async () => {
            const url = 'https://dev.to/api/articles?top=1&per_page=10'

        try {
            const response = await fetch(url)
            const data = await response.json()
            setResults(data)
        } catch (error) {
            console.error(error)
        }
    }

        fetchArticles()
    }, [])

    return (
        <>
            <div>
                <div>
                    {results.map((article) => (
                        <div key={article.id}>
                            <a href={article.url} target="_blank" rel="noreferrer">
                                {article.title}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <PWABadge />
        </>
    )
}

export default App