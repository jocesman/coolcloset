import {FC,  PropsWithChildren } from "react";
// import { inter } from '@/config/fonts'

const RootLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <html>  
            <body>
                {/* {children} */}
            </body>
        </html> 
    )
}   

export default RootLayout;