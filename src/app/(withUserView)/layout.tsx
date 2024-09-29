import { Navbar } from '@/src/components/navbar';
import { ReactNode } from 'react';

const layout = ({children}:{children:ReactNode}) => {
    return (
        <div>
            <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <span className="text-default-600">Powered by</span>
              <p className="text-primary">NextUI</p>
            </footer>
          </div>
        </div>
    );
};

export default layout;