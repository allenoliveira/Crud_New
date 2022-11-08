import { collection, getDocs, addDoc, doc, getDoc, query, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";

class StudentService {
    static list = (firestoreDb,callback)=>{
        getDocs(collection(firestoreDb,'student'))
        .then(
            (studentSnapshot)=>{
                const students = []
                studentSnapshot.forEach(
                    (student)=>{
                        const id = student.id
                        const {nome,curso,ira} = student.data()
                        students.push({id,nome,curso,ira})
                    }
                )
                callback(students)
            }
        )
        .catch(error=>console.log(error))
    } 


    static list_on_snapshot = (firestoreDb,callback)=>{
        const dq = query(collection(firestoreDb,'student'))
        const unscribe = onSnapshot(
            dq,
            (querySnapshot)=>{
                const students = []
                querySnapshot.forEach(
                    (document)=>{
                        const id = document.id
                        const {nome,curso,ira} = document.data()
                        students.push({id,nome,curso,ira})
                    }
                )

                callback(students)
            }
        )
    }


    static add = (firestoreDb,callback,student)=>{
        addDoc(collection(firestoreDb,'student'),student)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    }

    static retrieve = (firestoreDb,callback,id)=>{
        getDoc(doc(firestoreDb,'student',id))
        .then(
            (docSnap)=>{
                if(docSnap.exists()){
                    callback(docSnap.data())
                }
            }
        )

        .catch(error=>console.log(error))
    }



    static update = (firestoreDb,callback,id,student)=>{
        updateDoc(
            doc(firestoreDb,'student',id),student)
            .then(
                ()=>{
                    callback(true)
                }
            ) 
            .catch(error=>console.log(error))
    }


    static delete = (firestoreDb,callback,id)=>{
        deleteDoc(doc(firestoreDb,'student',id))
        .then(
            ()=>callback(true))
            .catch(error=>console.log(error))
    }

}


export default StudentService