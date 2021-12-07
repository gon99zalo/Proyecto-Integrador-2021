import { useHistory } from "react-router";
import Footer from "./Footer";
import Header from "./Header";


export default function ReservaUsuario(){
    
    const history = useHistory();

    if(sessionStorage.getItem("infoUsuario")== null){
        history.push("/")
    }
    
    return(
        <>
        <Header reservas={true}/>
        <Footer />
        </>
    )
}