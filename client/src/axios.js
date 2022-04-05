import axios from "axios"

const instance =axios.create({
    baseURL:"https://whatsapp-demo-clone.herokuapp.com/",
})

export default instance