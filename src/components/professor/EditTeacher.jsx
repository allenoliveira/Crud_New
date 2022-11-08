import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import axios from "axios"

import FirebaseContext from "../../utils/FirebaseContext"
import TeacherService from "../../services/TeacherService"

const EditTeacherPage = ()=> {
    return(
        <FirebaseContext.Consumer>
            {value => <EditTeacher firebase={value}/> }
        </FirebaseContext.Consumer>
    )

}


const EditTeacher = (props)=>{

    const [name,setName] = useState('')
    const [course,setCourse] = useState('')
    const [salary,setSalary] = useState(0.0)
    const [instituicao,setInstituicao] = useState('')


    const navigate = useNavigate()
    const params = useParams()

    useEffect(
        ()=>{

            TeacherService.retrieve(
                props.firebase.getFirestoreDb(),
                (teacher)=>{
                    setName(teacher.name)
                    setCourse(teacher.course)
                    setSalary(teacher.salary)

                },

                params.id
            )
        }

        ,
        []
    )

        const Submit = (event) => {
            event.preventDefault()

            const teacherUpdated = {name,course,salary,instituicao}
            TeacherService.update(
                props.firebase.getFirestoreDb(),
                (rs)=>{
                    navigate('/listTeacher')
                },

                params.id,
                teacherUpdated
            )
        }

        
    return (
        <div>
            <h1>Editar Professor: {params.id} </h1>
            <form onSubmit={Submit}>
            <div className="form-group" >
                <label>Nome:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Digite o seu nome"
                value={(name === null || name === undefined)?'':name}
                onChange={
                    (event)=>(
                        setName(event.target.value)
                    )
                }
                />
                </div>
                <div className="form-group">
                    <label>Curso:</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o seu curso"
                    value={course ?? ''}
                    onChange={
                        (event)=>(
                            setCourse(event.target.value)
                        )
                    }
                    />
                    </div>
                <div className="form-group">
                    <label>Salário:</label>
                    <input
                    type="number"
                    step="any"
                    className="form-control"
                    placeholder="Digite o seu salário"
                    value={salary ?? 0.0}
                    onChange={
                        (event)=>(
                            setSalary(event.target.value)
                        )
                    }         
                    
                    />
                </div>
                
                <div className="form-group" style={{marginTop:20}}>
                    <input
                    type="submit"
                    value="Editar Professor"
                    className="btn btn-primary"
                    />
            </div>

        </form>
        </div>
    )

}

export default EditTeacherPage