const {S3Client, GetObjectCommand, 
    PutObjectCommand, ListObjectsCommand,
    DeleteObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    }
});

async function getObjectURL(key){
    const command = new GetObjectCommand({
        Bucket: "arati-private",
        Key: key 
    });
    const url = await getSignedUrl(s3Client,command);
    return url;
}

async function PutObject(filename,contentType){
    const command = new PutObjectCommand({
        Bucket: 'arati-private',
        Key: `uploads/user-uploads/${filename}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3Client,command);
    return url;
}

async function ListObjects() {
    const command = new ListObjectsCommand({
        Bucket: 'arati-private',
        key: '/'
    });
    const result = await s3Client.send(command);
    console.log(result);
}

async function init() {
    //console.log("URL for image.jpg", await getObjectURL("image.jpg"));
    //console.log('URL for uploading', await PutObject(`image-${Date.now().jpg}`,"image/jpg"));
    await ListObjects();
    const cmd = new DeleteObjectCommand({
        Bucket: 'arati-private',
        key: 'image.jpg'
    });
    await s3Client.send(cmd);
}

init();

