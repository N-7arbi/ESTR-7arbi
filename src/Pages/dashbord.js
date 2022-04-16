import React, {useEffect, useState} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { onSnapshot, collection, addDoc , setDoc, doc, deleteDoc} from "firebase/firestore"; 
import { db, auth } from "../firebase";

export default function Dashbord(props) {
	const [user, loading, error] = useAuthState(auth);
	const [selles, setSelles] = useState([{ name: "Loading...", id: "initial" }]);
	const [wpay, setwpay] = useState([{ name: "Loading...", id: "initial" }]);
	const [titel, setT] = useState("")
	const [des, setdes] = useState("")
	const [img, setimg] = useState("")
	
	
	const addDate= async ()=>{
  	const collectionRef = collection(db, "posts"); 
  	const payload = { 
  		tit:titel,
  		Description:des,
  	  imgLink:img,		
  		userid:	user.uid
  		}; 
  	await addDoc(collectionRef, payload);
  }
	const editDate = async (id)=>{
  	const docRef = doc(db, 'posts', id)
  	const payload_edit = {
  		tit:prompt("titel :"),
  		imgLink:prompt('imgLink :'),	
  		Description:prompt('Description :'),
  		userid:	user.uid
  	}
  	setDoc(docRef, payload_edit)
  }
  
  const deleteDate = async (id)=>{
  	const docRef = doc(db, 'posts', id)
  	await deleteDoc(docRef)
  }
  const deletePayDate = async (id)=>{
  	const docRef = doc(db, 'buy', id)
  	await deleteDoc(docRef)
  }
  
	 const getdate =() =>{
  	onSnapshot(collection(db, "posts"), (snapshot) =>{
  		setSelles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  	})
  }
   const getPaydate =() =>{
  	onSnapshot(collection(db, "buy"), (snapshot) =>{
  		setwpay(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  	})
  }
  useEffect(() => { 
      getdate()
      getPaydate()
	}, []);
	if (user) return(
	<>	
			<div>
				<input placeholder="titel" onChange={(e) => { setT(e.target.value) }}/> 
      		         <br/>
      		<textarea placeholder="des" onChange={(e) => { setdes(e.target.value) }}/>
      		         <br/>
      		<input placeholder="img link" onChange={(e) => { setimg(e.target.value) }}/>
      		         <br/>
      		<input placeholder="Paypal email (will not work)" />
      		         <br/>        
      		<button onClick={()=> addDate()}> Create New </button>
      		<br/><br/><br/><br/><br/><br/>
      		
      		
      		      {selles.map((selles) => ( 
      		          <div style={{display:selles.userid == user.uid ? null : 'none'}} className='selles2' key={selles.id}> 
      		             <img className='selles-img2' src={selles.imgLink ? selles.imgLink : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgockbw0WHFPeeOcoawCvlJEmTjYPLfZO4v15W4mTEm1wpSho&s'} />
      		             <p className='selles-tit2'>{selles.tit}</p> 
      		             <a className='selles-payUrl2' href={selles.payUrl}><button className='selles-payUrl2'>Pay</button></a>
      		             <button className='selles-edit2' onClick={()=> editDate(selles.id)} >edit</button>
      		             <img src='./trash-solid.svg' className='selles-delete2'onClick={()=> deleteDate(selles.id)} />
      		          </div> 
      		       ))} 
      		       <br />
      		       <h1 className='order'>order</h1>
      		       {wpay.map((wpay) => ( 
      		          <div style={{display:wpay.userid == user.uid ? null : 'none'}} className='selles2' key={wpay.id}> 
      		             <img className='selles-img2' src={wpay.imgLink ? selles.imgLink : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgockbw0WHFPeeOcoawCvlJEmTjYPLfZO4v15W4mTEm1wpSho&s'} />
      		             <p className='selles-tit2'>{wpay.tit}</p> 
      		             <p className='selles-buyer2'>buyer email : {wpay.buyer}</p> 
      		             <p className='selles-loc2'>buyer location :{wpay.loc}</p> 
      		             <a className='selles-payUrl2' href={wpay.payUrl}><button className='selles-payUrl2'>Pay</button></a>
      		             <img src='./check-solid.svg' className='selles-delete3'onClick={()=> deletePayDate(wpay.id)} />
      		          </div> 
      		       ))} 
    
      		</div>
	</>	
	)
}