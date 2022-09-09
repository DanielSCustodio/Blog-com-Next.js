import { GetStaticProps } from 'next';
import Link from 'next/dist/client/link';
import SEO from '../../components/SEO';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import styles from './posts.module.sass';
import React from 'react';

interface Post {
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  updateAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const [count, setCount] = React.useState(6);
  const [messageAllPosts, setMessageAllPosts] = React.useState(false);

  let othersPosts = [];
  const copyPosts = [...posts];
  othersPosts = copyPosts;

  function handleLoadMore() {
    setCount(count + 3);
    if (posts.length <= count) {
      setMessageAllPosts(true);
    }
  }

  return (
    <>
      <SEO title="Posts" />
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <div className={styles.headerLeft}>
            <img src="rocket.svg" alt="" />
          </div>
          <div className={styles.headerRight}>
            <h1>
              Há conhecimento de dois tipos: <span>sabemos sobre</span> um
              assunto, ou sabemos onde <span>podemos buscar</span> informação
              sobre ele
            </h1>
            <p>
              Material selecionado com os assuntos mais relevantes para
              alavancar o seu conhecimento. <br /> O<span> Blog Dev</span> tem o
              prazer em te ajudar a ser um programdor melhor, absorva nosso
              conteúdo sem moderação.
            </p>
          </div>
        </section>
        <h2>Publicações</h2>
        <section className={styles.containerPosts}>
          <div className={styles.posts}>
            {posts
              .sort(function (a, b) {
                return a.updateAt > b.updateAt
                  ? -1
                  : a.updateAt > b.updateAt
                  ? 1
                  : 0;
              })
              .map(
                (post, index) =>
                  index < count && (
                    <Link href={`/posts/${post.slug}`} key={post.slug}>
                      <a className={styles.singlePost}>
                        <img src={post.image} alt={post.title} />
                        <div>
                          <time>{post.updateAt}</time>
                          <h3>
                            <strong>{post.title}</strong>
                          </h3>
                          <p>{post.excerpt.slice(0, 140)}...</p>
                        </div>
                      </a>
                    </Link>
                  ),
              )}
            <button onClick={handleLoadMore} disabled={messageAllPosts}>
              Ver Mais Posts
            </button>
            {messageAllPosts && <p>Todos os posts já foram carregados</p>}
          </div>

          <div className={styles.postsRecents}>
            <h3>Outras Publicações</h3>
            <aside>
              {othersPosts &&
                othersPosts
                  .sort(() => Math.random() - 0.4)
                  .map(
                    (post, index) =>
                      index < 5 && (
                        <Link href={`/posts/${post.slug}`} key={post.slug}>
                          <a className={styles.postsRecentsContent}>
                            <img src={post.image} alt={post.title} />
                            <div>
                              <h6>
                                <strong>{post.title}</strong>
                              </h6>
                              <p>{post.excerpt.slice(0, 65)}...</p>
                            </div>
                          </a>
                        </Link>
                      ),
                  )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content', 'post.image'],
    },
  );
  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      image: post.data.image.url,
      excerpt:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
      updateAt: new Date(post.last_publication_date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 12, //12horas
  };
};
