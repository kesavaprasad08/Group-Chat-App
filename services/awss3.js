require('dotenv').config();
const AWS =require('aws-sdk')

exports.UploadFileT0S3 =async(fileName,data)=>{
try{
    let s3bucket = new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY ,
        secretAccessKey:process.env.IAM_USER_SECRET ,
    });
    let params ={
        Bucket: process.env.BUCKET_NAME,
        Key:fileName,
        Body:data,
        ACL:'public-read'
    };
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,res)=>{
            if(err){
                
console.log(err)
                reject(err)
            }else{
                console.log('success');
                resolve(res.Location)
            }
        })
    })
}
catch(e){
console.log(e)
}
}