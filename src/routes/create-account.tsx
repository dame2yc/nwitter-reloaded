import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {Wrapper,Title,Error,Form,Input,Switcher} from './auth-components'
import GithubButton from "../components/github-btn";
export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if (name === "name") {
      setName(value);
    } else if(name === "email") { 
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
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      const creadentials = await createUserWithEmailAndPassword(auth, email, password)
      console.log(creadentials.user);
      await updateProfile(creadentials.user, { displayName: name });
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
        <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
        <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
        <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
        <Input onChange={onChange} type="submit" value={ isLoading?"loading...":"create account"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Dont' have an account? <Link to ="/login">login &rarr;</Link>
      </Switcher>
      <GithubButton/>
    </Wrapper>
  );
}
