const express=require('express')
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("server is up n running");
})
module.exports=router;