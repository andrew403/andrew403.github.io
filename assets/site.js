'use strict';
document.querySelectorAll('[data-tabs]').forEach(group => {
  const buttons = [...group.querySelectorAll('[role="tab"]')];
  const activate = button => {
    buttons.forEach(b => { b.setAttribute('aria-selected', String(b === button)); b.tabIndex = b === button ? 0 : -1; });
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (panel) panel.setAttribute('aria-labelledby', button.id);
    if (group.dataset.tabs === 'method') {
      document.getElementById('step-title').textContent = button.dataset.title;
      document.getElementById('step-body').textContent = button.dataset.text;
      const highlight = document.getElementById('step-highlight');
      const box = button.dataset.box;
      highlight.style.display = box ? 'block' : 'none';
      if (box) { const [x,y,w,h] = box.split(','); Object.assign(highlight.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'}); }
    } else if (group.dataset.tabs === 'results') {
      const img = document.getElementById('result-image'); img.src = button.dataset.src; img.alt = button.dataset.alt;
      document.getElementById('result-caption').textContent = button.dataset.caption;
    } else if (group.dataset.tabs === 'maze') {
      const fileId = button.dataset.fileId;
      const frame = document.getElementById('maze-video');
      frame.src = 'https://drive.google.com/file/d/' + fileId + '/preview';
      frame.title = button.dataset.title;
      document.getElementById('maze-caption').textContent = button.dataset.caption;
    } else if (group.dataset.tabs === 'videos') {
      const iframe = document.getElementById('deployment-video'); iframe.src = button.dataset.src; iframe.title = button.dataset.title;
      document.getElementById('video-caption').textContent = button.dataset.caption;
      document.getElementById('youtube-link').href = 'https://www.youtube.com/watch?v=' + button.dataset.videoId;
    }
  };
  buttons.forEach((button,index) => {
    button.tabIndex = button.getAttribute('aria-selected') === 'true' ? 0 : -1;
    button.addEventListener('click',()=>activate(button));
    button.addEventListener('keydown',event=>{
      let next; if(event.key==='ArrowRight') next=(index+1)%buttons.length; if(event.key==='ArrowLeft') next=(index+buttons.length-1)%buttons.length; if(event.key==='Home') next=0; if(event.key==='End') next=buttons.length-1;
      if(next!==undefined){event.preventDefault();buttons[next].focus();activate(buttons[next]);}
    });
  });
});
const lightbox=document.getElementById('lightbox');
if(lightbox){const label=lightbox.querySelector('.lightbox-label');const defaultLabel=label?label.textContent:'';document.querySelectorAll('[data-enlarge]').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img');const target=lightbox.querySelector('img');target.src=source.src;target.alt=source.alt;if(label)label.textContent=button.dataset.lightboxLabel||defaultLabel;lightbox.showModal();}));lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close();});}
const copy=document.getElementById('copy-citation');
if(copy)copy.addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText(document.getElementById('bibtex-code').textContent);status.textContent='Citation copied.';copy.textContent='Copied';}catch{status.textContent='Select the citation text below to copy it.';}});
