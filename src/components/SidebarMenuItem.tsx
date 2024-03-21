'use client';


import Link from "next/link";
//funtional component para crear Items del Menu dinamicamente
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subTitle: string;
}



export const SidebarMenuItem = ({ path, icon, title, subTitle }: Props) => { //desestructuramos las props recibidas tipadas en la interfaz creada arriba

  //usamos el Hook usePathname para obtener que url esta activa y comparar con la que tenemos
    //activa en la aplicacion para darle un color que resalte
    //al usar un Hook debemos poner al inicio del archivo "use client" ya que el hook no trabaja del lado del servidor
  const currentPath = usePathname();

  return (
    <Link href={ path } 
          className={`
            w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150
            ${ currentPath === path ? 'bg-blue-800': '' }
          `}>
      <div>
       <div>
        {/* colocamos el icono */}
        { icon }
       </div>

      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{ title }</span>
        <span className="text-sm text-white/50 hidden md:block">{ subTitle }</span>
      </div>
    </Link>
  )
}
