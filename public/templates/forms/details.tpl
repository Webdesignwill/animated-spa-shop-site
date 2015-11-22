<h3>Enter your details</h3><button id="shop-details-review-order">Review order</button>
<div class="form-group">
  <label class="control-label col-sm-4" for="first_name-field">First Name</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="first_name-field" name="first_name">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="last_name-field">Last Name</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="last_name-field" name="last_name">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="email-field">Email</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="email-field" name="email">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="addressno-field">Address No</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="addressno-field" name="addressno">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="street-field">Street</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="street-field" name="street">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="city-field">City</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="city-field" name="city">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="country-field">Country</label>
  <div class="col-sm-8">
    <div class="input-group col-md-12">
      <select class="form-control collection-select" id="country-field" name="country"
        data-collection="CountriesCollection"
        data-readable="Negotiated Price Type"
        data-ajax="true"
        data-lookup="Name"
        data-display="Name"
        data-value="Code">
        <option></option>
        <option value="">I can’t find my country here</option>
      </select>
    </div>
    <span class="help-block m-b-none"></span>
  </div>
</div>
  <!--
<div class="form-group">
  <label class="control-label col-sm-4" for="country-field">Country</label>
  <div class="col-sm-8 autocomplete">
    <input data-autocomplete="true" autocomplete="off" data-lookup="Name" type="text" class="form-control" id="country-field" name="country">
    <i class="fa fa-search"></i>
    <span class="help-block m-b-none"></span>
  </div>
</div>
-->

<div class="form-group">
  <label class="control-label col-sm-4" for="postcode-field">Post code</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="postcode-field" name="postcode">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<button id="shipping-shipping-address-button">Other shipping address +</button>
<div class="shipping-shipping-address hidden">
  <div class="form-group">
    <label class="control-label col-sm-4" for="shipping_first_name-field">Shipping first name</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="shipping_first_name-field" name="shipping_first_name">
      <span class="help-block m-b-none"></span>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-4" for="shipping_last_name-field">Shipping last name</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="shipping_last_name-field" name="shipping_last_name">
      <span class="help-block m-b-none"></span>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-4" for="shipping_addressno-field">Shipping address No</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="shipping_addressno-field" name="shipping_addressno">
      <span class="help-block m-b-none"></span>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-4" for="shipping_street-field">Street</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="shipping_street-field" name="shipping_street">
      <span class="help-block m-b-none"></span>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-4" for="shipping_city-field">City</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="shipping_city-field" name="shipping_city">
      <span class="help-block m-b-none"></span>
    </div>
  </div>
  <div class="form-group">
  <label class="control-label col-sm-4" for="shipping_country-field">Country</label>
  <div class="col-sm-8">
    <div class="input-group col-md-12">
      <select class="form-control collection-select" id="shipping_country-field" name="shipping_country"
        data-collection="CountriesCollection"
        data-readable="Negotiated Price Type"
        data-ajax="true"
        data-lookup="Name"
        data-display="Name"
        data-value="Code">
        <option></option>
        <option value="">I can’t find my country here</option>
      </select>
    </div>
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="shipping_postcode-field">Post code</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="shipping_postcode-field" name="shipping_postcode">
    <span class="help-block m-b-none"></span>
  </div>
</div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="cardnumber-field">Card number</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="cardnumber-field" name="cardnumber">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="expirydate-field">Expiry date</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="expirydate-field" name="expirydate" placeholder="mm/yy">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group">
  <label class="control-label col-sm-4" for="cvv-field">CVV</label>
  <div class="col-sm-8">
    <input type="text" class="form-control" id="cvv-field" name="cvv" placeholder="123">
    <span class="help-block m-b-none"></span>
  </div>
</div>
<div class="form-group pull-left">
  <button type="submit" class="submit-btn btn btn-primary" disabled="disabled">Confirm &amp; Pay</button>
</div>
