import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {Wrapper,Title,Error,Form,Input,Switcher} from './auth-components'

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if(name === "email") { 
      setEmail(value)
    }else if( name === "password"){
      setPassword(value)
    } else {
    console.log(name,value,)
    }
  }
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, password)
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      //set Error
      if (e instanceof FirebaseError) {
        console.log(e);
        setError(e.message)
      }
      
      // setError()
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
        <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
        <Input onChange={onChange} type="submit" value={ isLoading?"loading...":"login"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Dont' have an account? <Link to ="/create-account">Create one &rarr;</Link>
      </Switcher>
      
    </Wrapper>
  );
}
