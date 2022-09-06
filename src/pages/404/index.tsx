import style from './style.module.sass';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className={style.container}>
      <h1>
        <span>404</span> - Página não encontrada
      </h1>
      <Link href="/">
        <a>↩ Voltar</a>
      </Link>
    </section>
  );
}
