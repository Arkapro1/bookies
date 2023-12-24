import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Footer from '@/components/footer/footer';
import Nav from '@/components/nav/nav';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bookies Ai',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) { 
  return (
    <html>
      <body className={inter.className}>
        <AuthProvider>
        <Nav/>
        <div className='w-full min-h-screen mx-auto p-4'>
        {children}
        </div>
        <Footer/>
        </AuthProvider>
        </body> 
    </html>
  )
}
