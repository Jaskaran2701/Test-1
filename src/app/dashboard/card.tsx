type CardProps={
    value:number,
    label:string
}

export default function Card({value,label}:CardProps){
    return(
    <div className="bg-white w-32 h-32 xl:w-52 xl:h-52 rounded-3xl flex flex-col justify-center items-center gap-4 hover:cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-110 transition ease-in-out delay-150">
        <div className="text-6xl xl:text-8xl">{value}</div>
        <div className="text-xs xl:text-sm capitalize">{label}</div>
      </div>
    )
}