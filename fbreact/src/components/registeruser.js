import React, { useState } from 'react'
 import Col from 'react-bootstrap/Col';
 import Form from 'react-bootstrap/Form';
 import Row from 'react-bootstrap/Row';
import './registeruser.css';


function Registeruser() {
const [formdata,setFormdata]=useState({
  username:'',
  email:'',
  password:'',
  Repassword:'',
})

const[username,setUsername]=useState(' ')
const[email,setEmail]=useState(' ')
const[password,setPassword]=useState(' ')
const[Repassword,setRepassword]=useState(' ')
    let isValid=true;
    const validate =(e)=>{
       e.preventDefault()
      if(username===''){
        isValid=false;
      }
     let emailvalidation=email.includes('@')
      if(email===''  ){
        isValid=false
      }
      if(!emailvalidation){
        isValid=false
      }
      if(isValid){
        console.log('Form submitted')

      }
      else{
        console.log('Something went wrong')
      }
    }
    // let mytext = "i love react"
    // let regExp= /react/
    // let passwordregEx=/^[a-z][A-Z] [@.=*%$]$/
    // let pasw='abc@123'
    // console.log(pasw.match(passwordregEx))
    // console.log(mytext.match(regExp))

    const handleBlur=(e)=> {
     if(formdata.username.length < 3){
      let usernameinput=document.getElementById('usernameinput')
      usernameinput.classList.add('is-invalid')
      let messagediv=document.getElementById('validationServerUser')
      messagediv.style.display='block'
     }
      e.preventDefault()
      console.log('field blured')
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log(formdata)
    }
    return (
   <div>
    <h1> Registeration Form</h1> <br/>
    <Form id='registrationForm' onSubmit={handleSubmit}>
{/* <Form id='registrationForm' onSubmit={(e)=>validate(e)}> */}

       

        <Form.Group as={Row} className="mb-3" controlId="username">
        <Form.Label column sm="2">
          User Name
        </Form.Label>


        <Col sm="10">
         <Form.Control type="text" id='usernameinput' className='is-invalid' placeholder="username" onChange={(e)=>{setFormdata({...formdata,[e.target.id]:e.target.value});}}  onBlur={handleBlur}/>
          {/* <Form.Control type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} /> */}
        </Col>
        <div id="validationServerUser" class="invalid-feedback">Please choose a username</div>
      </Form.Group>
       
      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        
        <Col sm="10">
         <Form.Control type="email" placeholder="Enter e-mail id" onChange={(e)=>{setFormdata({...formdata,[e.target.id]:e.target.value});}}/>
          {/* <Form.Control type="email" placeholder="Enter e-mail id" onChange={(e)=>setEmail(e.target.value)}/> */}
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="password">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
        <Form.Control type="password" placeholder="password"  onChange={(e)=>{setFormdata({...formdata,[e.target.id]:e.target.value});}}/>
          {/* <Form.Control type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/> */}
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-3" controlId="password">
        <Form.Label column sm="2">
          Re-enter Password
        </Form.Label>
      <Col sm="10">
       <Form.Control type="re-enter password" placeholder="re-enter Password" onChange={(e)=>{setFormdata({...formdata,[e.target.id]:e.target.value});}}/>
          {/* // <Form.Control type="re-enter password" placeholder="re-enter Password" onChange={(e)=>setRepassword(e.target.value)} /> */}
        </Col> 
   </Form.Group>
      <Col sm="10">
          <Form.Control type="submit" placeholder="submit" />
        </Col>
    
    </Form> 
    {/* <div>
      username : {username} <br/>
      email : {email} <br/> 
      password : {password} <br/>
      repassword : {Repassword}
    </div> */}
    </div>
       
    )
}


export default Registeruser



