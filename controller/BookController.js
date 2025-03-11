const BookModel =require("../model/BoolModel")

module.exports={
    saveBookInDatabase:async(req, res)=>{
        const{title, author , isbn, price , published_year} =req.body;

        try{
            const book =await BookModel.insertBook(title, author, isbn, price, published_year);
            res.json({message:"Book successfully added.",book});
            res.status(201);
        }catch(err){
            console.log(err);
            res.status(500).json({error:err.message});
        }
        
    }
}

