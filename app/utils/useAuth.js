import { jwtVerify } from "jose"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const encodeKey = process.env.NEXT_PUBLIC_ENCODE_KEY

const useAuth = () => {
  const [ loginUserEmail, setLoginUserEmail ] = useState("")
  const router = useRouter()
  
  useEffect(() => {
    const checkToken = async() => {
      const token = localStorage.getItem("token")
      if(!token) {
        router.push("/user/login")
      }
      try {
        const secretKey = new TextEncoder().encode(encodeKey)
        const decodedJwt = await jwtVerify(token, secretKey)
        setLoginUserEmail(decodedJwt.payload.email)
      }catch(err) {
        router.push("/user/login")
      }
    }
    checkToken()
  },[router])

  return loginUserEmail
}

export default useAuth