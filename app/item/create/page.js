"use client"

import { useState } from "react"
import useAuth from "@/app/utils/useAuth"

const url = process.env.NEXT_PUBLIC_URL


const Create = () => {
  const [ item, setItem ] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    email: "",
  })

  const loginUserEmail = useAuth()
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const responce = await fetch(`${url}/api/item/create`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(item, {email:loginUserEmail})
      })
      const jsonData = await responce.json()
      alert(jsonData.message)
    }catch(err) {
      alert("アイテム作成失敗")
    }
  }

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]:e.target.value,
      email: loginUserEmail,
    })
  }

  if(loginUserEmail) {
    return( 
      <div>
        {console.log(loginUserEmail)}
      <h1 className="page-title">アイテム作成</h1>
      <form onSubmit={handleSubmit}>
        <input value={item.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required/>
        <input value={item.price} onChange={handleChange} type="text" name="price" placeholder="価格" required/>
        <input value={item.image} onChange={handleChange} type="text" name="image" placeholder="画像" required/>
        <textarea value={item.description} onChange={handleChange} type="text" name="description" placeholder="商品説明" rows={15} required></textarea>
        <button>作成</button>
      </form>
    </div>
  )
}
}

export default Create