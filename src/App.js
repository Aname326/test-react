import React, {useEffect, useState} from 'react'; 
import './styles.css';
import { Auth } from './components/auth';
import { AuthPhone } from './components/authPhone';
import { db } from "./components/firebase";
import { getDocs, collection } from "firebase/firestore";


let num = 0

function App() {
  {/* 1st testing starts  -- how to use useState */} 
  const [isClicked, setIsClicked] = useState(false);
  const [Clicked, itIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  const SecondClick = () => {
    itIsClicked(!Clicked)
  }

  {/* 2nd testing starts  -- changing different buttons names -- failed */}
  const [button1, setName1] = useState("original1")
  const [button2, setName2] = useState("original2")
  const [button3, setName3] = useState("original3")

  const changeClicked = () => {
    setName1(!button1)
    setName2(!button2)
    setName3(!button3)
  }

  {/* 3rdd testing starts  -- using hook */}

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

  {/* testing of authentication */}

  const [date, setDateList] = useState([]);

  const dateCollectionRef = collection(db, "familynightTEST")

  useEffect(() => {
    const getDateList = async () => {
      // read the data
      // set the date list 
      try{
        const data = await getDocs(dateCollectionRef)
        console.log(data)
      } catch (err) {
        console.error(err)
      }
    }

    getDateList();
  }, [] ) 




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
        <button> 1 </button>
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
      

    </div>
  );
}

export default App;
