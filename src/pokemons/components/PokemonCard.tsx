//snippet rafc para crear el componente
//el card lo copiamos de tailwind --> https://tailwindcomponents.com/component/user-card-7

import Link from "next/link";
import Image from "next/image";
import { SimplePokemon } from "../interfaces/simple-pokemon";
import { IoHeartOutline } from "react-icons/io5";

interface Props {
  pokemon: SimplePokemon;
}

//hay que adecuarlo, cambiar className por classNamename usando shuft+command+p -> replace
//importamos Link de next/link, cambiamos las url de los links, no podemos tener etiquetas a dentro del Link
//lo que hacemos es cortar el className de la etiqueta a y ponerla en el componente Link y borrar las etiquetas a
//el button lo cambiamos por una etiqueta a
export const PokemonCard = ({ pokemon }: Props) => {

  const { id, name } = pokemon;


  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          {/* colocamos la imagen del Pokemos usando Image de Next, importada arriba
                      ver informacion para imagenes --> https://nextjs.org/docs/app/api-reference/components/image#priority
           */}
          <Image
            key={pokemon.id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            width={100}
            height={100}
            alt={pokemon.name}
            //si ponemos priority en false, lo que hacemos es que si la pagina como en este ejemplo tiene 151 pokemons y hay que hacer scroll
            //para visualizarlos todos, si esta en true los carga todos de golpe aunque el usuario no haga el scroll, con false solo carga lo que ve en ese momento
            //lo carga bajo demanda
            priority={false}
          />


          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{name}</p>
          <div className="mt-5">
            <Link
              href={`dashboard/pokemons/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Más información
            </Link>
          </div>
        </div>
        <div className="border-b">
          <Link href="/dashboard/main" className="px-4 py-2 hover:bg-gray-100 flex items-center">

            <div className="text-red-600">
              <IoHeartOutline />
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                No es favorito
              </p>
              <p className="text-xs text-gray-500">View your campaigns</p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  )
}
