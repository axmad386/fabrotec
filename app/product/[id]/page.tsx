import axios from "axios";
import Image from "next/image";
import { use } from "react";
import { Badge } from "shared/components/ui/badge";
import { Card, CardContent } from "shared/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "shared/components/ui/carousel";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
}
export default function Product({ params }: { params: { id: number } }) {
  async function getProduct() {
    const { data } = await axios.get<Product>(
      `https://dummyjson.com/products/${params.id}`,
    );
    return data;
  }
  const product = use(getProduct());
  return (
    <div className="flex flex-col max-w-lg mx-auto gap-6">
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <Image
                    src={image}
                    title="product image"
                    alt="product image"
                    width={300}
                    height={300}
                  />
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div>
      <Badge variant={product.stock>0?"secondary":"destructive"}>{product.stock>0?"Available":"Out of Stock"}</Badge>
      </div>
      <h1 className="text-3xl">{product.title} 
      </h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}
