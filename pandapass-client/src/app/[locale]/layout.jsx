import { Inter } from 'next/font/google'
import MaterialProvider from '@/app/Provider/MaterialProvider.jsx'
import GlobalStateProvider from '@/app/context/store'
import '../globals.css'
import {notFound} from 'next/navigation';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] })

const locales = ['en', 'de'];

export const metadata = {
  title: 'PandaPass',
  description: 'PandaPass',
}


export default function RootLayout({ children ,params: {locale} }) {
  if (!locales.includes(locale)) notFound();
  
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <GlobalStateProvider>
          <MaterialProvider>
            <Navbar/>
            {children}
          </MaterialProvider>
        </GlobalStateProvider>
      </body>
    </html>
  )
}
