export function render() {
  return /*html*/`
  <div class="row padding-36 white border-radius-5 margin-top-16">
    <a name="grid-move" class="anchor">.</a>
    <h5><i class="fa fa-th-large"></i>Movimentação de colunas</h5>
    <p>Você pode mover a coluna apenas informando a classe .mov-? onde ? é o número desejado, veja o exemplo a baixo: </p>
    <div class="row margin-top-16 margin-top-16">
      <div class="col-2 border">.col-2</div>
    </div>
    <div class="row">
      <div class="col-2 move-1 border">.col-2 .move-1</div>
    </div>
    <div class="row">
      <div class="col-2 move-2 border">.col-2 .move-2</div>
    </div>
    <div class="row">
      <div class="col-2 move-3 border">.col-2 .move-3</div>
    </div>
    <div class="row">
      <div class="col-6 move-4 border">.col-6 .move-4</div>
    </div>
    <div class="row">
      <div class="col-2 move-10 border">.col-2 .move-10</div>
    </div>
  </div>
  `
}

export default { render }
