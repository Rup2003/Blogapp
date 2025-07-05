
const items =[
    {id:1, name:"Help"},
    {id:2, name:"Status"},
    {id:3, name:"About"},
    {id:4, name:"Press"},
    {id:5, name:"Blog"},
    {id:6, name:"Privace"},
    {id:7, name:"Rules"},
    {id:8, name:"Terms"},
];

export const Footer = () => {
  return (
    <div className='absolute bottom-0 left-0 w-full  py-4'>
        <div className=" flex items-center justify-center h-full w-full gap-10">
        {items.map((item)=>(
          <span
          key={item.id}
          className="text-sm font-semibold hover:underline cursor-pointer"
          >
            {item.name}
          </span>
        ))}
        </div>
    </div>
  )
}
