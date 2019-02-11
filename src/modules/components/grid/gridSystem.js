export function render() {
  return /*html*/`
  <div class="row padding-36 white border-radius-5 margin-top-16">
    <a name="grid" class="anchor">.</a>
    <h4><i class="fa fa-th-large"></i>Sistemas de Coluna</h4>
    <p>
      O sistema de colunas do MoskaCss é baseado em Flexbox. Uma coluna pode ser definida com o espaço de 1 a 12 colunas e necessariamente precisa estar dentro de uma .row que divide o seu conteúdo em 12 colunas.
    </p>

    <div class="row margin-top-16">
      <div class="col-1 border">.col-1</div>
      <div class="col-5 border">.col-5</div>
      <div class="col-5 border">.col-5</div>
      <div class="col-1 border">.col-1</div>
    </div>
    <div class="row">
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
      <div class="col-1 border">.col-1</div>
    </div>
    <div class="row">
      <div class="col-1 border">.col-1</div>
      <div class="col-10 border">.col-10</div>
      <div class="col-1 border">.col-1</div>
    </div>

    <code class="highlight col-12 border-radius-5">
      <div class="row">
        <div class="col-1">.col-1</div>
        <div class="col-5">.col-5</div>
        <div class="col-5">.col-5</div>
        <div class="col-1">.col-1</div>
      </div>
    </code>
  </div>
  `
}

export default { render }
