<div class="container-fluid header-header">
  <div class="row">

    <div class="pull-left shop-button-container">
      {{#if showShopButton}}
      <a href="#!/shop" class="scroll-down">shop</a>
      {{/if}}
      {{#unless showShopButton}}
      <a id="header-button-sizing" href="#!/shop/sizing" class="scroll-down">sizing</a>
      <a id="header-button-service" href="#!/shop/service" class="scroll-down header-border-left hidden-mobile">service</a>
      {{/unless}}
    </div>

    <div class="pull-right cart-button-container">
      {{#if showCartButton}}
        <a id="header-button-cart" href="#!/shop/checkout" class="pull-right scroll-down header-border-left">{{#unless checkoutHidden}}<span class="hidden-mobile">hide </span>{{/unless}}cart {{total_items}}</a>
      {{/if}}
      <a href="#" class="toggle-sidebar scroll-down">menu</a>
    </div>

    <div class="text-center variable-text">
      <span class="toggle-home">{{header}}</span>
    </div>

  </div>
</div>

<div id="header-checkout" {{#if checkoutHidden}}class="hidden scroll-down"{{/if}}></div>
