const Product =require('../models/product')

const getAllProductsStatic=async(req,res)=>{
    
    const products=await Product.find({price:{$gt:30}}).select('name price')
    .limit(4)
res.status(200).json({products,nbHits:products.length})
}
const getAllProducts=async(req,res)=>{
    const {featured,company,name,sort,fields,numericFilter}=req.query
    const queryObject={}
    if (featured){
        queryObject.featured=featured=== 'true' ? true:false 
    }
    if(company){
queryObject.company=company
    }
    if(name){
        queryObject.name={$regex:name ,$options:'i'}
    }
    if(numericFilter){
        const operatorMAP={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regex=/\b(<|>|>=|=|<|<=)\b/g
        let filters=numericFilter.replace(regex,(match)=>`-${operatorMAP[match]}-`)
        const options=['price,rating']
        filters=filters.split(',').forEach((item)=>{
        const [field,operator,value]=item.split('-')
        if(options.includes(field)){
            queryObject[field]={[operator]:Number(value)}
        }
    })
    
    }
    console.log(queryObject)
    let results=Product.find(queryObject)
    if(sort){
        const SortList=sort.split(',').join(' ');
        results=results.sort(SortList)
        console.log(sort)
    }else{
        results=results.sort('createAt')
    }
    if(fields){
        const FieldList=fields.split(',').join(' ')
        results=results.select(FieldList)
    }
    
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||10
    const skip=(page-1)*limit
    results=results.skip(skip).limit(limit)
    //23 
    //4 
    const products=await results
    res.status(200).json({products,nbHits:products.length})
    }
    module.exports={getAllProducts,getAllProductsStatic}
    //5:10