import {FC,  PropsWithChildren } from "react";
import { roboto } from './ui/fonts'
import "@/app/ui/globals.css"

const RootLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <html>
            <body className={`${roboto.className} antialiased`}>
                {children}
            </body>
        </html> 
    )
}   

export default RootLayout;