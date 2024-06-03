



exports.loginContoller = async (req,res)=>{
    try {
        const {email,password} = req.body
        res.json({email:email,password:password})
        
    } catch (error) {
        console.log("ErreurMonu : " + error)
        
    }
 


}
