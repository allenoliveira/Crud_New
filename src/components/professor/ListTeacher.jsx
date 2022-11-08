import { useState, useEffect } from "react"
import { Link } from   'react-router-dom'


import axios from 'axios'

import FirebaseContext from "../../utils/FirebaseContext"
import TeacherService from "../../services/TeacherService"


const ListTeacherPage = ()=>{
    return(
        <FirebaseContext.Consumer>
            {value => <ListTeacher firebase={value}/>}
        </FirebaseContext.Consumer>
    )
}

const ListTeacher = (props)=>{
   
    const [teachers, setTeachers] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(
        ()=>{

            TeacherService.list_on_snapshot(
                props.firebase.getFirestoreDb(),
                (teachers) => {
                    setTeachers(teachers)
                }
            )
        }
        ,
        []
    )


    function deleteTeacherSec(id){
        if (window.confirm('Deseja deletar?')){
            TeacherService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                    let teachersTemp = teachers
                    for (let i=0;i<teachersTemp.length;i++){
                        if (teachersTemp[i].id===id){
                            teachersTemp.splice(i,1)
                            break
                        }
                    }

                    setTeachers(teachersTemp)
                    setReload(!reload)
                },
                id
            )
        }
    }

    /*function deleteTeacher(id){
        if(window.confirm('Deseja deletar?')){
            TeacherService.delete(
                props.firebase.getFirestoreDb(),
                ()=>{
                    let teacherTempResult = teachers.filter(
                        (teacher)=> teacher.id !== id
                    )

                    setTeachers(teacherTempResult)
                },
                id
            )
        }
    }
    */

    const genereateList = ()=>{
        return teachers.map(
            (element,index)=>{
                element.key = index
                return(
                    <tr>
                        <td>{element.id}</td>
                        <td>{element.name}</td>
                        <td>{element.course}</td>
                        <td>{element.salary}</td>

                        <td>
                            <Link to={'/editTeacher/'+element.id} className='btn btn-primary'>
                                Editar
                            </Link>

                        </td>
                        <td>
                        <button className='btn btn-danger' onClick={()=>deleteTeacherSec(element.id)}>
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
            <h1>Listar Professor </h1>
            <table className="table table-striped table-bordered table-condensed table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Salário</th>
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

export default ListTeacherPage