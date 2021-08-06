import React, { useEffect, useRef, useState } from 'react';
import { Form } from "react-bootstrap";
import { database } from "../../fbConfig";
import Folder from "../Folder/Folder";
import File from "../File/File";


function SearchBar() {

    const ref1 = useRef(null)
    const [query, setQuery] = useState('')
    const [fileQueryCards, setFileQueryCards] = useState([])
    const [folderQueryCards, setFolderQueryCards] = useState([])


    useEffect(() => {
        database.files.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
            .get()
            .then(filesSnapshot => {
                const tempFileQueryCards = []
                if (query !== '')
                    filesSnapshot.docs.forEach(doc => {
                        tempFileQueryCards.push(<File size={[20, 15]} key={doc.id} file={doc.data()} />)
                    })
                setFileQueryCards(tempFileQueryCards)
            })
        database.folders.where('name', '>=', query).where('name', '<=', query + '\uf8ff')
            .get()
            .then(foldersSnapshot => {
                const tempFolderQueryCards = []
                if (query !== '')
                    foldersSnapshot.docs.map(doc => {
                        const folder = { id: doc.id, ...doc.data() }
                        return tempFolderQueryCards.push(<Folder key={doc.id} folder={folder} />)
                    })
                setFolderQueryCards(tempFolderQueryCards)
            })
    }, [query])

    return (
        <>
            <div className="search-container">
                <Form.Control
                    type='text'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    ref={ref1}
                    placeholder='Search...'
                />

                {!(folderQueryCards.length === 0 && fileQueryCards.length === 0 && query === '') ?
                    <div className="body-wrapper">
                        <h5 className='text-center pt-1'>Results!</h5>
                    
                        <div className='body'>
                            {folderQueryCards}
                            {fileQueryCards}
                        </div>
                    </div>
                    : null}

            </div>



        </>
    );
}

export default SearchBar;