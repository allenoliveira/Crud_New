import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import FirebaseContext from '../../utils/FirebaseContext'
import StudentService from '../../services/StudentService'

const CreateStudentPage = () => {
    return(
        <FirebaseContext.Consumer>
            {value => <CreateStudent firebase={value} />}
        </FirebaseContext.Consumer>
    )
}

const CreateStudent = (props)=> {

const [nome,setNome] = useState('')
const [curso,setCurso] = useState('')
const [ira,setIra] = useState(0.0)
const navigate = useNavigate()


const handelSubmit = (event)=> {
    event.preventDefault()
    /*console.log(nome)
    console.log(curso)
    console.log(ira) */   
    const newStudent = {nome,curso,ira}
    StudentService.add(
        props.firebase.getFirestoreDb(),
        (id)=>{
            alert(`Estudante ${id} adicionado`)
            navigate('/listStudent')
        },
        newStudent
    )    
    /*axios.post('http://localhost:3001/students',newStudent)
    .then(
        (response)=>{
            console.log(response.data.id)
            navigate('/listStudent')
        }
    )
    .catch(error=>console.log(error))
    */
}

    return (
        <div style={{marginTop:20}}>
            <h1>Criar Estudantes: </h1>
        <form onSubmit={handelSubmit}>
            <div className="form-group" >
                <label>Nome:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Digite o seu nome"
                onChange={
                    (event)=>(
                        setNome(event.target.value)
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
                            setCurso(event.target.value)
                        )
                    }
                    />
                    </div>
                <div className="form-group">
                    <label>IRA:</label>
                    <input
                    type="number"
                    step="any"
                    className="form-control"
                    placeholder="Digite o seu IRA"
                    onChange={
                        (event)=>(
                            setIra(event.target.value)
                        )
                    }         
                    
                    />
                </div>
                <div className="form-group" style={{marginTop:20}}>
                    <input
                    type="submit"
                    value="Criar Estudante"
                    className="btn btn-primary"
                    />
            </div>

        </form>
        </div>
    )
}

export default CreateStudentPage