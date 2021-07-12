
const url = 'https://script.google.com/macros/s/AKfycbzA9ZdLwhwicQUyoITsJnhheoCaS4xzJSX5WFLnTYPlFiSyrxvynNRJ/exec';

const page = {};
page.currentPage = 1;

document.addEventListener('DOMContentLoaded', init);


function init(){
  page.currentPage = 1;
  page.output = document.querySelector('.output');
  page.pagin = document.querySelector('.pagin');
  getDataVals();
}


function getDataVals(){
  page.output.innerHTML = '';
  getContents();
}


function getContents(pageVal){
  const tempURL = !pageVal ? url : url + '?page=' + pageVal;
  page.currentPage = !pageVal ? 1 : pageVal;
  page.output.innerHTML = 'loading . . .';
  fetch(tempURL).then((response) => response.json())
  .then((data)=>{
    page.output.innerHTML = `<h1 class="pageNum">Page #${page.currentPage}</h1>`;
    addContent(data.data);
    data.pages.total = data.total;
    addPages(data.pages);
  })
}


function addPages(data){
  page.pagin.innerHTML = '';
  const div = elMaker(page.pagin, 'main', 'div');

// Add first button
   const firstBtn = elMaker(div, 'btn', 'button');
   firstBtn.textContent = 'First';
   firstBtn.addEventListener('click',(e)=>{
     getContents(1);
   });

// Add previous button
  const prevBtn = elMaker(div, 'btn', 'button');
  prevBtn.textContent = 'prev';
  if(data.previous){
    prevBtn.classList.remove('mute');
    prevBtn.disabled = false;
    prevBtn.addEventListener('click', (e)=>{
      getContents(data.previous)
  });}else {
    prevBtn.classList.add('mute');
    prevBtn.disabled = true;
  }

// Add current button
  let start = page.currentPage - 3;
  for (let i = start; i < start+7; i++) {
    if (i>=1 && i<=data.total) {
      const curBtn = elMaker(div, 'btn', 'button');
      curBtn.textContent = i;
      curBtn.addEventListener('click', (e)=>{
        getContents(i);
      });
      if (i == page.currentPage) {
        curBtn.classList.add('active');
      }
    }
  }

// Add next button
  const nextBtn = elMaker(div, 'btn', 'button');
  nextBtn.textContent = 'next';
  if(data.next){
    nextBtn.classList.remove('mute');
    nextBtn.disabled = false;
    nextBtn.addEventListener('click', (e)=>{
      getContents(data.next)
  });}else {
    nextBtn.classList.add('mute');
    nextBtn.disabled = true;
  }

// Add last button
  const lastBtn = elMaker(div, 'btn', 'button');
  lastBtn.textContent = 'last';
  lastBtn.addEventListener('click',(e)=>{
    getContents(data.total);
  });
}


function elMaker(parent, classAdd, element){
  const temp = document.createElement(element);
  parent.append(temp);
  temp.classList.add(classAdd);
  return temp;
}


function addContent(arr){
  arr.forEach((el) => {
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
}
