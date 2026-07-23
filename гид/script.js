// Карусель: прокрутка по клику на кнопки
const carousel = document.getElementById('carousel');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

function scrollByCard(offset){ // offset in pixels
  carousel.scrollBy({left: offset, behavior:'smooth'});
}

next.addEventListener('click', ()=> scrollByCard(280));
prev.addEventListener('click', ()=> scrollByCard(-280));

// Ссылки направлений — переход к соответствующему куратору
document.querySelectorAll('.dir-link').forEach(link=>{
  link.addEventListener('click', (e)=>{
    const tgt = e.currentTarget.getAttribute('data-target');
    const el = document.getElementById(tgt);
    if(!el) return;

    // подсветка на мгновение
    el.style.boxShadow = '0 0 0 4px rgba(255,215,0,0.12)';
    setTimeout(()=> el.style.boxShadow = '', 2400);

    // горизонтальная центровка карточки в карусели
    const rect = el.getBoundingClientRect();
    const carrRect = carousel.getBoundingClientRect();
    const offset = rect.left - (carrRect.left + (carrRect.width - rect.width)/2);
    carousel.scrollBy({left: offset, behavior:'smooth'});

    // вертикальная прокрутка страницы чуть выше элемента
    // extraPx регулирует, на сколько пикселей выше поставить элемент (поставьте 60-120 по вкусу)
    const extraPx = 80;
    const targetTop = window.scrollY + rect.top - extraPx;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  });
});

// Улучшение: прокрутка колесом мыши по горизонтали
carousel.addEventListener('wheel', (e)=>{
  if(Math.abs(e.deltaX) < Math.abs(e.deltaY)){
    e.preventDefault();
    carousel.scrollBy({left: e.deltaY, behavior:'auto'});
  }
});