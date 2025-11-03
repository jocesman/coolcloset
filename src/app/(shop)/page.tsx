import { inter, titleFont } from '@/config/fonts'

const Home = () => {
    return (
        <main >
            <h1 className={inter.className}>HOLA MUNDO</h1>
            <h1 className={titleFont.className}>HOLA MUNDO</h1>
            <h1 className={`${titleFont.className} font-bold`}>HOLA MUNDO</h1>
        </main>
    )
}

export default Home;