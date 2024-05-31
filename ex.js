const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

/////////////// Files

// Blocking synchronously
// const textIn = fs.readFileSync('./starter/txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `Info about Avocado's - ${textIn}\n created on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt',textOut)


// non Blocking asynchronously

// fs.readFile('./starter/txt/starto.txt','utf-8',(err,data1) => {
//     if (err) return console.log('Error')
//     fs.readFile(`./starter/txt/${data1}.txt`,'utf-8',(err,data2) => {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt','utf-8',(err,data3) => {
//             console.log(data3);
//         fs.writeFile('./starter/txt/op.txt',`${data1}\n${data3}`,'utf-8',err =>{
//             console.log('done')
//         });
    
//         });
//     });
// });
// console.log('hehe');

// functions

const replaceTemplate = (template,product) =>{
    
}




///// Server    

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');    
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');

const server = http.createServer((req,res)=>{
    const pathName = req.url

    // overview page

    if (pathName === '/' || pathName === '/overview' ){

        res.writeHead(200,{'Content-type':'text/html'})

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard,element))

        res.end(tempOverview);
    }

    // product page

    else if (pathName === '/product'){
        res.end('product');
    }

    // API

    else if (pathName === '/api'){

        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);
        //console.log(productData);

    }

    // Not found 
    
    else{
        res.writeHead(404,{
            'Content-Type':'text/html',
            'my-own-header':'hello-world',
        }); 

        res.end('<h1>Page not found</h1>');
    }
    
})  ;

server.listen(8000,'127.0.0.1',()=>{
    console.log('listining on port 8000')
})
