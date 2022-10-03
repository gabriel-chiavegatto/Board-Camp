export default async function updateCustomer(req,res){
    try{
        
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}