import React from 'react'
import Nav from './Nav'
import Title from './Title'

const MainpageLayout = ({ children }) => {
    return (
        <div>
            <Title title="Movie Verse" subtitle="are you looking for qa movie or an actor" />
            <Nav />

            {children}
        </div >
    )
}

export default MainpageLayout