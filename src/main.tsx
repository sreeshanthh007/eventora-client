
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import {store} from "./store/store.ts"
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </Provider>
)
