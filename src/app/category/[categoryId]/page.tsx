"use client";

import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SlashIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Meals = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type CategoriesItemsResponse = {
  meals: Meals[];
};

const ItemsBasedOnCategory = () => {
    const params = useParams();
    const categoryId = params.categoryId;

    const [itemsBasedOnCategory, setItemsBasedOnCategory] = useState<CategoriesItemsResponse | null>(null);
    

    useEffect(() => {
        async function getItemsBasedOnCategory() {
          try {
              const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`);

               if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

              const data : CategoriesItemsResponse = await response.json();
              setItemsBasedOnCategory(data);
          } catch(error) {
            console.log(error);
          }
        }
    
        getItemsBasedOnCategory();
    }, [categoryId]);
    
    return (
        <div>
            <div className="flex justify-center">
                <Breadcrumb className="my-6">
                    <BreadcrumbList className="text-2xl">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            {categoryId}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-5">

                {!itemsBasedOnCategory && (
                    <Loader  size={30} className="animate-spin m-auto"/>
                )}

            {itemsBasedOnCategory?.meals.map((meal) => (
                <Link href={`/meal/${meal.idMeal}`} key={meal.idMeal}>
                    <Card className="p-2 flex items-center justify-center h-[400px] bg-amber-50">
                        <h2 className="text-3xl text-center font-bold ">{meal.strMeal}</h2>
                        <Image src={meal.strMealThumb} width={200} height={200} alt={meal.strMeal}/>
                    </Card>
                </Link>
            ))}
        </div>
    </div>

    )
};

export default ItemsBasedOnCategory;