"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

import { Button } from "shared/components/ui/button";
import { Select } from "shared/components/ui/select";
import { useState } from "react";
import Link from "next/link";

export default function ListProduct({ categories }: { categories: string[] }) {
  const [category, setCategory] = useState("");
  const [priceSort, setPriceSort] = useState<"asc"|"desc"|undefined>();
  async function getProducts({ pageParam = 0 }) {
    const limit = 10;
    const skip = pageParam * limit;
    let url = "https://dummyjson.com/products";
    if(category){
      url = `https://dummyjson.com/products/category/${category}`
    }
    const { data } = await axios.get<{
      products: {
        id: number;
        title: string;
        description: string;
        price: number;
        thumbnail: string;
      }[];
      total: number;
      skip: number;
      limit: number;
    }>(url, {
      params: {
        sortBy: priceSort?"price":undefined,
        order: priceSort,
        limit,
        skip,
        select: "id,title,description,price,thumbnail",
      },
    });
    return data;
  }

  const { data, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["products", priceSort, category],
    queryFn: ({pageParam})=>getProducts({pageParam}),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.products.length < lastPage.total) {
        return allPages.length;
      }
      return undefined;
    },
  });
  const toggleSort = ()=>{
    if(!priceSort) return setPriceSort("asc");
    if(priceSort=="asc") return setPriceSort("desc");
    setPriceSort("asc")
  }
  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <div className="flex gap-4">
        <Select
          name="category"
          options={categories.map((c) => ({ value: c, label: c }))}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Filter Category"
        />
        <div>
        <Button 
            onClick={toggleSort}
            variant="outline" className="capitalize">Sort Price | {priceSort||"unsorted"}</Button>
        </div>
      </div>
      {data?.pages
        .flatMap((p) => p.products)
        .map((p) => (
          <div className="rounded p-2 border flex gap-4" key={p.id}>
            <Image src={p.thumbnail} width={200} height={200} alt={p.title} />
            <Link href={`/product/${p.id}`}>
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-xl">{p.title}</h2>
                <p>{p.description}</p>
                <p>${p.price}</p>
              </div>
            </Link>
          </div>
        ))}
      <Button onClick={() => fetchNextPage()}>Fetch next page</Button>
    </div>
  );
}
