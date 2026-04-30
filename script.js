const catMap={dinner:"Dinner",breakfast:"Breakfast",dessert:"Desserts",snack:"Snacks",nobake:"No-Bake",drink:"Drinks",soup:"Soups",salad:"Salads",side:"Sides",appetizer:"Appetizers",lunch:"Lunch"};
const catEmoji={dinner:"🍗",breakfast:"🥞",dessert:"🍪",snack:"🍿",nobake:"❄️",drink:"🥤",soup:"🍲",salad:"🥗",side:"🍴",appetizer:"🧆",lunch:"🥪"};
const catColors={dinner:"cDinner",breakfast:"cBreakfast",dessert:"cDessert",snack:"cSnack",nobake:"cNobake",drink:"cDrink",soup:"cSoup",salad:"cSalad",side:"cSide",appetizer:"cAppetizer",lunch:"cAppetizer"};

const favs=new Set(JSON.parse(localStorage.getItem('ivyF')||'[]'));
function sf(){localStorage.setItem('ivyF',JSON.stringify([...favs]));}

const allIng=new Set();
recipes.forEach(r=>r.ingredients.forEach(i=>allIng.add(i)));
document.getElementById('ingN').textContent=allIng.size;
document.getElementById('totalN').textContent=recipes.length;

const cats={}; recipes.forEach(r=>{if(!cats[r.cat])cats[r.cat]=0;cats[r.cat]++;});
document.getElementById('catN').textContent=Object.keys(cats).length;

const catBtns=document.getElementById('catBtns');
catBtns.innerHTML='<button class="nb" data-c="all">🍴 All Recipes <span class="ct">'+recipes.length+'</span></button>'+
    Object.entries(cats).map(([k,v])=>'<button class="nb" data-c="'+k+'">'+(catEmoji[k]||'🍴')+' '+(catMap[k]||k)+' <span class="ct">'+v+'</span></button>').join('');

const qtags=document.getElementById('qtags');
["chicken","chocolate","butter","eggs","garlic","cheese","peanut butter","sugar","cream cheese","bacon"].forEach(t=>{
    qtags.innerHTML+='<span class="qt" data-s="'+t+'">'+t+'</span>';
});

function mkCard(r,term,i){
    const d=document.createElement('div');d.className='rc';d.style.animationDelay=i*.05+'s';
    const hasImg=r.image&&r.image.length>0;
    d.innerHTML=
        '<div class="rc-iw">'+
            (hasImg?'<img class="rc-img" src="'+r.image+'" alt="'+r.name+'" onerror="this.parentElement.innerHTML=\'<div class=rc-emo>'+(r.emoji||'🍴')+'</div>\'">':'<div class="rc-emo">'+(r.emoji||'🍴')+'</div>')+
            '<div class="rc-bdg">'+(r.diff||'Easy')+'</div>'+
            '<div class="rc-cat '+(catColors[r.cat]||'cDinner')+'">'+(catMap[r.cat]||r.cat)+'</div>'+
        '</div>'+
        '<div class="rc-bd">'+
            '<div class="rc-nm">'+r.name+'</div>'+
            '<div class="rc-mt">'+
                '<div class="rm">⏱️ '+(r.time||'20 min')+'</div>'+
                '<div class="rm">🥄 '+r.ingredients.length+' items</div>'+
            '</div>'+
            '<div class="rc-dv"></div>'+
            '<div class="il">Ingredients</div>'+
            '<div class="iw">'+r.ingredients.map(function(g){
                var matched=term&&g.toLowerCase().includes(term.toLowerCase());
                return '<span class="it'+(matched?' hit':'')+'">'+g+'</span>';
            }).join('')+'</div>'+
            '<div class="nl">Instructions</div>'+
            '<p class="nt">'+r.instructions+'</p>'+
        '</div>'+
        '<div class="rc-ft">'+
            '<button class="fb'+(favs.has(r.name)?' on':'')+'" data-n="'+r.name+'">❤️</button>'+
            '<button class="flb" data-n="'+r.name+'">View Full Recipe</button>'+
        '</div>';
    d.querySelector('.fb').onclick=function(e){e.stopPropagation();var n=e.currentTarget.dataset.n;if(favs.has(n)){favs.delete(n);e.currentTarget.classList.remove('on');}else{favs.add(n);e.currentTarget.classList.add('on');}sf();};
    d.querySelector('.flb').onclick=function(e){e.stopPropagation();openM(r);};
    return d;
}

function openM(r){
    var hasImg=r.image&&r.image.length>0;
    document.getElementById('mimg').innerHTML=hasImg?'<img class="ml-img" src="'+r.image+'" alt="'+r.name+'" onerror="this.parentElement.innerHTML=\'<div class=ml-emo>'+(r.emoji||'🍴')+'</div>\'">':'<div class="ml-emo">'+(r.emoji||'🍴')+'</div>';
    document.getElementById('mnm').textContent=r.name;
    document.getElementById('ming').innerHTML=r.ingredients.map(function(i){return '<span class="ml-ig">'+i+'</span>';}).join('');
    document.getElementById('minst').textContent=r.instructions;
    document.getElementById('mo').classList.add('open');
}
document.getElementById('mx').onclick=function(){document.getElementById('mo').classList.remove('open');};
document.getElementById('mo').onclick=function(e){if(e.target.id==='mo')e.target.classList.remove('open');};

var cb=document.getElementById('cb');
var rsec=document.getElementById('rsec');
var welc=document.getElementById('welc');
var rlbl=document.getElementById('rlbl');

function showRes(list,term,label){
    welc.style.display='none';document.getElementById('srow').style.display='none';
    rsec.style.display='block';cb.innerHTML='';
    if(list.length===0){rlbl.innerHTML='No results';cb.innerHTML='<div class="empty"><div class="empty-i">🔍</div><h3>No Recipes Found</h3><p>Try a different ingredient or recipe name</p></div>';return;}
    rlbl.innerHTML='Showing <strong>'+list.length+'</strong> recipe'+(list.length!==1?'s':'')+(label?' — '+label:'');
    list.forEach(function(r,i){cb.appendChild(mkCard(r,term,i));});
}

function doS(){
    var t=document.getElementById('ui').value.toLowerCase().trim();
    if(!t){rsec.style.display='none';welc.style.display='';document.getElementById('srow').style.display='';return;}
    var f=recipes.filter(function(r){return r.name.toLowerCase().includes(t)||r.ingredients.some(function(g){return g.toLowerCase().includes(t);});});
    showRes(f,t,'"'+t+'"');
}

document.getElementById('sb').onclick=doS;
document.getElementById('ui').onkeydown=function(e){if(e.key==='Enter')doS();};
document.getElementById('clearR').onclick=function(){cb.innerHTML='';document.getElementById('ui').value='';rsec.style.display='none';welc.style.display='';document.getElementById('srow').style.display='';};
document.getElementById('newS').onclick=function(){cb.innerHTML='';document.getElementById('ui').value='';rsec.style.display='none';welc.style.display='';document.getElementById('srow').style.display='';document.getElementById('ui').focus();};
document.getElementById('showAll').onclick=function(){document.getElementById('ui').value='';showRes([].concat(recipes),'','All Recipes');};
document.getElementById('showFav').onclick=function(){
    var fl=recipes.filter(function(r){return favs.has(r.name);});
    if(fl.length===0){showRes([],'','');cb.innerHTML='<div class="empty"><div class="empty-i">❤️</div><h3>No Favorites Yet</h3><p>Click the heart on any recipe to save it here</p></div>';rlbl.innerHTML='My Favorites';}
    else showRes(fl,'','Favorites');
};

document.querySelectorAll('[data-c]').forEach(function(b){b.onclick=function(){
    var c=b.dataset.c;var f=c==='all'?[].concat(recipes):recipes.filter(function(r){return r.cat===c;});
    document.getElementById('ui').value='';showRes(f,'',catMap[c]||'All Recipes');
    document.querySelectorAll('[data-c]').forEach(function(x){x.classList.remove('act');});b.classList.add('act');
};});

document.querySelectorAll('.qt').forEach(function(t){t.onclick=function(){document.getElementById('ui').value=t.dataset.s;doS();};});
document.querySelectorAll('.vb').forEach(function(b){b.onclick=function(){document.querySelectorAll('.vb').forEach(function(x){x.classList.remove('act');});b.classList.add('act');cb.classList.toggle('lv',b.dataset.v==='list');};});
document.getElementById('mt').onclick=function(){document.getElementById('side').classList.toggle('open');};
document.onkeydown=function(e){if(e.key==='Escape')document.getElementById('mo').classList.remove('open');};

var wcats=[
    {i:"🍗",t:"Dinner",d:"Hearty mains from carbonara to teriyaki chicken",c:"dinner"},
    {i:"🥞",t:"Breakfast",d:"Start your day with pancakes, waffles, and more",c:"breakfast"},
    {i:"🍪",t:"Desserts",d:"Cookies, cakes, brownies, and pies galore",c:"dessert"},
    {i:"❄️",t:"No-Bake",d:"Quick treats with zero oven time",c:"nobake"},
    {i:"🍲",t:"Soups",d:"Warm bowls of comfort from chili to stew",c:"soup"},
    {i:"🥗",t:"Salads",d:"Fresh and crisp salads for every season",c:"salad"},
    {i:"🧆",t:"Appetizers",d:"Party starters from nachos to bruschetta",c:"appetizer"},
    {i:"🥤",t:"Drinks",d:"Smoothies, lemonade, and hot chocolate",c:"drink"},
    {i:"🍴",t:"Sides",d:"Garlic bread, potato wedges, and more",c:"side"},
    {i:"🥪",t:"Lunch",d:"Sandwiches, wraps, and quick bites",c:"lunch"},
    {i:"🍿",t:"Snacks",d:"Fun bites for movie nights and parties",c:"snack"},
    {i:"🔍",t:"Search",d:"Try typing any ingredient to find recipes",c:null}
];
welc.innerHTML=wcats.map(function(c,i){return '<div class="wc" style="animation-delay:'+i*.06+'s" data-wc="'+(c.c||'')+'"><div class="wc-i">'+c.i+'</div><h3>'+c.t+'</h3><p>'+c.d+'</p></div>';}).join('');
welc.querySelectorAll('.wc').forEach(function(c){c.onclick=function(){var cat=c.dataset.wc;if(cat){var f=recipes.filter(function(r){return r.cat===cat;});showRes(f,'',catMap[cat]);}else document.getElementById('ui').focus();};});