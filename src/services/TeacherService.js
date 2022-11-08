import { collection, getDocs, addDoc, doc, getDoc, query, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";

class TeacherService {
    static list = (firestoreDb,callback)=>{
        getDocs(collection(firestoreDb,'teacher'))
        .then(
            (teacherSnapshot)=>{
                const teachers = []
                teacherSnapshot.forEach(
                    (teacher)=>{
                        const id = teacher.id
                        const {name,course,salary} = teacher.data()
                        teachers.push({id,name,course,salary})
                    }
                )

                callback(teachers)
            }
        )

        .catch(error=>console.log(error))
    }

    static list_on_snapshot = (firestoreDb,callback)=>{
        const dq = query(collection(firestoreDb,'teacher'))
        const unscribe = onSnapshot(
            dq,
            (querySnapshot)=>{
                const teachers = []
                querySnapshot.forEach(
                (document)=>{
                    const id = document.id
                    const {name,course,salary} = document.data()
                    teachers.push({id,name,course,salary})
                }
            )
                callback(teachers)
            }
        )
    }



    static add = (firestoreDb,callback,teacher)=>{
        addDoc(collection(firestoreDb,'teacher'),teacher)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )

        .catch(error=>console.log(error))
    }

    static retrieve = (firestoreDb,callback,id)=>{
        getDoc(doc(firestoreDb,'teacher',id))
        .then(
            (docSnap)=>{
                if(docSnap.exists()){
                    callback(docSnap.data())
                }
            }
        )
    }


    static update = (firestoreDb,callback,id,teacher)=>{
        updateDoc(
            doc(firestoreDb,'teacher',id),teacher)
            .then(
                ()=>{
                    callback(true)
                }
            )

            .catch(error=>console.log(error))
    }

    static delete = (firestoreDb,callback,id)=>{
        deleteDoc(doc(firestoreDb,'teacher',id))
        .then(
            ()=>callback(true))
            .catch(error=>console.log(error))
    }

}


export default TeacherService