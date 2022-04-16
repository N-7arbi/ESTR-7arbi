import React , {useEffect,useState} from 'react'
import MakeTool from './Pages/makeTool'
import Dashbord from './Pages/dashbord'
import {auth, signInWithGoogle, logInWithEmailAndPassword ,registerWithEmailAndPassword , sendPasswordReset ,logout } from './firebase'
import { useAuthState } from "react-firebase-hooks/auth";
// <button className={!user ? 'signin' : 'signout'} onClick={() => !user ? signInWithGoogle() : logout() }>{!user ? 'signin': 'signout'}</button> 

var App;
export default App = ()=>{
  const [nav, setN] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [way, setw] = useState(1)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const [errorMsg , setRM] = useState('')
	
	const [page , setP] = useState(<Dashbord />)
	const register = () => {
		setRM('')
		setTimeout(()=> {
			if (!email || !name || !password) { setRM("يرجى ملئ كل الفرقات") } 
      else if (password.length < 6){ setRM('الباس اقل من ٦')}
      else {
        registerWithEmailAndPassword(name, email, password);
        setIsOpen(false)
        setRM('')
      }}, 500)
  }

  useEffect(() => { 

	}, []);


	return (
     <>
       <div className='nav'>
           <img  style={{left: nav == false ? '0' : '240px', transform:nav == false ? 'rotate(0deg)' : 'rotate(90deg)', }}  onClick={()=>setN(nav == false ? true: false)} className='bars-solid' src='/bars-solid.svg' />
           <h1 className='titel' >7arbi</h1>
           <div className='nav-side' style={{display:!nav && 'none'}} >
               <img className='user-img' src={ '/person-icon.png' } alt="user img " />
               <p className='user-email'>{user && user.email.substring(0, user.email.indexOf("@") <= 2 ? user.email.indexOf("@") :3 )+ '..' + user.email.substring(user.email.indexOf("@") , user.email.indexOf(".com") +4)}</p>
               <button className={!user ? 'signup' : 'signout'} onClick={() => !user ? setIsOpen(true) : logout() }>{!user ? 'sign up': 'signout'}</button> 
               
               <div style={{display: !isOpen && 'none'}} className="popup-box">
                  <p className='errorMsg' style={{display: errorMsg == '' ? 'none':'block'}}>{errorMsg}</p>
                  <div className="box">
                    <span className="close-icon" onClick={()=> {setIsOpen(false); setRM('')}}>x</span>
                    <button style={{fontWeight:way == 1 && "900"}} className='P-login' onClick={()=>{ setw(1); setRM('')}}>Log in</button>|
                    <button style={{fontWeight:way == 2 && "900"}} className='P-signup' onClick={()=> setw(2)}>sign up</button><br/><br/>
                   
                   
                    <div style={{display:way != 1 && "none"}} className="w-login">
                        <input type="text" className="login__textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"  />
                        <input type="password" className="login__textBox" value={password}  onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
                        <button className="login__btn"   onClick={() => { logInWithEmailAndPassword(email, password); setIsOpen(false)}} >Log in </button>
                    </div>
                    
                    
                    <div style={{display:way != 2 && "none"}} className="w-signup">
                        <input type="text" className="register__textBox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                        <input type="text" className="register__textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
                        <input type="password" className="register__textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button className="register__btn" onClick={register}> Register </button>
                    </div>
                    
                    
                    <div style={{display:way != 3 && "none"}} className='w-resetPassword'>
                        <input type="text" className="reset__textBox"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
                        <button className="reset__btn" onClick={() => sendPasswordReset(email)}>Send password reset email </button>
                    </div>
                    
                    <button onClick={()=>{ signInWithGoogle(); setRM(''); setIsOpen(false)}}>log in with google</button><br/>
                    <button onClick={()=>{ setw(3); setRM('')}}>forget Password</button>
                 </div>
               </div> 
               {user && <div>
                   <button className='b-page' onClick={()=>{ setP(<Dashbord />) }}>Dashbord</button><br/>
                   <button className='b-page'  onClick={()=>{ setP(<MakeTool user={user} />) }}>sell</button><br/>
               </div> 
               }
              
           </div>
       </div>
       <div className='default'>
             {page}
             <br /> <br /> <br /> <br /> <br />
        </div>
     </>
	)
}

