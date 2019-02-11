export function render () {
  return /*html*/ `
    <div class="row padding-36 white border-radius-5 margin-top-16">
      <a name="show-hide" class="anchor">.</a>
      <h5><i class="fa fa-eye-slash"></i> Exibir ou ocultar elementos em diferentes resoluções</h5>
      <p>Adicionando a classe .hide-desk o elemento é ocultado apenas no desktop, .hidden-tab o elemento é ocultado apenas no tablet e .hidden-mob o elemento é ocultado apenas em smartphones.</p>
      <div class="row margin-top-16">
        <div class="row hidden-desk border"><div class="col-12">.hidden-desk Oculto para Desktop</div></div>
        <div class="row hidden-tab border"><div class="col-12">.hidden-tab Oculto para Tablet</div></div>
        <div class="row hidden-mob border"><div class="col-12">.hidden-mob Oculto para Smartphone</div></div>
      </div>
      <p>Adicionando a classe .show-desk o elemento será exibido apenas no desktop, .show-tab o elemento será exibido apenas no tablet e .show-mob o elemento será exibido apenas em smartphones.</p>
      <div class="row margin-top-16">
        <div class="row show-desk border"><div class="col-12">.show-desk Exibido para Desktop</div></div>
        <div class="row show-tab border"><div class="col-12">.show-tab Exibido para Tablet</div></div>
        <div class="row show-mob border"><div class="col-12">.show-mob Exibido para Smartphone</div></div>
      </div>
    </div>
  `
}

export default { render }
