import {queryMe} from "@/graphql/queryMe";
import "@/styles/globals.css";
import {UserType} from "@/types";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import type {AppProps} from "next/app";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useEffect} from "react";

const link = createHttpLink({
  uri: "http://localhost:5555",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const publicPages = ["/", "/signin", "/signup", "/ads/[id]"];

function Auth(props: {children: React.ReactNode}) {
  const {data, loading} = useQuery<{item: UserType | null}>(queryMe);
  const router = useRouter();

  useEffect(() => {
    console.log("Navigating, new path =>", router.pathname);
    if (publicPages.includes(router.pathname) === false) {
      console.log("Seems to be a private page");
      if (!data?.item) {
        console.log("Not connected, redirecting");
        router.replace("/signin");
      }
    }
  }, [router, data]);

  if (loading) {
    return <p>Chargement</p>;
  }
  if (publicPages.includes(router.pathname) === false && !data?.item) {
    return <p>Redirection</p>;
  }
  return props.children;
}

function App({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), {ssr: false});
