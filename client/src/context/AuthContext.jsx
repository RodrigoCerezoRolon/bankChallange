import { createContext,useContext,useEffect,useState } from "react";
import { registerRequest,loginRequest,verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};
export const AuthProvider = ({children})=>{
    const [user,setUser]= useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [errors,setErrors]=useState([]);
    const [loading,setLoading]= useState(true)
    const signup=async (user)=>{
        try {
            const res=await registerRequest(user);
            // console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(true);
        } catch (error) {
          
           setErrors(error.response.data)
        }
       
    }
    const signin = async (user)=>{
      try {
       const res= await loginRequest(user)
      //  console.log(res)
       setIsAuthenticated(true);
      } catch (error) {
        console.log(error.response);
        if(Array.isArray(error.response.data)){
           
            return setErrors(error.response.data)
        }
        setErrors([error.response.data.message])
      }
    }
    // useEffect(()=>{
    //   async function checkLogin(){
    //     const cookies=Cookies.get()
    //     if (!cookies.token) {
    //         setIsAuthenticated(false);
    //         setLoading(false)
    //         setUser(null);
    //         return;
    //     }
    
    //         try {
    //             const res =  await verifyTokenRequest(cookies.token)
    //             if(!res.data){
    //                 setIsAuthenticated(false)
    //                 setLoading(false)
    //                 return;
    //             } 
    //             setIsAuthenticated(true)
    //             setUser(res.data)
    //             setLoading(false)
    //         } catch (error) {
    //             setIsAuthenticated(false)
    //             setUser(null)
    //             setLoading(false)
    //         }
          
        
    //    }
    //    checkLogin();
    // },[])
    const logout = () => {
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
    };
    useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(cookies.token);
            // console.log(res);
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);
    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            user,
            isAuthenticated,
            loading,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}