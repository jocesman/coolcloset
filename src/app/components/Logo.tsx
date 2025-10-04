import { FaReact } from "react-icons/fa";
import { sansNarrow } from '../ui/fonts';

const Logo = () => {
    return(
        <div className={`${sansNarrow.className} flex flex-row items-center leading-none text-white`}>
            <FaReact className="h-20 w-20 rotate-[15deg]" />
            <p className="text-[30px] ml-3">CESPEDESDEV</p>
        </div>
    )
}

export default Logo;