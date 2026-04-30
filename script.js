const catMap={dinner:"Dinner",breakfast:"Breakfast",dessert:"Desserts",snack:"Snacks",nobake:"No-Bake",drink:"Drinks",soup:"Soups",salad:"Salads",side:"Sides",appetizer:"Appetizers",lunch:"Lunch"};
const catEmoji={dinner:"🍗",breakfast:"🥞",dessert:"🍪",snack:"🍿",nobake:"❄️",drink:"🥤",soup:"🍲",salad:"🥗",side:"🍴",appetizer:"🧆",lunch:"🥪"};
const catColors={dinner:"cDinner",breakfast:"cBreakfast",dessert:"cDessert",snack:"cSnack",nobake:"cNobake",drink:"cDrink",soup:"cSoup",salad:"cSalad",side:"cSide",appetizer:"cAppetizer",lunch:"cLunch"};
const favs=new Set(JSON.parse(localStorage.getItem('ivyF')||'[]'));
function sf(){localStorage.setItem('ivyF',JSON.stringify([...favs]));}
const allIng=new Set();
recipes.forEach(r=>r.ingredients.forEach(i=>allIng.add(i)));
document.getElementById('ingN').textContent=allIng.size;
document.getElementById('totalN').textContent=recipes.length;
document.getElementById('htag').textContent='✨ '+recipes.length+' Recipes with Real Measurements';
const cats={};recipes.forEach(r=>{if(!cats[r.cat])cats[r.cat]=0;cats[r.cat]++;});
document.getElementById('catN').textContent=Object.keys(cats).length;
const catBtns=document.getElementById('catBtns');
catBtns.innerHTML=`<button class="nb" data-c="all">🍴 All Recipes <span class="ct">${recipes.length}</span></button>`+Object.entries(cats).map(([k,v])=>`<button class="nb" data-c="${k}">${catEmoji[k]||'🍴'} ${catMap[k]||k} <span class="ct">${v}</span></button>`).join('');
const qtags=document.getElementById('qtags');
["chicken","chocolate","butter","eggs","garlic","cheese","peanut butter","sugar","cream cheese","bacon"].forEach(t=>{qtags.innerHTML+=`<span class="qt" data-s="${t}">${t}</span>`;});
function mkCard(r,term,i){
    const d=document.createElement('div');d.className='rc';d.style.animationDelay=`${i*.04}s`;
    const hasImg=r.image&&r.image.length>0;
    d.innerHTML=`<div class="rc-iw">${hasImg?`<img class="rc-img" src="${r.image}" alt="${r.name}" onerror="this.parentElement.innerHTML='<div class=rc-emo>${r.emoji||'🍴'}</div>'">`:`<div class="rc-emo">${r.emoji||'🍴'}</div>`}<div class="rc-bdg">${r.diff||'Easy'}</div><div class="rc-cat ${catColors[r.cat]||'cDinner'}">${catMap[r.cat]||r.cat}</div></div><div class="rc-bd"><div class="rc-nm">${r.name}</div><div class="rc-mt"><div class="rm">⏱️ ${r.time||'20 min'}</div><div class="rm">🥄 ${r.ingredients.length} items</div></div><div class="rc-dv"></div><div class="il">Ingredients</div><div class="iw">${r.ingredients.map(g=>{const raw=g.toLowerCase();const matched=term&&raw.includes(term.toLowerCase());return`<span class="it${matched?' hit':''}">${g}</span>`;}).join('')}</div><div class="nl">Instructions</div><p class="nt">${r.instructions}</p></div><div class="rc-ft"><button class="fb${favs.has(r.name)?' on':''}" data-n="${r.name}">❤️</button><button class="flb" data-n="${r.name}">View Full Recipe</button></div>`;
    d.querySelector('.fb').onclick=e=>{e.stopPropagation();const n=e.currentTarget.dataset.n;if(favs.has(n)){favs.delete(n);e.currentTarget.classList.remove('on');}else{favs.add(n);e.currentTarget.classList.add('on');}sf();};
    d.querySelector('.flb').onclick=e=>{e.stopPropagation();openM(r);};
    return d;
}
function openM(r){
    const hasImg=r.image&&r.image.length>0;
    document.getElementById('mimg').innerHTML=hasImg?`<img class="ml-img" src="${r.image}" alt="${r.name}" onerror="this.parentElement.innerHTML='<div class=ml-emo>${r.emoji||'🍴'}</div>'">`:`<div class="ml-emo">${r.emoji||'🍴'}</div>`;
    document.getElementById('mnm').textContent=r.name;
    document.getElementById('ming').innerHTML=r.ingredients.map(i=>`<span class="ml-ig">${i}</span>`).join('');
    document.getElementById('minst').textContent=r.instructions;
    document.getElementById('mo').classList.add('open');
}
document.getElementById('mx').onclick=()=>document.getElementById('mo').classList.remove('open');
document.getElementById('mo').onclick=e=>{if(e.target.id==='mo')e.target.classList.remove('open');};
const cb=document.getElementById('cb'),rsec=document.getElementById('rsec'),welc=document.getElementById('welc'),rlbl=document.getElementById('rlbl');
function showRes(list,term,label){
    welc.style.display='none';document.getElementById('srow').style.display='none';rsec.style.display='block';cb.innerHTML='';
    if(list.length===0){rlbl.innerHTML='No results';cb.innerHTML=`<div class="empty"><div class="empty-i">🔍</div><h3>No Recipes Found</h3><p>Try a different ingredient or recipe name</p></div>`;return;}
    rlbl.innerHTML=`Showing <strong>${list.length}</strong> recipe${list.length!==1?'s':''}${label?' — '+label:''}`;
    list.forEach((r,i)=>cb.appendChild(mkCard(r,term,i)));
}
function doS(){
    const t=document.getElementById('ui').value.toLowerCase().trim();
    if(!t){rsec.style.display='none';welc.style.display='';document.getElementById('srow').style.display='';return;}
    const f=recipes.filter(r=>r.name.toLowerCase().includes(t)||r.ingredients.some(g=>g.toLowerCase().includes(t)));
    showRes(f,t,`"${t}"`);
}
document.getElementById('sb').onclick=doS;
document.getElementById('ui').onkeydown=e=>{if(e.key==='Enter')doS();};
document.getElementById('clearR').onclick=()=>{cb.innerHTML='';document.getElementById('ui').value='';rsec.style.display='none';welc.style.display='';document.getElementById('srow').style.display='';};
document.getElementById('newS').onclick=()=>{cb.innerHTML='';document.getElementById('ui').value='';rsec.style.display='none';welc.style.display='';document.getElementById('srow').style.display='';document.getElementById('ui').focus();};
document.getElementById('showAll').onclick=()=>{document.getElementById('ui').value='';showRes([...recipes],'','All Recipes');};
document.getElementById('showFav').onclick=()=>{const fl=recipes.filter(r=>favs.has(r.name));if(fl.length===0){showRes([],'','');cb.innerHTML=`<div class="empty"><div class="empty-i">❤️</div><h3>No Favorites Yet</h3><p>Click the heart on any recipe to save it here</p></div>`;rlbl.innerHTML='My Favorites';}else showRes(fl,'','Favorites');};
document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const c=b.dataset.c;const f=c==='all'?[...recipes]:recipes.filter(r=>r.cat===c);document.getElementById('ui').value='';showRes(f,'',catMap[c]||'All Recipes');document.querySelectorAll('[data-c]').forEach(x=>x.classList.remove('act'));b.classList.add('act');});
document.querySelectorAll('.qt').forEach(t=>t.onclick=()=>{document.getElementById('ui').value=t.dataset.s;doS();});
document.querySelectorAll('.vb').forEach(b=>b.onclick=()=>{document.querySelectorAll('.vb').forEach(x=>x.classList.remove('act'));b.classList.add('act');cb.classList.toggle('lv',b.dataset.v==='list');});
document.getElementById('mt').onclick=()=>document.getElementById('side').classList.toggle('open');
document.onkeydown=e=>{if(e.key==='Escape')document.getElementById('mo').classList.remove('open');};
const wcats=[{i:"🍗",t:"Dinner",d:"Hearty mains from carbonara to teriyaki",c:"dinner"},{i:"🥞",t:"Breakfast",d:"Pancakes, waffles, burritos and more",c:"breakfast"},{i:"🍪",t:"Desserts",d:"Cookies, cakes, brownies, and pies",c:"dessert"},{i:"❄️",t:"No-Bake",d:"Quick treats with zero oven time",c:"nobake"},{i:"🍲",t:"Soups",d:"Warm bowls of comfort",c:"soup"},{i:"🥗",t:"Salads",d:"Fresh and crisp for every season",c:"salad"},{i:"🧆",t:"Appetizers",d:"Party starters and dips",c:"appetizer"},{i:"🥤",t:"Drinks",d:"Smoothies and beverages",c:"drink"},{i:"🍴",t:"Sides",d:"Garlic bread, wedges, and more",c:"side"},{i:"🥪",t:"Lunch",d:"Sandwiches and wraps",c:"lunch"},{i:"🍿",t:"Snacks",d:"Fun bites for any occasion",c:"snack"},{i:"🔍",t:"Search",d:"Type any ingredient to find recipes",c:null}];
welc.innerHTML=wcats.map((c,i)=>`<div class="wc" style="animation-delay:${i*.06}s" data-wc="${c.c||''}""><div class="wc-i">${c.i}</div><h3>${c.t}</h3><p>${c.d}</p></div>`).join('');
welc.querySelectorAll('.wc').forEach(c=>c.onclick=()=>{const cat=c.dataset.wc;if(cat){const f=recipes.filter(r=>r.cat===cat);showRes(f,'',catMap[cat]);}else document.getElementById('ui').focus();});