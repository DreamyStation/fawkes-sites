// revelar blocos ao rolar (o conteúdo continua legível sem isso)
const itens = document.querySelectorAll('.card,.grade li,.passos li,.form,.orc__texto');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  itens.forEach(e => e.classList.add('rev'));
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('vis'); io.unobserve(x.target); } }), { threshold: 0.12 });
  itens.forEach(e => io.observe(e));
}
// o botão flutuante só aparece depois do início e some na seção de orçamento
const flut = document.querySelector('.flutuante'), orc = document.getElementById('orcamento'), ini = document.getElementById('inicio');
if (flut && 'IntersectionObserver' in window) {
  const vis = { ini: true, orc: false };
  const atualiza = () => { flut.style.visibility = (vis.ini || vis.orc) ? 'hidden' : 'visible'; };
  new IntersectionObserver(([x]) => { vis.ini = x.isIntersecting; atualiza(); }, { threshold: 0.25 }).observe(ini);
  new IntersectionObserver(([x]) => { vis.orc = x.isIntersecting; atualiza(); }).observe(orc);
  atualiza();
}
// formulário: monta a mensagem, copia e abre o direct
const form = document.getElementById('form'), aviso = document.getElementById('aviso');
form.addEventListener('submit', async ev => {
  ev.preventDefault();
  const nome = form.nome.value.trim();
  if (!nome) { aviso.textContent = 'Conta o nome do seu negócio pra gente começar.'; form.nome.focus(); return; }
  const precisa = [...form.querySelectorAll('input[name=n]:checked')].map(c => c.value);
  const msg = 'Oi, Fawkes! Meu negócio é ' + nome + ' (' + form.tipo.value.toLowerCase() + '). Preciso de: ' + (precisa.length ? precisa.join(', ') : 'ajuda pra decidir') + '. Podem me mandar ideia, prazo e valor?';
  try { await navigator.clipboard.writeText(msg); aviso.textContent = 'Mensagem copiada! Cole no direct e envie.'; }
  catch (e) { aviso.textContent = 'Copie a mensagem: ' + msg; }
  window.open('https://ig.me/m/fawkes.dsg', '_blank', 'noopener');
});
