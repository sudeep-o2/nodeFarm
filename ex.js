const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const slugify = require('slugify')

const replaceTemplate = require('./modules/replaceTemplate');

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

// const replaceTemplate = (template,product) =>{
//     let output = template.replace(/{%PRODUCTNAME%}/g,product.productName);
//     output = output.replace(/{%IMAGE%}/g,product.image);
//     output = output.replace(/{%QUANTITY%}/g,product.quantity);
//     output = output.replace(/{%PRICE%}/g,product.price);
//     output = output.replace(/{%ID%}/g,product.id);
//     output = output.replace(/{%FROM%}/g,product.from);
//     output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
//     output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
//     output = output.replace(/{%DESCRIPTION%}/g,product.description);

//     if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
//     return output;

// }




///// Server    

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');    
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');

// console.log(slugify('fresh Avacado',{
//     lower:true,
//     replacement:'_'
// }));

// const sl = dataObj.map(el => slugify(el.productName,{lower:true}));
// console.log(sl);

const server = http.createServer((req,res)=>{
    //const pathName = req.url
    const {query , pathname} = url.parse(req.url,true);
    console.log(query,pathname)

    // overview page

    if (pathname === '/' || pathname === '/overview' ){

        res.writeHead(200,{'Content-type':'text/html'});

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard,element));

        //console.log(cardsHtml);
        out = cardsHtml.join('')

        output = tempOverview.replace('{%PRODUCT_CARDS%}',out)

        res.end(output);
    }

    // product page

    else if (pathname === '/product'){

        res.writeHead(200,{'Content-type':'text/html'});

        const prod = dataObj[query.id];
        console.log(prod)
        output = replaceTemplate(tempProduct,prod);
        res.end(output);
    }

    // API

    else if (pathname === '/api'){

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
