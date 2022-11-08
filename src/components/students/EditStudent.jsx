import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

import FirebaseContext from '../../utils/FirebaseContext'
import StudentService from '../../services/StudentService'

const EditStudentPage = () => {
    return (
        <FirebaseContext.Consumer>
            {value => <EditStudent firebase={value} /> }
        </FirebaseContext.Consumer>
    )
}

const EditStudent = (props)=> {


    const [nome,setNome] = useState('')
    const [curso,setCurso] = useState('')
    const [ira,setIra] = useState(0.0)
    
    const navigate = useNavigate()
    const params = useParams()



    useEffect(
        ()=>{

            StudentService.retrieve(
                props.firebase.getFirestoreDb(),
                (student)=>{
                    setNome(student.nome)
                    setCurso(student.curso)
                    setIra(student.ira)
                },
                params.id
            )


            /*axios.get('http://localhost:3001/students/'+params.id)
            .then(
                (response)=>{
                    setNome(response.data.nome)
                    setCurso(response.data.curso)
                    setIra(response.data.ira)
                }
            )
            .catch((error)=>console.log(error))
            */
        }
        ,
        []
    )
    const handelSubmit = (event)=> {
        event.preventDefault()

        const studentUpdated = {nome,curso,ira}
        StudentService.update(
            props.firebase.getFirestoreDb(),
            (result)=>{
                navigate('/listStudent')
            },

            params.id,
            studentUpdated
        )

    
        
        /*axios.put('http://localhost:3001/students/'+params.id,studentUpdated)
        .then(
            (response)=>{
                navigate('/listStudent')
            }
        )
        .catch((error=>console.log(error)))*/

    }

    return (
        <div>
            <h1>Editar Estudante: {params.id} </h1>
            <form onSubmit={handelSubmit}>
            <div className="form-group" >
                <label>Nome:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Digite o seu nome"
                value={(nome === null || nome === undefined)?'':nome}
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
                    value={curso ?? ''}
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
                    value={ira ?? 0.0}
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
                    value="Editar Estudante"
                    className="btn btn-primary"
                    />
            </div>

        </form>
        </div>
    )
}

export default EditStudentPage  