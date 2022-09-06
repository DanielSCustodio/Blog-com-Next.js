import React from 'react';
import styles from '../styles/home.module.sass';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO title="Blog Dev" excludeTitleSuffix />
      <main className={styles.content}>
        <section className={styles.section}>
          <span>Olá, você! 👋</span>
          <h1>
            O seu aprendizado passa por aqui.
            <br />
            <span>Blog</span>Dev!
          </h1>
          <p>
            Tudo sobre o mundo do desenvolvimento <br />
            com o <span>melhor</span> conteúdo.
          </p>
        </section>
        <aside>
          <img src="/home.svg" alt="Home imagem" />
        </aside>
      </main>
    </>
  );
}
