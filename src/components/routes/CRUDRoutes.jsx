import { Routes, Route } from "react-router-dom"

import Home from '../Home';

import CreateStudent from '../students/CreateStudent';
import EditStudent from '../students/EditStudent';
import ListStudent from '../students/ListStudent';

import CreateTeacher from '../professor/CreateTeacher'
import EditTeacher from '../professor/EditTeacher'
import ListTeacher from '../professor/ListTeacher'

const CRUDRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='createStudent' element={<CreateStudent />} />
            <Route path='listStudent' element={<ListStudent />} />
            <Route path='editStudent/:id' element={<EditStudent />} />
            <Route path='createTeacher' element={<CreateTeacher />} />
            <Route path='listTeacher' element={<ListTeacher />} />
            <Route path='editTeacher/:id' element={<EditTeacher />} />
        </Routes>
    )
}

export default CRUDRoutes