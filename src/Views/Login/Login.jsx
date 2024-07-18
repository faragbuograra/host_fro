import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../app/Selice/authSelice'
import { setCredentials } from '../../features/user'
import { useDispatch } from 'react-redux'
import { SwapCalls } from '@mui/icons-material'
import { swal } from '../../components/swal'

const Login = () => {
  const [username, setusername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [login,{isloading}] = useLoginMutation()
  const usernameref = React.useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {

    e.preventDefault()
    
      const userData = await login({username,password}).then((res)=>{

        dispatch(setCredentials({...res,username,}))

        swal('success','Login Successfully','success')
        console.log(res)
      if(res.data.role === 'admin'){
        window.open('/#','_blank')
      }else if(res.data.role === 'patient'){
        window.open('/#patient','_blank')
      }
     
      }).catch((err)=>{ 
       
        if(err.status === 401){
          swal('error','Invalid Credentials','error')
          setError('Invalid Credentials')}
        else if(err.status === 400){
          swal(
            `error`
            ,err.data.message
            ,'error'
          )
          setError('Please fill all the fields')}
        else if (err.status === 500) {
          swal('error','Server Error','error')
          setError('Server Error')
        }else if(err.status === 404){
          swal('error','User Not Found','error')
          setError('User Not Found')
        }})
      
    
    
   
  }    
  return (
    <>
    <body id="particles-js"></body>
    <div className="animated bounceInDown">
    <div className="container">
    
      <form name="form1" className="box" onSubmit={handleSubmit}>
{isloading ? <h1>Loading...</h1> : null}
        <h1>
تسجيل الدحول
        </h1>
          <input type="text"  
                    id="username1"
                    ref={usernameref}
                    value={username}
                    placeholder='رقم الموظف'
                    onChange={(e)=>setusername(e.target.value)}
                    autoComplete="off"
                    required/>
          <i id="eye"></i>
          <input type="password"  
                    id="password"
                    placeholder='كلمة المرور'
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required/>
            
          <input type="submit"  className="btn1" name="login"  placeholder='تسجيل دخول'/> 
        </form>
           <a href="#" className="dnthave"></a>
    </div> 
         <div className="footer">
    
      </div>
  </div>
 
    </>
  

  )
}

export default Login;
