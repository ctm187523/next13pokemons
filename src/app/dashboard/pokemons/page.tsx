import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/pokemons";


//creamos la metadata con el snippet mr
export const metadata = {
 title: '151 Pokemons',
 description: 'SEO Title',
};


//hacemos la peticion http a la pagina de pokemons -> https://pokeapi.co/
//usamos la interfaz creada SimplePokemon para tipar lo que va a devolver el metodo getPokemons
const getPokemons = async( limit = 20, offset= 0 ):Promise<SimplePokemon[]> => {
  //tipamos usando la interfaz PokemonsResponse la respuesta obtenida de la peticion http
  const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${ offset }`)
    .then( res => res.json() );

    //tenemos una respuesta de tipo PokemonsResponse de esta respuesta queremos devolver(ver en postman lo que devulve)
  //los results, usamos un map para iterar cada uno de los results obtenidos que seran de tipo SimplePokemon que es lo que queremos devolver
    const pokemons = data.results.map( pokemon => ({
      //el id lo obtenemos de la url de cada uno de los objetos pokemon -> https://pokeapi.co/api/v2/pokemon/1/
      //usamos split para que corte con / y seleccionamos la penultima posicion que es el id que usaremos para cada uno de los pokemons
      id: pokemon.url.split('/').at(-2)!,
      name: pokemon.name,
    }));

    // throw new Error('Esto es un error que no debería de suceder');
    // throw notFound();

    return pokemons;
}



//lo creamos con el snippet pcr
//se exporta por default al ser el page.tsx 
export default async function PokemonsPage() {

  //usamos la funcion creada arriba
  const pokemons = await getPokemons(151);
  
  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">Listado de Pokémons <small>estático</small></span>
      
      <PokemonGrid pokemons={ pokemons } />
      {/* { JSON.stringify(pokemons)} */}
    </div>
  );
}