"use client";

import Image from "next/image";
import useAuth from "@/app/utils/useAuth";

const { useState, useEffect } = require("react");
const url = process.env.NEXT_PUBLIC_URL;

const DeleteItem = (context) => {
  // console.log(context)
  const [item, setItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUserEmail = useAuth();

  useEffect(() => {
    const getSingleItem = async (id) => {
      const response = await fetch(`${url}/api/item/readsingle/${id}`, {
        cache: "no-store",
      });
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      setItem({
        ...item,
        title: singleItem.title,
        price: singleItem.price,
        image: singleItem.image,
        description: singleItem.description,
      });
      setEmail(singleItem.email);
      setLoading(true);
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
        `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`,
        {
          method: "DELETE",
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
      alert("アイテム削除失敗");
    }
  };

  if (loading) {
    if (loginUserEmail === email) {
      return (
        <div>
          <h1 className="page-title">アイテム削除</h1>
          <form onSubmit={handleSubmit}>
            <h2>{item.title}</h2>
            <Image
              src={item.image}
              width={750}
              height={500}
              alt="item-image"
              priority
            />
            <h3>¥{item.price}</h3>
            <p>{item.description}</p>
            <button>削除</button>
          </form>
        </div>
      );
    } else {
      return <h1>権限がありません</h1>;
    }
  } else {
    <h1>Loading</h1>
  }
};

export default DeleteItem;
