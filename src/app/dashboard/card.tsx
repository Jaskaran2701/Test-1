type CardProps={
    value:number,
    label:string
}

export default function Card({value,label}:CardProps){
    return(
    <div className="bg-white w-52 h-52 rounded-3xl flex flex-col justify-center items-center gap-4 hover:cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-110 transition ease-in-out delay-150">
        <div className="text-8xl">{value}</div>
        <div className="capitalize">{label}</div>
      </div>
    )
}