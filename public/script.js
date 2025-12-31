async function gerar() {
  const nome = nomeInput.value;
  const escolaridade = escolaridadeInput.value;
  const experiencia = experienciaInput.value;
  const objetivo = objetivoInput.value;

  const res = await fetch("/gerar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, escolaridade, experiencia, objetivo })
  });
  const data = await res.json();
  resultado.innerText = data.texto;
}
