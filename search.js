let body = document.querySelector('body')
let table = document.querySelector('table')
let thead = document.querySelector('thead')
let result = document.querySelector('.result')
let html = document.querySelector('.index')
function getInputValue(){
    var inputVal = document.getElementById("myInput").value;
       if(inputVal == "")
    {
        alert("Please enter something in the field");
    }

    html.style.background='none'
    

    const app = new XMLHttpRequest();
    const url = "https://www.googleapis.com/books/v1/volumes?q="+ inputVal+"&maxResults=20"
    app.open( "GET", url,true)

    app.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
    console.log(data);
    table.style.display="block"

    for(let i=0;i<data.items.length;i++)
    {   
         let tr = document.createElement('tr')
        thead.appendChild(tr)
  
        let td = document.createElement('td')
        thead.appendChild(td)
        let img = document.createElement('img')
        img.className="book-img"
        let url = data.items[i].volumeInfo.imageLinks.thumbnail
        img.setAttribute('src', url)
        td.appendChild(img)

        let td2 = document.createElement('td')
        td2.className='description'
        thead.appendChild(td2)

        let title= document.createElement('p')
        title.className='title'
        title.innerHTML = data.items[i].volumeInfo.title
        td2.appendChild(title)

        let author = document.createElement('p')
        author.className='author'
        author.innerHTML = data.items[i].volumeInfo.authors
        td2.appendChild(author);

        let isbn = document.createElement('p')
        isbn.className="isbn"
        isbn.innerHTML= 'ISBN - '+ data.items[i].volumeInfo.industryIdentifiers[0].identifier
        td2.appendChild(isbn)
    

        let price = document.createElement('p')
        price.className="price"
        price.innerHTML= Math.floor(Math.random() * (15 - 5)) + 5 +' €'
        td2.appendChild(price)

        let button = document.createElement('button')
        button.className='btn-add'
        button.textContent="Ajouter le livre"
        td2.appendChild(button)
        button.addEventListener('click',()=>{

            let div_input = document.createElement('div')
            div_input.className="div_input"
            body.appendChild(div_input)
            let input_stock = document.createElement('input')
            input_stock.className="input_stock"
            input_stock.type="number"
            input_stock.placeholder=" Nombre de stock"
            div_input.appendChild(input_stock)
            let button_stock = document.createElement('button')
            button_stock.className='button_stock'
            button_stock.textContent="Confirmer"
            div_input.appendChild(button_stock)
            button_stock.addEventListener('click',()=>{

            let title_data = data.items[i].volumeInfo.title
            let author_data = data.items[i].volumeInfo.authors
            let img_data = data.items[i].volumeInfo.imageLinks.thumbnail
            let isbn_data = data.items[i].volumeInfo.industryIdentifiers[1].identifier
            let stock_data= input_stock.value

            const json = {
                "title": title_data,
                "author": author_data,
                "img": img_data,
                "isbn": isbn_data,
                "stock":stock_data,
                "price": Math.floor(Math.random() * (15 - 5)) + 5

            };
            console.log(json);
            div_input.style.display="none"
            var xhr = new XMLHttpRequest();
            let url_post = "https://books-api3.herokuapp.com/books";
            xhr.open("POST", url_post, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function () {
                // do something to response
                console.log(this.responseText);
            };
            xhr.send(JSON.stringify(json));
            })
        })
    }
   };
};

            app.send(null);
   
 
    
    }








// app.delete('/users/:username',async function(req,res){

//     try{
//         await knex('users').where({
//             username:req.params.username
//         }).del()
//     }catch (err){
//         return res.status(500).json({
//             statusCode:500,
//             message:'Internal Serve Error'
//         })
//     }
//     return res.status(200).json({
//         statusCode:200,
//         message:"Deleted"
//     })
// })


// app.listen(3000)