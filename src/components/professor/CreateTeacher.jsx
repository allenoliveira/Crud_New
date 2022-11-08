import axios from "axios"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import FirebaseContext from "../../utils/FirebaseContext"
import TeacherService from "../../services/TeacherService"


const CreateTeacherPage = ()=>{
    return (
        <FirebaseContext.Consumer>
            {value => <CreateTeacher firebase={value}/>}
        </FirebaseContext.Consumer>

    )
}


const CreateTeacher = (props)=> {

    const [name,setName] = useState('')
    const [course,setCourse] = useState('')
    const [salary,setSalary] = useState(0.0)

    const navigate = useNavigate()

    const handelSubmit = (event)=>{
        event.preventDefault()

        const newTeacher = {name, course, salary}
        TeacherService.add(
            props.firebase.getFirestoreDb(),
            (id)=>{
                alert(`Professor ${id} adicionado`)
                navigate('/listTeacher')
            },
            newTeacher
        )
    }

    return (
        <div style={{marginTop:20}}>
            <h1> Criar Professores: </h1>
        <form onSubmit={handelSubmit}>
            <div className="form-group" >
                <label>Nome:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Digite o seu nome"
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
                    value="Criar Professor"
                    className="btn btn-primary"
                    />
            </div>

        </form>
        </div>
    )
    
}

export default CreateTeacherPage