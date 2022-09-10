import Link from 'next/link';
import { ActiveLink } from '../ActiveLink';
import style from './header.module.sass';

export function Header() {
  return (
    <header className={style.container}>
      <div className={style.content}>
        <Link href="/">
          <img src="/logo.svg" alt="Blog Dev" />
        </Link>
        <nav>
          <ActiveLink href="/" activeClassName={style.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={style.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
