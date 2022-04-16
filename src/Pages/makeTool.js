import React ,{useEffect, useState}from 'react'
import { onSnapshot, collection, addDoc , setDoc, doc, deleteDoc} from "firebase/firestore"; 
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

var MakeTool;
export default MakeTool = ()=>{
	const [user, loading, error] = useAuthState(auth);
	
	const [loc, setLoc] = useState(null)
	const [wP,setwP] = useState(null)
	const [P,setP] = useState({})
	const [selles, setSelles] = useState([{ name: "Loading...", id: "initial" }]);
  
  
  	const addPayDate= async (t,d,i,pid)=>{
  	const collectionRef = collection(db, "buy"); 
  	const payload = { 
  		tit:t,
  		Description:d,
  	  imgLink:i,		
  		userid:	pid,
  		buyer:user.email,
  		loc:loc
  		}; 
  	await addDoc(collectionRef, payload);
  }
  
  const getdate =() =>{
  	onSnapshot(collection(db, "posts"), (snapshot) =>{
  		setSelles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  	})
  }

	useEffect(() => { 
		getdate()
	}, []);


  if (user) return (
	<>
    <div>

      	
      		<div>
      		      {selles.map((selles) => ( 
      		      	<>
      		          <div className='selles' key={selles.id}> 
      		             <img className='selles-img' src={selles.imgLink ? selles.imgLink : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgockbw0WHFPeeOcoawCvlJEmTjYPLfZO4v15W4mTEm1wpSho&s'} />
      		             <p className='selles-tit'>{selles.tit}</p> 
      		             <button onClick={()=>{ setwP(true); setP({t:selles.tit, d:selles.Description, i:selles.imgLink, pid:selles.userid})}}  
      		             className='selles-payUrl'>Pay</button>
      		             
      		           </div>
      		           <div className='pay-pop' style={{display:wP? null :'none' }}>
      		                <p className='remove-pay-pop' onClick={()=>{ setP(null); setwP(false) }}>X</p>
      		                <input placeholder="الموقع" onChange={(e) => { setLoc(e.target.value) }}/>
      		                <button onClick={()=> addPayDate(P.t, P.d, P.i, P.pid)}>pay</button>
      		           </div>
      		       </>
      		       ))}
      		       
    
      		</div>
      		
    </div>
	</>
	)
}

