import React from 'react'
import { Link } from 'react-router-dom'

const SearchResults = ({ searchResults, handleResultClick }) => {

    return (
        <div>
            {searchResults.length === 0 ? (
                <p className="p-1">No search results found.</p>
            ) : (
                searchResults.map(({ _id, name, titleImage,numberOfRevies, rate }) => (
                    <Link to={`/movie/${_id}`} className="w-full">
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '1rem',
                            width: '596px',
                        }}
                        key={_id}
                        className="p-2 rounded-lg hover:bg-subMain hover:text-white cursor-pointer grid gap-4"
                        onClick={() => handleResultClick(_id)}
                    >
                        <div>
                            <img src={titleImage} style={{width: "100%", height: "80px", objectFit: 'cover'}}/>
                        </div>
                        <div align='start'>
                            

                            <p>{name}</p>
                            <p>Rate: {rate}</p>
                            <p>Total review: {numberOfRevies}</p>
                            
                        </div>
                    </div>
                    </Link>
                ))
            )}
        </div>

    )
}

export default SearchResults