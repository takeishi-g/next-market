import Image from "next/image";

const getSingleItem = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/item/readsingle/${id}`,
    { cache: "no-store" }
  );
  const jsonData = await response.json();
  const sigleItem = jsonData.singleItem;
  return sigleItem;
};

const ReadSingleItem = async (context) => {
  const singleItem = await getSingleItem(context.params.id);
  console.log(singleItem);
  return (
    <div>
      <Image src={singleItem.image} width={750} height={500} priority/>
      <h1>{singleItem.title}</h1>
      <h2>{singleItem.price}</h2>
      <p>{singleItem.description}</p>
    </div>
  );
};

export default ReadSingleItem;
