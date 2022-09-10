import style from './footer.module.sass';

export function Footer() {
  return (
    <footer className={style.footer}>
      <section className={style.container}>
        <div>
          <h4>Desenvolvido por Daniel Custódio</h4>
        </div>
        <section className={style.content}>
          <div>
            <p>Copyright © 2022 - Todos os direitos reservados por Blog Dev</p>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/danielscustodio/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="linkedin.svg" alt="linkedin" />
            </a>
            <a
              href="https://github.com/DanielSCustodio"
              target="_blank"
              rel="noreferrer"
            >
              <img src="github.svg" alt="github" />
            </a>
          </div>
        </section>
      </section>
    </footer>
  );
}
