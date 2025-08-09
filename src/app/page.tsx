"use client"

import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoriesResponse = {
  categories: Category[];
};


export default function Home() {
  const [categories, setCategories] = useState<CategoriesResponse | null>(null);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data: CategoriesResponse = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error)
      }
    };

    getCategories();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-5">
      {!categories && (
        <Loader  size={30} className="animate-spin m-auto mt-50"/>
      )}

      {categories?.categories.map((category) => (
        <Link href={`/category/${category.strCategory}`} key={category.idCategory}>
          <Card className="p-5 flex items-center h-[400px] overflow-y-auto bg-amber-50">
            <h2 className="text-3xl text-center font-bold ">{category.strCategory}</h2>
            <Image src={category.strCategoryThumb} width={200} height={200} alt={category.strCategory}/>
            <p className="text-neutral-700 text-center">{category.strCategoryDescription}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
