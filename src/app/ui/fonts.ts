import { PT_Sans_Narrow, Roboto } from 'next/font/google';

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '400', '700']
});

export const sansNarrow = PT_Sans_Narrow ({
    subsets: ['latin'],
    weight: ['400', '700']
})

