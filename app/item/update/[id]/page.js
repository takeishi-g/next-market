"use client";
const { useState, useEffect } = require("react");
import useAuth from "@/app/utils/useAuth";

const url = process.env.NEXT_PUBLIC_URL

const UpdataItem = (context) => {
  // console.log(context)
  const loginUserEmail = useAuth();
  const [item, setItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    email: "",
  });

  const [email, setEmail] = useState("");


  useEffect(() => {
    const getSingleItem = async (id) => {
      const response = await fetch(
        `${url}/api/item/readsingle/${id}`,
        { cache: "no-store" }
      );
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      setItem({
        ...item,
        title: singleItem.title,
        price: singleItem.price,
        image: singleItem.image,
        description: singleItem.description,
        email: singleItem.email
      });
      setEmail(singleItem.email);
      console.log(item)
    };
    getSingleItem(context.params.id);
  }, [context]);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${url}/api/item/update/${context.params.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(item),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (err) {
      alert("アイテム編集失敗");
    }
  };

  if (loginUserEmail === email) {
    return (
      <div>
        <h1 className="page-title">アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input value={item.title} onChange={handleChange} type="text" name="title" praceholder="アイテム名" required />
          <input value={item.price} onChange={handleChange} type="text" name="price" praceholder="価格" required />
          <input value={item.image} onChange={handleChange} type="text" name="image" praceholder="画像" required />
          <textarea value={item.description} onChange={handleChange} name="description" rows="15" placeholder="商品説明" required ></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>
  }
};

export default UpdataItem;
