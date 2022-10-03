export default async function newCustomer(req,res){
    try{
        
        res.sendStatus(201);
    }catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}