"use client"

import { useRouter } from "next/navigation"

const router = useRouter

const { useState } = require("react")

const url = process.env.NEXT_PIBLIC_URL

const Login = () => {
  const [ login, setLogin ] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const responce = await fetch(`${url}/api/user/login`,{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
      })
      const jsonData = await responce.json()
      // console.log(jsonData)
      localStorage.setItem("token",jsonData.token)
      alert(jsonData.message)
    }catch(err){
      alert("ログイン失敗")
    }
  }
  return (
    <div>
      <h1 className="page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={login.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required />
        <input value={login.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required />
        <button>LogIn</button>
      </form>
    </div>
  )
}

export default  Login