import Image from "next/image"

export const NavBar = () => {
    return (
        <div className="text-center pt-5 shadow-2xl bg-amber-50">
          <div className="flex justify-center items-center mb-7 gap-x-10">
            <Image src="/logo.svg" alt="logo" width={100} height={100}/>
            <h1 className="md:text-7xl text-5xl font-bold">Recipe IO</h1> 
          </div>
          <p className="pb-5 text-neutral-600">Most delicious recipes all in one place!</p>
        </div>
    )
};