import React from 'react'
import './DashboardPage.scss'
import AddFolderBtn from '../../components/drive/AddFolderBtn'
import FolderBreadcrumbs from '../../components/drive/FolderBreadcrumbs'
import {Container} from 'react-bootstrap'
import {useFolder} from '../../hooks/useFolder'
import Folder from '../../components/drive/Folder'
import File from '../../components/drive/File'
import {useParams, useLocation} from 'react-router-dom'
import AddFileBtn from '../../components/drive/AddFileBtn'

export default function DashboardPage() {
    const {folderId} = useParams()
    const { state ={} } = useLocation()
    const {folder, childFolders, childFiles} = useFolder(folderId, state.folder)

    return (
        <>
            <Container fluid className='mt-2'>
                <div className="d-flex align-center">
                    <FolderBreadcrumbs currentFolder={folder}/>
                    <AddFolderBtn currentFolder={folder}/>
                    <AddFileBtn currentFolder={folder}/>
                </div>
                {
                    childFolders.length > 0 && (
                        <div className={'dashboard-return-wrapper'}>
                        <h1 className={'dashboard-title'}>Welcome to IITI Classroom</h1>
                        <div className={'dashboard-subject-cards'}>
                            {childFolders.map(childFolder => (
                                    <Folder key={childFolder.id} folder={childFolder}/>
                            ))}
                        </div>
                    </div>
                        
                    )
                }
                {childFiles.length > 0 && childFolders.length > 0 && <hr/>}
                {
                    childFiles.length > 0 && (
                        <div className="d-flex flex-wrap">
                            {childFiles.map(childFile => (
                                <div className='p-2' key={childFile.id}>
                                    <File file={childFile}/>
                                </div>
                            ))}
                        </div>
                    )
                }
            </Container>
       
        </>
    )
}
