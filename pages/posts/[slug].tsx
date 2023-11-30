import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/layout';
import Container from '../../components/container';
import Single from '../../components/single';
import More from '../../components/more';
import { SITE_NAME } from '../../lib/constants';



export default function Post({ post }) {
    const router = useRouter()
    console.log(post);
    return (
        <Layout preview={true}>
      <Container>
        {router.isFallback ? (
          <h2>Loading…</h2>
        ) : (
          <>
            <div dangerouslySetInnerHTML={{__html: post[0].content.rendered}} />
          </>
        )}
      </Container>
    </Layout>
      )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;
    const variableName = await fetch(`https://gun.todsorb.dev/wp-json/wp/v2/posts?_embed&slug=${slug}`);
    const post = await variableName.json();
    return {
      props: { post },
      revalidate: 10,
    };
  };


export const getStaticPaths = async () => {
    const variableName = await fetch('https://gun.todsorb.dev/wp-json/wp/v2/posts?_embed&order=desc&per_page=100&status=publish')
    const allPosts = await variableName.json()
    const paths = allPosts.map((item) => {
         return {
              params : {
                slug : item.slug
              }
         }
   })
    return {
      paths,
      fallback: false,
    };
  };