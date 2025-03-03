import React, {useState} from 'react'; 
import './styles.css';
import { Auth } from './components/auth';
import { AuthPhone } from './components/authPhone';
import { db, auth, storage } from "./components/firebase";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";



function App() {
  /* 1st testing starts  -- how to use useState */ 
  const [isClicked, setIsClicked] = useState(false);
  const [Clicked, itIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  const SecondClick = () => {
    itIsClicked(!Clicked)
  }

  /* 2nd testing starts  -- changing different buttons names -- failed */
  const [button1, setName1] = useState("original1")
  const [button2, setName2] = useState("original2")
  const [button3, setName3] = useState("original3")

  const changeClicked = () => {
    setName1(!button1)
    setName2(!button2)
    setName3(!button3)
  }

  /* 3rdd testing starts  -- using hook */

  const [button, btnNames] = useState({
    btnA: 'A',
    btnB: 'B',
    btnC: 'C'
  })

  const updateName = () => {
    btnNames(previousState => {
      return {
        ...previousState, 
        btnA: "New Name A",
        btnB: "New Name B",
        btnC: "New Name C"
      }
    })
  }

  /* testing of authentication */

  const [date, setDateList] = useState([]);

  // New Dates States 
  const [newDate, setNewDate] = useState("2020-03-01")
  const [newRegName, setNewRegName] = useState("")
  const [newNumOfAdults, setNewNumOfAdults] = useState("")
  const [newPaid, setNewPaid] = useState(false)

  // Update Register Name States
  const [updateRegName, setUpdateRegName] = useState("")

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null)

  const dateCollectionRef = collection(db, "familynightTEST")

  const getDateList = async () => {
    // read the data
    // set the date list 
    try{
      const data = await getDocs(dateCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id, 
      }))
      setDateList(filteredData);
    } catch (err) {
      console.error(err)
    }
  }

  const deleteDate = async (id) => {
    const dateDoc = doc(db, "familynightTEST", id);
    await deleteDoc(dateDoc);
    getDateList();
  }

  const updateDate = async (id, ) => {
    const dateDoc = doc(db, "familynightTEST", id);
    await updateDoc(dateDoc, {RegName: updateRegName});
    getDateList();
  }

  
    
  


  const onSubmitDate = async () => {
    try{
      await addDoc(dateCollectionRef, {
        //how to put date??
        RegName: newRegName,
        NumOfAdults: newNumOfAdults,
        Paid: newPaid,
        userId: auth?.currentUser?.uid, date: newDate
      });

      getDateList();
    } catch(err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err) {
      console.error(err)
    }
  }


  return (
    <div className="App">
      <div className='Navbar'> navbar</div>

      {/* 1st testing starts  -- how to use useState */}
      <button onClick={handleClick}> change Text </button>
      <button onClick={SecondClick}> second button</button>

      <p>
        {isClicked ? 'Text has been changed' : 'Click the button to change text'}
      </p>

      <p>
        {Clicked ? 'changed' : 'second button'}
      </p>

      <br /><br /><br />

      {/* 2nd testing starts  -- changing different buttons names -- failed */}
      <button> { button1 } </button>
      <button> { button2 } </button>
      <button> { button3 } </button>
      <button onClick={() => setName1("changed")}> change buttons </button>

      <br /><br /><br />

      {/* 3rdd testing starts  -- using hook */}
      <p> This is {button.btnA} </p>
      <p> This is {button.btnB} </p>
      <p> This is {button.btnC} </p>
      <button onClick={updateName}> change to abc </button>

      <div className='block'>
        <button onClick={changeClicked}> 1 </button>
        <button> 2 </button>
        <button> 3 </button>
        <button> 4 </button>
      </div>

      <br /><br /><br /> 

      testing for firebase authetication 

      <br />
      <input placeholder='Phone Number' /> <br />
      <button> sign in </button>
      <button> log in </button>

      <br /><br /><br /> 

      <Auth />

      <br /><br /><br /> 

      <AuthPhone />

      <br /><br /><br />
      {/* firebase storing code */}

      <div> 
        <input placeholder="another date..." type="date" onChange={(e) => setNewDate(Date(e.target.value))} />
        <input placeholder="register name..." onChange={(e) => setNewRegName(e.target.value)} />
        <input placeholder="number of adults..." type="number" onChange={(e) => setNewNumOfAdults(Number(e.target.value))} />
        <input placeholder="number of children..." type="number" />
        <input placeholder="dietary requirements..." />
        <input type="checkbox" checked={newPaid} onChange={(e) => setNewPaid(e.target.checked)} />
        <label> Paid </label>
        <br /> <button onClick={onSubmitDate}> submit </button>
      </div>

      <br />

      <div>
        {date.map((familynightTEST) => (
          <div>
            <h1 style={{color: familynightTEST.Paid ? "green" : "red" }}> {familynightTEST.RegName}</h1>
            <p> Number of Adults: {familynightTEST.NumOfAdults} </p>
            <button onClick={() => deleteDate(familynightTEST.id)}> delete </button>
            <input placeholder='new register name...' onChange={(e) => setUpdateRegName(e.target.value)} />
            <button onClick={() => updateDate(familynightTEST.id)}> update </button>
          </div>
        ))}
      </div>

      <br /><br /><br />

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} /> 
        <br />
        <button onClick={uploadFile}> Submit File</button>
      </div>
      
      <br /><br /><br />

    </div>
  );
}

export default App;
