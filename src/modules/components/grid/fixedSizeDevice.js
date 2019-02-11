export function render() {
  return /*html*/`
  <div class="row padding-36 white border-radius-5 margin-top-16">
    <a name="grid-fixed" class="anchor">.</a>
    <h5><i class="fa fa-th-large"></i>Fixar colunas em dispositivos móveis</h5>
    <p>Para que a coluna tenha seu tamanho fixo mesmo em dispositivos móvies, adicione a classe .columns n div pai das colunas</p>
    <div class="row column border margin-top-16 padding-8">
      <p>.row .column</p>
      <div class="col-4 border">.col-4</div>
      <div class="col-4 border">.col-4</div>
      <div class="col-4 border">.col-4</div>
    </div>
    <p>O mesmo é necessário para que movimentação de colunas aconteça no mobile</p>
    <div class="row column border margin-top-16 padding-8">
      <p>.row .column</p>
      <div class="col-4 move-4 border">.col-4 .move-4</div>
    </div>
  </div>
  `
}

export default { render }
