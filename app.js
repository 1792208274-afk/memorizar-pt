let words=JSON.parse(localStorage.getItem("words"))||[
{pt:"cachorro",cn:"狗",fav:false},
{pt:"gato",cn:"猫",fav:false},
{pt:"casa",cn:"房子",fav:false},
{pt:"trabalho",cn:"工作",fav:false},
];
function save(){localStorage.setItem("words",JSON.stringify(words));}
function showSection(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.getElementById(id).classList.add("active");if(id==="list")loadWordList();if(id==="favorites")loadFavorites();}
function loadWordList(){const ul=document.getElementById("wordList");ul.innerHTML="";words.forEach((w,i)=>{const li=document.createElement("li");li.innerHTML=`<b>${w.pt}</b> — ${w.cn}
<button onclick="speak('${w.pt}')">🔊</button>
<button onclick="toggleFav(${i})">${w.fav?"⭐":"☆"}</button>`;ul.appendChild(li);});}
function speak(word){const u=new SpeechSynthesisUtterance(word);u.lang="pt-BR";speechSynthesis.speak(u);}
function toggleFav(i){words[i].fav=!words[i].fav;save();loadWordList();}
function loadFavorites(){const ul=document.getElementById("favoriteList");ul.innerHTML="";words.filter(w=>w.fav).forEach(w=>{const li=document.createElement("li");li.textContent=`${w.pt} — ${w.cn}`;ul.appendChild(li);});}
function searchWord(){const t=document.getElementById("search").value.toLowerCase();const f=words.filter(w=>w.pt.includes(t)||w.cn.includes(t));const ul=document.getElementById("wordList");ul.innerHTML="";f.forEach(w=>{const li=document.createElement("li");li.textContent=`${w.pt} — ${w.cn}`;ul.appendChild(li);});}
function addWord(){const pt=document.getElementById("newPt").value;const cn=document.getElementById("newCn").value;if(!pt||!cn)return alert("请输入完整单词");words.push({pt,cn,fav:false});save();alert("添加成功！");}
let cardIndex=0;function nextCard(){const fc=document.getElementById("flashCard");const w=words[cardIndex];fc.textContent=`${w.pt} — ${w.cn}`;cardIndex=(cardIndex+1)%words.length;}
let quizIndex=0;function nextQuiz(){const q=document.getElementById("quizQuestion");const op=document.getElementById("quizOptions");const w=words[quizIndex];q.textContent=`葡语：${w.pt}`;const wrong=words.filter(x=>x!==w).sort(()=>Math.random()-0.5).slice(0,3);const ans=[...wrong.map(x=>x.cn),w.cn].sort(()=>Math.random()-0.5);op.innerHTML="";ans.forEach(a=>{const b=document.createElement("button");b.textContent=a;b.onclick=()=>alert(a===w.cn?"正确！":"错误！");op.appendChild(b);});quizIndex=(quizIndex+1)%words.length;}