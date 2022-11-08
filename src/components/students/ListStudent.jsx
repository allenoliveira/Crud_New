
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import { listaEstudante } from  './data'
import axios from "axios"


import FirebaseContext from '../../utils/FirebaseContext'
import StudentService from '../../services/StudentService'

const ListStudentPage = () => {
    return(
        <FirebaseContext.Consumer>
            {value => <ListStudent firebase={value} />}
        </FirebaseContext.Consumer>
    )
}


const ListStudent = (props)=> {

    const [students, setStudents] = useState([])
    const [reload, setReload] = useState(false)
    
    useEffect(
        ()=>{

            StudentService.list_on_snapshot(
                props.firebase.getFirestoreDb(),
                (students) => {
                    setStudents(students)
                }
            )
            /* console.log  
            axios.get('http://localhost:3001/students')
            .then(
                (response)=>{
                    setStudents(response.data)

                }
            )
            .catch(
                (error)=>{
                    console.log(error)
                }
            )*/
        }
        ,
        []
    )


    function deleteStudentSec(id) {
        if (window.confirm('Deseja excluir?')){
            StudentService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                    let studentsTemp = students
                    for(let i=0;i<studentsTemp.length;i++){
                        if(studentsTemp[i].id===id){
                            studentsTemp.splice(i,1)
                            break

                        }
                    }

                    setStudents(studentsTemp)
                    setReload(!reload)
                },
                id
            )
        }
    } 

    function deleteStudent(id) {
        if(window.confirm('Deseja excluir?')){
            
            /*axios.delete('http://localhost:3001/students/' +id )
            .then(
                ()=>{
                    let result = students.filter((student)=>student.id !== id) 
                    setStudents(result)   
                }
            )
            .catch(error=>console.log(error)) */
            
            StudentService.delete(
                props.firebase.getFirestoreDb(),

                ()=>{

                    let studentTempReseult = students.filter(
                        (student)=> student.id !== id  
                    ) 

                    setStudents(studentTempReseult)

                },
                id
            )
        }
    }

    const genereateList = ()=> {
        return students.map(
            (element,index)=>{
                element.key = index
                return (
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.nome}</td>
                        <td>{element.curso}</td>
                        <td>{element.ira}</td>

                        <td>
                            <Link to={'/editStudent/'+element.id} className='btn btn-primary'>
                                Editar
                            </Link>

                        </td>
                        <td>
                        <button className='btn btn-danger' onClick={()=>deleteStudent(element.id)}>
                                Apagar
                        </button>
                        </td>

                    </tr>
                )
            }
        )
    }

    return (
        <div>
            <h1>Listar Estudante </h1>
            <table className="table table-striped table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>IRA</th>
                        <th colspan="2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {genereateList()}
                </tbody>

            </table>
        </div>
    )
}

export default ListStudentPage 