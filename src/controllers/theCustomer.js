export default async function theCustomer(req,res){
    try{
        
        res.status(200).send(customer)
    }catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}