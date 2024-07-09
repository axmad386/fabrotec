import axios from "axios";
import ListProduct from "modules/product/ListProduct";
import { use } from "react";

export default function Home() {
  async function getCategories() {
    const res = await axios.get<string[]>(
      "https://dummyjson.com/products/category-list",
    );
    return res.data;
  }
  const categories = use(getCategories());

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <div></div>
      <ListProduct categories={categories} />
    </div>
  );
}
