// "use client"; no usamos use client ya que lo delegamos al componente CartCounter

import { CartCounter } from "@/shopping-cart";
import { Metadata } from "next";

//con mr usamos el snippet para crear las metadatas, el tipado
//Metadata lo hemos de colocar a mano, si usamos "use client" al usar
//por ejemplo un Hook no podemos usar los metadata
//lo que hemos echo es cortar todo lo referente al hook useCounter para hacer
//el contador y lo hemos copiado en el archivo creado CartCounter del directorio shopping-cart/components

export const metadata:Metadata = {
 title: 'Shopping Cart',
 description: 'Un simple contador',
};


export default function CounterPage() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
       {/* usamos el componete CartCounter que al usar el Hook useState se crea del lado del cliente
        podemos pasarle desde este archivo creado de parte del servidor(server component) un parametro
        al lado del cliente en este caso el 20 para el contador(CartCounter), desde este archivo podriamos acceder a
        la base de datos y enviarle al componente del lado del cliente, los componentes
        generados del lado del servidor(server components) solo se construyen una vez, cuando el componente se crea
        solo se renderiza esa vez en los server components podemos tener el fetch, conexiones a base de datos*/}
      <CartCounter value={ 20 } />
      
    </div>
  );
}