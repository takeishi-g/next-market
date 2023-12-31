
import Image from "next/image";
import Link from "next/link";

const url = process.env.NEXT_PUBLIC_URL

const getSingleItem = async (id) => {
  const response = await fetch(
    `${url}/api/item/readsingle/${id}`,
    { cache: "no-store" }
  );
  const jsonData = await response.json();
  const sigleItem = jsonData.singleItem;
  return sigleItem;
};

const ReadSingleItem = async (context) => {

  const singleItem = await getSingleItem(context.params.id);
    return (
    <div className="grid-container-si">
      <Image src={singleItem.image} width={750} height={500} alt="item-image" priority />
      <h1>{singleItem.title}</h1>
      <h2>{singleItem.price}</h2>
      <p>{singleItem.description}</p>
     
          <div>
          <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
          </div>
    
    <p></p>
    </div>
  );
};

export default ReadSingleItem;
