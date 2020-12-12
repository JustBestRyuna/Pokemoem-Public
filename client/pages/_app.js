import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import wrapper from '../redux/store'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default wrapper.withRedux(MyApp);