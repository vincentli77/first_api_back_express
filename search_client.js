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

    

        let price = document.createElement('p')
        price.className="price"
        price.innerHTML= Math.floor(Math.random() * (15 - 5)) + 5 +' €'
        td2.appendChild(price)

        let button = document.createElement('button')
        button.className='btn-add'
        button.textContent="Acheter"
        td2.appendChild(button)
     
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