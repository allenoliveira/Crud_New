/* import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, Link } from 'react-router-dom'

import Home from './components/Home';
import CreateProfessor from './components/professor/CreateProfessor';
import CreateStudent from './components/students/CreateStudent';
import EditProfessor from './components/professor/EditProfessor';
import EditStudent from './components/students/EditStudent';
import ListProfessor from './components/professor/ListProfessor';
import ListStudent from './components/students/ListStudent';

function App() {
  return (
    <div className='container'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Link to='/' className='navbar-brand' style={{ paddingLeft: 40 }}>CRUD</Link>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>Home</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Estudante
              </a>
              <ul className="dropdown-menu">
                <li className='nav-item'>
                  <Link to='/createStudent' className='nav-link'>Criar Estudante</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/listStudent' className='nav-link'>Listar Estudante</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/editStudent' className='nav-link'>Editar Estudante</Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Professor
              </a>
              <ul className="dropdown-menu">
                <li className='nav-item'>
                  <Link to='/createProfessor' className='nav-link'>Criar Professor</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/listProfessor' className='nav-link'>Listar Professor</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/editProfessor' className='nav-link'>Editar Estudante</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='createStudent' element={<CreateStudent />} />
        <Route path='listStudent' element={<ListStudent />} />
        <Route path='editStudent' element={<EditStudent />} />
      </Routes>
      <Routes>
        <Route path='createProfessor' element={<CreateProfessor />} />
        <Route path='listProfessor' element={<ListProfessor />} />
        <Route path='editProfessor' element={<EditProfessor />} />
      </Routes>

    </div>
  );
}

export default App;

*/


import { Link } from 'react-router-dom'

import CRUDRoutes from './components/routes/CRUDRoutes';

function App() {
  return (
    <div className='container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className='navbar-brand' style={{ paddingLeft: 10 }}>CRUD</Link>
        <ul className='navbar-nav mr-auto'>
          
          <li className='nav-item'>
            <Link to='/' className='nav-link'>Home</Link>
          </li>

          <li className='nav-item dropdown'>
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Estudante
            </a>
            <ul class="dropdown-menu dropdown-menu-light">
              <li>
                <Link className="dropdown-item" to='/createStudent'>Criar Estudante</Link>
              </li>
              <li>
                <Link className="dropdown-item" to='/listStudent'>Listar Estudante</Link>
              </li>
              <li>
              <Link className="dropdown-item" to='/editStudent'>Editar Estudante</Link>
              </li>
            </ul>
          </li>

          <li className='nav-item dropdown'>
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Professor
            </a>
            <ul class="dropdown-menu dropdown-menu-light">
              <li>
                <Link className="dropdown-item" to='/createTeacher'>Criar Professor</Link>
              </li>
              <li>
                <Link className="dropdown-item" to='/listTeacher'>Listar Professor</Link>
              </li>
              <li>
              <Link className="dropdown-item" to='/editTeacher'>Editar Professor</Link>
              </li>
            </ul>
          </li>

        </ul>
      </nav>
      {<CRUDRoutes />}
    </div>
  );
}

export default App;