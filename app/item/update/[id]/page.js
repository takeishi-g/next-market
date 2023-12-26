"use client"

const { useState, useEffect } = require("react")

const UpdataItem = (context) => {
  // console.log(context)
  const [ item, setItem ] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  })

  const [ email, setEmail ] = useState("")

  useEffect(() => {
    const getSingleItem = async(id) => {
      const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`,{cache: "no-store"})
      const jsonData = await response.json()
      const singleItem = jsonData.singleItem
      setItem({
        ...item, 
        title: singleItem.title,
        price: singleItem.price,
        image: singleItem.image,
        description: singleItem.description
      })
      setEmail(singleItem.email)
    }
    getSingleItem(context.params.id)
  },[context])

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await fetch(`http://localhost:3000/api/item/update/${context.params.id}`,{
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(item,email),
      })
      const jsonData = await response.json()
      alert(jsonData.message)
    } catch(err) {
      alert("アイテム編集失敗")
    }
  }

  return (
    <div>
      <h1>アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input value={item.title} onChange={handleChange} type="text" name="title" praceholder="アイテム名" required/>
        <input value={item.price} onChange={handleChange} type="text" name="price" praceholder="価格" required/>
        <input value={item.image} onChange={handleChange} type="text" name="image" praceholder="画像" required/>
        <textarea value={item.description} onChange={handleChange} name="description" rows="15" placeholder="商品説明" required></textarea>
        <button>編集</button>
      </form>
    </div>
  )
}

export default UpdataItem