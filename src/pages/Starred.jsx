import React, { useEffect, useState } from 'react'
import MainpageLayout from '../components/MainpageLayout'
import { useShows } from '../misc/custom-hooks'
import { apiGet } from '../misc/config'
import { flushSync } from 'react-dom'
import ShowGrid from '../components/show/ShowGrid'

const Starred = ({ data }) => {
    const [starred] = useShows();

    const [shows, setShows] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (starred && starred.length > 0) {
            const promises = starred.map(showId => apiGet(`/shows/${showId}`))
            Promise.all(promises)
                .then(apiData => apiData.map(show => ({ show })))
                .then(results => {
                    // console.log('results', results)
                    setShows(results);
                    setIsLoading(false);
                }).catch(err => {
                    setError(err.message);
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [starred])

    return (
        <MainpageLayout>
            {isLoading && <div>Shows are still loading </div>}
            {error && <div>Error occured : {error}</div>}
            {!isLoading && !shows && <div>No shows were added </div>}
            {!isLoading && !error && shows && <ShowGrid data={shows} />}
        </MainpageLayout>
    )
}

export default Starred