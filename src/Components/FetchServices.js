var axios=require("axios")
const BaseURL="http://localhost:3010"
const postData=async(url,body)=>{
    var response=await fetch(`${BaseURL}/${url}`,{
        method:"POST",
        mode:"cors",
        headers:{
            "Content-Type":"application/json; charset=utf-8"},
            body:JSON.stringify(body)})
            var result=await response.json()
    return result
        }
const postDataAndImage=async(url,formData,config)=>{
    try{
        var response=await axios.post(`${BaseURL}/${url}`,formData,config)
        var result=response.data.RESULT
        return result
    }
    catch(e)
    {
        console.log(e)
    }
}  
const getData=async(url)=>{
    var response=await fetch(`${BaseURL}/${url}`,{
        method:"GET",
        mode:"cors",
        headers:{
            "Content-type":"application/json; charset=utf-8"},
        })
        var result=await response.json()
        return result
} 
export {postData,getData,postDataAndImage}