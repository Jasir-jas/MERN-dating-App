import { createContext, useState } from "react";

const ModalContext=createContext()
const ModalProvider=({children})=>{

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageName, setPageName] = useState("Page name");
    

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handlePageNameChange = (name) => {
        setPageName(name);
        setIsModalOpen(false);
    };
    return( 
    <ModalContext.Provider value={{isModalOpen,setIsModalOpen,pageName,setPageName,toggleModal,handlePageNameChange}}>
        {children}
    </ModalContext.Provider>
)}
export{
    ModalContext,
    ModalProvider
}