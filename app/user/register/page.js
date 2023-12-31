"use client"

import { useState } from "react"

const url = process.env.NEXT_PUBLIC_URL


const Register = () => {

  const [ newUser, setNewUser ] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit =  async (e) => {
    e.preventDefault()
    try{
      const responce = await fetch(`${url}/api/user/register`,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
      })
      const jsonData = await responce.json()
      console.log(newUser)
      alert(jsonData.message)
    }catch(err){
      alert("ユーザー登録失敗")
    }
  }

  return (
    <div>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={newUser.name} onChange={handleChange}  type="text" name="name" placeholder="名前" required/>
        <input value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required/>
        <input value={newUser.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required />
        <button>登録</button>
      </form>
    </div>
  )
}

export default Register