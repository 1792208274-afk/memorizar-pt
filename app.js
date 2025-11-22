
async function load() {
  const res = await fetch('words.json');
  const data = await res.json();
  document.getElementById('app').innerText = 
    'Carregado ' + data.length + ' palavras.';
}
load();
