import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config';
import ShowMainData from '../components/show/ShowMainData'
import Details from '../components/show/Details'
import Cast from '../components/show/Cast'
import Season from '../components/show/Season'

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return { isLoading: false, error: null, show: action.show }
        }

        case 'FETCH_FILED': {
            return { ...prevState, isLoading: false, error: action.error }
        }

        default: return prevState;
    }
}

const initialState = {
    show: null,
    isLoading: true,
    error: null
}


const Show = () => {
    const { id } = useParams();

    const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            if (isMounted) {
                dispatch({ type: 'FETCH_SUCCESS', show: results })
            }
        }).catch(err => {
            if (isMounted) {
                dispatch({ type: 'FETCH_FILED', error: err.message })
            }
        })

        return () => {
            isMounted = false;
        }
    }, [id])


    if (isLoading) {
        return <div>Data is being loading</div>
    }

    if (error) {
        return <div>Error occured: {error}</div>
    }

    return (
        <div>
            <ShowMainData
                image={show.image}
                name={show.name}
                rating={show.rating}
                summary={show.summary}
                tags={show.genres}
            />
            <div>
                <h2>Details</h2>
                <Details
                    status={show.status}
                    network={show.network}
                    premiered={show.premiered}
                />
            </div>
            <div>
                <h2>Seasons</h2>
                <Season seasons={show._embedded.seasons} />
            </div>
            <div>
                <h2>Casts</h2>
                <Cast cast={show._embedded.cast} />
            </div>
        </div>
    )
}

export default Show