import { addDoc, collection,updateDoc } from "firebase/firestore";
import React, { useState } from "react"
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const Form = styled.form`
  display:flex;
  flex-direction:column;
  gap:10px;
`
const Textarea = styled.textarea`
  border:2px solid white;
  padding:20px;
  border-radius:20px;
  font-size:16px;
  color:white;
  background-color:black;
  width:100%;
  resize:none;
  &::placeholder{
    font-size:16px;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  &:focus{
    outline:none;
    border-color: #1d9bf0;
  }
`
const AttachFileButton=styled.label`
  padding:10px 0px;
  color :#1d9bf0;
  text-align:center;
  border-radius:30px;
  border:1px solid #1d9bf0;
  font-size:14px;
  font-weight:600;
  cursor:pointer;
`
const AttachFileInput = styled.input`
  display:none
`
const SubmitBtn = styled.button`
background-color:#1d9bf0;
color:white;
border:none;
padding:10px 0px;
border-radius:20px;
font-size:16px;
cursor: pointer;
&:hover,
&:active{
  opacity:0.9;
}
  
`
export default function PostTweetForm() {
  const [file, setFile] = useState<File | null>(null);
  const [tweet, setTweet] = useState("");
  const [isLoading,setLoading]=useState(false)
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0])
    }
  }
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user ||isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      // await addDoc(collection(db, 'tweets'), {
        const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username:user.displayName||"Anonymous",
        userId:user.uid
        })
        if (file) {
          const locationRef = ref(
            storage,
            `tweets/${user.uid}-${user.displayName}/${doc.id}`
          );
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);
          await updateDoc(doc, {
            photo: url,
          });
        }
        setTweet("");
        setFile(null);
      alert('전송 완료했습니다.')
    } catch (error) {
    console.log(' error', error)
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Textarea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?!"
      />
      <AttachFileButton htmlFor="file">
        {file? "photo added!!!":"add photo"}
      </AttachFileButton>
      <AttachFileInput
        id="file"
        accept="image/*"
        type="file"
        onChange={onFileChange}
      ></AttachFileInput>
      <SubmitBtn type="submit" value="post tweets">Post Tweet!</SubmitBtn> 
    </Form>
  )
}
