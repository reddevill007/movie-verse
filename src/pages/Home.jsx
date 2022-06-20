import React, { useState } from 'react'
import MainpageLayout from '../components/MainpageLayout'
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid'
import ActorGrid from '../components/actor/ActorGrid'

const Home = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOptions, setSearchOptions] = useState('shows');

    const isShowsSearch = searchOptions === 'shows';

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    }

    const onSearch = () => {
        apiGet(`/search/${searchOptions}?q=${input}`).then(result => {
            setResults(result);
        });
    }

    const onKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            onSearch()
        }
    }

    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No Results</div>
        }

        if (results && results.length > 0) {
            return results[0].show ? (
                <ShowGrid data={results} />
            ) : (
                <ActorGrid data={results} />
            )
        }

        return null;
    }

    const onRadioChange = (ev) => {
        setSearchOptions(ev.target.value)
    }

    console.log(searchOptions)

    return (
        <MainpageLayout>
            <input type="text" placeholder='Search for something' onChange={onInputChange} onKeyDown={onKeyDown} value={input} />
            <div>
                <label htmlFor='shows-search'>
                    Shows
                    <input type="radio" checked={isShowsSearch} id='shows-search' value="shows" onChange={onRadioChange} />
                </label>
                <label htmlFor='actors-search'>
                    Actors
                    <input type="radio" checked={!isShowsSearch} id='actors-search' value="people" onChange={onRadioChange} />
                </label>
            </div>
            <button type='button' onClick={onSearch}>Search</button>
            {renderResults()}
        </MainpageLayout>
    )
}

export default Home