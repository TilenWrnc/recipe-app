"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
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

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string,
    strCategory: string,
    strIngredient1: string | null,
    strIngredient2: string | null,
    strIngredient3: string | null,
    strIngredient4: string | null,
    strIngredient5: string | null,
    strIngredient6: string | null,
    strIngredient7: string | null,
    strIngredient8: string | null,
    strIngredient9: string | null,
    strIngredient10: string | null,
    strIngredient11: string | null,
    strIngredient12: string | null,
    strIngredient13: string | null,
    strIngredient14: string | null,
    strIngredient15: string | null,
    strIngredient16: string | null,
    strIngredient17: string | null,
    strIngredient18: string | null,
    strIngredient19: string | null,
    strIngredient20: string | null,
};

type MealResponse = {
  meals: Meal[];
};

const Meal = () => {
    const params = useParams();
    const mealId = params.mealId;

    const [meal, setMeal] = useState<MealResponse | null>(null);
    

    useEffect(() => {
            async function getMeal() {
              try {
                  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    
                   if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
    
                  const data : MealResponse = await response.json();
                  setMeal(data);
              } catch(error) {
                console.log(error);
              }
            }
        
            getMeal();
    }, [mealId]);

    const ingredients = [];

    for (let i = 1; i < 20; i++) {
        const key = `strIngredient${i}` as keyof Meal;
        const ingredient = meal?.meals[0][key];

        if (ingredient !== "" && ingredient !== null) {
            ingredients.push(ingredient);
        } else {
            continue
        };
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {!meal && (
                <Loader  size={20} className="animate-spin mt-50"/>
            )}

            {meal && (
                <div className="flex flex-col items-center">
                    <Breadcrumb className="my-6">
                        <BreadcrumbList className="md:text-2xl text-lg">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/category/${meal?.meals[0].strCategory}`}>
                                    {meal?.meals[0].strCategory}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                {meal?.meals[0].strMeal}
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h2 className="text-3xl font-bold mb-10">{meal?.meals[0].strMeal}</h2>
                    <div className="flex md:flex-row flex-col  gap-x-20">
                        <div className="max-w-md mx-auto min-w-[300px]">
                            <Image src={meal?.meals[0].strMealThumb} width={400} height={400} alt="meal image" layout="responsive"/>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h3 className="text-center text-2xl font-bold mb-5">Ingredients</h3>
                            {ingredients.map((ingredient, index) => (
                                <p key={`${ingredient}-${index}`} className="text-neutral-600">- {ingredient}</p>
                            ))}
                        </div>
                    </div>
                    <div className="max-w-[1000px] mb-20 md:mt-15  p-10">
                        <h2 className="text-3xl text-center font-bold mb-5">How to make</h2>
                        <p className="text-neutral-800 text-center md:text-base text-sm">{meal?.meals[0].strInstructions}</p>
                    </div>
                </div>
            )}

        </div>
    )
};

export default Meal;