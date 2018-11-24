export function render() {
  return /*html*/`
  <div class="row padding-36 white border-radius-5 margin-top-16">
    <a name="grid-size" class="anchor">.</a>
    <h5><i class="fa fa-th-large"></i> Tamanhos de colunas diferentes de acordo com o dispositivo</h5>
    <p>É possível definir tamanhos diferentes para diferentes resoluções, caso defina .col-2 no desktop as colunas irão equivaler a 1/6 das 12 colunas, automaticamente em dispositivos móveis a coluna ocupara 100% do tamanho, porem em alguns casos se faz necessário forçar o tamanho de apenas uma ou mais colunas, neste caso juntamente com o .col-2 podemos passar uma nova classe para o dispositivo em questão, por exemplo: .col-2 .tab-4 .mob-6. Desta forma em desktop teremos 6 colunas ocupando 2 espaços totalizando 12 colunas, no tablet teremos 6 colunas ocupando quatros espaços e em smartphones teremos 6 colunas ocupando 6 espaços.</p>
    <div class="row border margin-top-16">
      <div class="col-2 tab-4 mob-6 border">.col-2 .tab-4 .mob-6</div>
      <div class="col-2 tab-4 mob-6 border">.col-2 .tab-4 .mob-6</div>
      <div class="col-2 tab-4 mob-6 border">.col-2 .tab-4 .mob-6</div>
      <div class="col-2 tab-4 mob-6 border">.col-2 .tab-4 .mob-6</div>
      <div class="col-2 tab-4 mob-6 border">.col-2 .tab-4 .mob-6</div>
      <div class="col-2 tab-4 mob-6 border">.col-2 .tab-4 .mob-6</div>
    </div>
  </div>
  `
}

export default { render }
