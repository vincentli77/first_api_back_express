
let thead = document.querySelector('thead')


window.addEventListener("load",function(){
    const app = new XMLHttpRequest();
    const url = "https://books-api3.herokuapp.com/books"
    app.open( "GET", url,true)
    app.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          let data = JSON.parse(this.response); 
          data.data.reverse()      
        for(let i=0;i<2;i++)
        {   
          let tr = document.createElement('tr')
          thead.appendChild(tr)
    
          let td = document.createElement('td')
          tr.appendChild(td)
          let img = document.createElement('img')
          img.className="book-img"
          let url = data.data[i].img
          img.setAttribute('src', url)
          td.appendChild(img)

          let td2 = document.createElement('td')
          td2.className='description'
          tr.appendChild(td2)
          td2.textContent= data.data[i].title

        // let title= document.createElement('p')
        // title.className='title'
        // title.innerHTML = data.data[i].title
        // td2.appendChild(title)

          let author = document.createElement('p')
          author.className='author'
          author.innerHTML = data.data[i].author
          td2.appendChild(author);

          let isbn = document.createElement('p')
          isbn.className="isbn"
          isbn.innerHTML='ISBN - '+ data.data[i].isbn
          td2.appendChild(isbn)
      

          let price = document.createElement('p')
          price.className="price"
          price.innerHTML= Math.floor(Math.random() * (15 - 5)) + 5 +' €'
          td2.appendChild(price)

          let stock = document.createElement('p')
          stock.className="stock"
          if(data.data[i].stock>0){
            stock.style.color="green"
            stock.innerHTML= "En Stock : " + data.data[i].stock
          }
          else if(data.data[i].stock==0){
            stock.style.color="red"
            stock.innerHTML= "Rupture de Stock" 

          }
          td2.appendChild(stock)

          let button = document.createElement('button')
          button.className='btn-delete'
          button.textContent="Supprimer"
          td2.appendChild(button)
          button.addEventListener('click',()=>{

            let id_data = data.data[i].id
            let title_data = data.data[i].title
            let author_data = data.data[i].author
            let img_data = data.data[i].img
            let isbn_data = data.data[i].isbn
            let price_data =  Math.floor(Math.random() * (15 - 5)) + 5

            const json = {
                "title": title_data,
                "author": author_data,
                "img": img_data,
                "isbn_data": isbn_data,
                "price": price_data

            };

            var xhr = new XMLHttpRequest();
            let url_delete = "https://books-api3.herokuapp.com/books/"+id_data;
            xhr.open("DELETE", url_delete, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function () {
                // do something to response
                console.log(this.responseText);
                if(this.responseText.statuscode="200"){

                  document.location.reload();
                }
            };
            xhr.send(JSON.stringify(json));

        
            console.log(data.data[i]);
        });

        let edit = document.createElement('button')
        edit.className='btn-edit'
        edit.textContent="Modifier stock"
        td2.appendChild(edit)
    }
   }
  }
      app.send(null);

})
