"use client"

import { useState } from "react"
import useAuth from "@/app/utils/useAuth"


const Create = () => {
  const [ item, setItem ] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  })

  const loginUserEmail = useAuth()
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const responce = await fetch("http://localhost:3000/api/item/create", {
        method: "POST",
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
      [e.target.name]:e.target.value
    })
  }

  if(loginUserEmail) {
    return( 
      <div>
      <h1>アイテム作成</h1>
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