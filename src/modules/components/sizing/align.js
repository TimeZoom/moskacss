export function render() {
  return /*html*/`
  <div class="row padding-36 white border-radius-5 margin-top-16">
    <a name="align" class="anchor">.</a>
    <h5><i class="fa fa-eye-slash"></i> Alinhamento Horizontal</h5>
    <p>...</p>
    <div class="row margin-top-16">
      <div class="row padding-8 border horizontal-left">
        <p>.row.horizontal-left</p>
        <div class="col-5 border">.col-5</div>
      </div>
      <div class="row padding-8 border horizontal-center">
        <p>.row.horizontal-center</p>
        <div class="col-5 border">
          <p class="content-center">
            .col-5 .self-center
          </p>
        </div>
      </div>
      <div class="row padding-8 border horizontal-right">
        <p>.row.horizontal-left</p>
        <div class="col-6 border">.col-6</div>
      </div>
    </div>
  </div>
  `
}

export default { render }
