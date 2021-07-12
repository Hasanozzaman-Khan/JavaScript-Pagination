
const url = 'https://script.google.com/macros/s/AKfycbzA9ZdLwhwicQUyoITsJnhheoCaS4xzJSX5WFLnTYPlFiSyrxvynNRJ/exec';

const page = {};
page.currentPage = 1;

document.addEventListener('DOMContentLoaded', init);


function init(){
  page.currentPage = 1;
  page.nextPage = 1;
  page.output = document.querySelector('.output');
  page.pagin = document.querySelector('.pagin');
  page.pagin.classList.add('loadButton');
  page.pagin.style.display = 'none';

  page.pagin.addEventListener('click', (e)=>{
    page.pagin.textContent = 'Load....';
    console.log('Moving to ' + page.nextPage);
    getContents(page.nextPage);
    page.pagin.style.display = 'none';
  });
  getContents();
}


function getContents(pageVal){
  const tempURL = !pageVal ? url : url + '?page=' + pageVal;
  page.currentPage = !pageVal ? 1 : pageVal;
  fetch(tempURL).then((response) => response.json())
  .then((data)=>{
    addContent(data);
  })
}


function addContent(data){
  data.data.forEach((el) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${el.title}</h3>
      <div class="posted">
        <p>${el.content}</p>
        <small>${el.author}</small>
      </div>
    `;
    page.output.append(div);
  });
  
  if (data.pages.next) {
    page.nextPage = data.pages.next;
    page.pagin.style.display = 'block';
    page.pagin.textContent = 'Load more';
  }
}
