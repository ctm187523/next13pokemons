import { redirect } from 'next/navigation';

export default function HomePage() {

  //al entrar en la ruta principal(este archivo) nos redirige automaticamente
  //a la ruta /dashboard/main
  redirect('/dashboard/main');

}
