import { Pokemon } from "@/pokemons";
import { Metadata } from "next";
import Image from 'next/image';
import { notFound } from "next/navigation";

//interface para tipar los params que es lo que recibimos a traves de la url
//ej: localhost:3000/dashboard/pokemon/4?q=char&age=33&gender=female
//los params seria el id(4), y los searchParams o conocidos tambien como queryparameters
//seria el q:'char', age:'33', gender:'female'
//en las Props vienen los params, en este caso el id,todos los params viene como String
interface Props {
  params: { id: string };
}


//funcion para generar las paginas de forma estatica, las crea en build de antemano
//usamos el snipet gsp para crear los parametors de forma estatica
//Esto solo se ejecuta en build time, no en dev time cuando usemos npm run build
//de inicio la peticion es de 151 pokemones pero si se solicitan mas pokemones se crearan de forma estatica
export async function generateStaticParams(){

  //creamos una constante que sera un array vacio con 151 elementos donde devuelve el indice del array + 1 para saltar el cero
  //y la usamos para que en la linea siguiente devuelva todos los id como string de los pokemons recorriendo con el map el array vacio creado
  //CUANDO USEMOS npm run build SE CREAN LAS 151 PAGINAS DE FORMA ESTATICA
  //una vez usado el build mirar en next/server/app/dashboard/pokemon y se veran las 151 paginas staticas creadas pero si se hacen peticiones mas 
  //alla del pokemon 151 se creara de forma dinamica
  const static151Pokemons = Array.from({ length: 151}).map( (v, i) => `${i + 1 }` ); //la v no la usamos es el valor, usamos el segundo parametro i que es el indice
  
  //a cada valor almacenado ahora en el array que son los numeros de 1 a 151, le damos el nombre de id en los arguementos de la funcion de flecha
  // y le creamos un objeto que es id:id seria id:1 id:2 etc
  return static151Pokemons.map( id => ({
    id: id
  }));
  
  //COMENTAMOS SERIA LO DE ARRIBA PARA 6 IDS DE POKEMONS DE FORMA MANUAL SIN USAR EL ARRAY.MAP
  // return [
  //   { id: '1' },
  //   { id: '2' },
  //   { id: '3' },
  //   { id: '4' },
  //   { id: '5' },
  //   { id: '6' },
  // ]
}




//ESTABLECEMOS LA METADATA DE FORMA DINAMICA ver video 58
//si ponemos params como argumento recibimos los params de la url, ver arriba
//establecemos la metadata de forma dinamica, para ello usamos la funcion de modo export async function
//que devuelve una Promesa que resuleve la Metadata
export async function generateMetadata({ params }:Props): Promise<Metadata> {

  //devolvemos un objeto con todo lo que queramos poner en la metadata
  //llamamos a la funcion creada abajo getPokemos para obtener la data del Pokemon
  try {
    const { id, name } = await getPokemon(params.id);
    
    //devolvemos el objeto que devolvera la metadata de forma dinamica
    return {
      title: `#${ id } - ${ name }`,
      description: `Página del pokémon ${ name }`
    }
    
  } catch (error) {
    return {
      title: 'Página del pokémon',
      description: 'Culpa cupidatat ipsum magna reprehenderit ex tempor sint ad minim reprehenderit consequat sit.'
    }
  }
}

//funcion para hacer la peticiom http, recibe el id y regresa una Promesa de tipo Pokemon
const getPokemon = async(id: string): Promise<Pokemon> => {

  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`,{
    //por defecto Next,mantiene en cache la peticion, podemos usar por default,force-cache,no-cache,no-store(cada vez que se vuelver a esta 
    //pagina se vuelve a hacer la solicitud), only-if-cached,reload
    //cache: 'force-cache',// TODO: cambiar esto en un futuro
      //revalidariamos cada 6 meses
       next: {
        revalidate: 60 * 60 * 30 * 6
       }
    }).then( resp => resp.json() );
  
    console.log('Se cargó: ', pokemon.name);
  
    return pokemon;
    
  } catch (error) {
    notFound();
  }

}



//copiado de tailwind --> https://tailwindcomponents.com/component/profile-information-card-horizon-ui-tailwind
//en el fichero next.config.js colocamos --> 'raw.githubusercontent.com'
//para configurar imagenes de otros dominios ver video 59
export default async function PokemonPage({ params }: Props) {

  const pokemon = await getPokemon(params.id);


  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />


            <div className="flex flex-wrap">
              {
                pokemon.moves.map(move => (
                  <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {
                pokemon.types.map(type => (
                  <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {
                pokemon.weight
              }
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}