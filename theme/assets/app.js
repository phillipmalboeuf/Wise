(function() {
  var Backbone, Wise, _;

  window.Wise = {
    Collections: {},
    Models: {},
    Views: {},
    Routers: {},
    init: function() {
      this.nav_view = new Wise.Views.Nav();
      this.slider_views = [];
      $("[data-slider]").each((function(_this) {
        return function(index, el) {
          return _this.slider_views.push(new Wise.Views.Slider({
            el: $(el)
          }));
        };
      })(this));
      $("[data-scroll-to]").click(function(e) {
        var scroll_to;
        scroll_to = $("#" + e.currentTarget.getAttribute("data-scroll-to"));
        if (scroll_to.length > 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return scroll_to.velocity("scroll", {
            duration: 1500,
            easing: "easeOutQuart",
            offset: -50
          });
        }
      });
      return $("[data-scroll-to-text]").click(function(e) {
        var scroll_to;
        scroll_to = $("h5:contains('" + e.currentTarget.getAttribute("data-scroll-to-text") + "')");
        console.log(scroll_to);
        if (scroll_to.length > 0) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return scroll_to.velocity("scroll", {
            duration: 1500,
            easing: "easeOutQuart",
            offset: -50
          });
        }
      });
    }
  };

  Wise = window.Wise;

  _ = window._;

  Backbone = window.Backbone;

  $(function() {
    return Wise.init();
  });

}).call(this);

(function() {
  Handlebars.registerHelper('money', function(value) {
    if (value != null) {
      return "<span class=money>$" + (parseFloat(value) / 100).toFixed(2) + "</span>";
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('truncate', function(string, end) {
    if (string != null) {
      string = string.slice(0, end);
      if (string.length >= end) {
        string += "...";
      }
      return string;
    } else {
      return null;
    }
  });

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Models.Cart = (function(superClass) {
    extend(Cart, superClass);

    function Cart() {
      return Cart.__super__.constructor.apply(this, arguments);
    }

    Cart.prototype.url = "/cart.js";

    Cart.prototype.parse = function(response) {
      return response;
    };

    Cart.prototype.initialize = function() {
      return this.fetch();
    };

    Cart.prototype.add = function(id, quantity) {
      if (quantity == null) {
        quantity = 1;
      }
      return $.ajax("/cart/add.js", {
        method: "POST",
        dataType: "json",
        data: {
          quantity: quantity,
          id: parseInt(id)
        },
        success: (function(_this) {
          return function(response) {
            return _this.fetch();
          };
        })(this)
      });
    };

    Cart.prototype.change = function(id, quantity) {
      var post;
      console.log(id);
      console.log(quantity);
      return post = $.ajax("/cart/change.js", {
        method: "POST",
        dataType: "json",
        data: {
          quantity: quantity,
          id: parseInt(id)
        },
        success: (function(_this) {
          return function(response) {
            console.log(response);
            _this.set(response);
            return _this.trigger("sync");
          };
        })(this)
      });
    };

    Cart.prototype.remove = function(id) {
      return this.change(id, 0);
    };

    return Cart;

  })(Backbone.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Cart = (function(superClass) {
    extend(Cart, superClass);

    function Cart() {
      return Cart.__super__.constructor.apply(this, arguments);
    }

    Cart.prototype.el = $("#cart");

    Cart.prototype.template = templates["cart"];

    Cart.prototype.data = {};

    Cart.prototype.events = {
      "click .js-cart__button": "toggle_cart",
      "click .js-remove_from_cart": "remove_from_cart",
      "click .js-increment": "increment",
      "click .js-decrement": "decrement"
    };

    Cart.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.render);
      return this.render();
    };

    Cart.prototype.render = function() {
      _.extend(this.data, {
        model: this.model.toJSON()
      });
      this.$el.html(this.template(this.data));
      if (this.model.get("item_count") === 0) {
        this.hide_cart();
      }
      Currency.convertAll(shopCurrency, cookieCurrency);
      return this;
    };

    Cart.prototype.toggle_cart = function(e) {
      e.preventDefault();
      return this.$el.toggleClass("cart--opened");
    };

    Cart.prototype.show_cart = function() {
      return this.$el.addClass("cart--opened");
    };

    Cart.prototype.hide_cart = function() {
      return this.$el.removeClass("cart--opened");
    };

    Cart.prototype.remove_from_cart = function(e) {
      e.preventDefault();
      return Wise.cart.remove($(e.currentTarget).attr("data-id"));
    };

    Cart.prototype.increment = function(e) {
      e.preventDefault();
      return Wise.cart.change($(e.currentTarget).attr("data-id"), parseInt($(e.currentTarget).attr("data-current-quantity")) + 1);
    };

    Cart.prototype.decrement = function(e) {
      e.preventDefault();
      return Wise.cart.change($(e.currentTarget).attr("data-id"), parseInt($(e.currentTarget).attr("data-current-quantity")) - 1);
    };

    return Cart;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Collections = (function(superClass) {
    extend(Collections, superClass);

    function Collections() {
      return Collections.__super__.constructor.apply(this, arguments);
    }

    Collections.prototype.events = {};

    Collections.prototype.initialize = function() {
      return this.render();
    };

    Collections.prototype.render = function() {
      var collections;
      collections = this.$el.find(".js-collection.hide");
      if (collections.length > 0) {
        $(collections[Math.floor(Math.random() * collections.length)]).removeClass("hide");
        collections = this.$el.find(".js-collection.hide");
        $(collections[Math.floor(Math.random() * collections.length)]).removeClass("hide");
        collections = this.$el.find(".js-collection.hide");
        $(collections[Math.floor(Math.random() * collections.length)]).removeClass("hide");
      } else {
        collections = this.$el.find(".js-product").addClass("hide");
        $(collections[Math.floor(Math.random() * collections.length)]).removeClass("hide");
        collections = this.$el.find(".js-product.hide");
        $(collections[Math.floor(Math.random() * collections.length)]).removeClass("hide");
        collections = this.$el.find(".js-product.hide");
        $(collections[Math.floor(Math.random() * collections.length)]).removeClass("hide");
      }
      return this;
    };

    return Collections;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Login = (function(superClass) {
    extend(Login, superClass);

    function Login() {
      return Login.__super__.constructor.apply(this, arguments);
    }

    Login.prototype.events = {
      "click .js-recover_button": "show_recover",
      "click .js-login_button": "show_login"
    };

    Login.prototype.initialize = function() {
      return this.render();
    };

    Login.prototype.render = function() {
      return this;
    };

    Login.prototype.show_recover = function(e) {
      e.preventDefault();
      this.$el.find(".js-recover_form").removeClass("hide");
      return this.$el.find(".js-login_form").addClass("hide");
    };

    Login.prototype.show_login = function(e) {
      e.preventDefault();
      this.$el.find(".js-login_form").removeClass("hide");
      return this.$el.find(".js-recover_form").addClass("hide");
    };

    return Login;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Nav = (function(superClass) {
    extend(Nav, superClass);

    function Nav() {
      return Nav.__super__.constructor.apply(this, arguments);
    }

    Nav.prototype.el = $("#nav");

    Nav.prototype.events = {};

    Nav.prototype.initialize = function() {
      return this.render();
    };

    Nav.prototype.render = function() {
      return this;
    };

    return Nav;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Product = (function(superClass) {
    extend(Product, superClass);

    function Product() {
      return Product.__super__.constructor.apply(this, arguments);
    }

    Product.prototype.events = {
      "submit .js-add_to_cart": "add_to_cart",
      "click [name='color']": "change_color",
      "click [name='size']": "change_size",
      "click .js-extra_image": "load_extra_image",
      "click .js-toggle_details": "toggle_details"
    };

    Product.prototype.initialize = function() {
      var current;
      current = this.$el.find("[name='id']");
      this.current_color = current.attr("data-color");
      this.current_size = current.attr("data-size");
      return this.render();
    };

    Product.prototype.render = function() {
      _.each(variant_colors, (function(_this) {
        return function(color, key) {
          return _this.$el.find("[data-color='" + key + "'] + label").css("background", color);
        };
      })(this));
      return this;
    };

    Product.prototype.add_to_cart = function(e) {
      var el;
      e.preventDefault();
      el = this.$el.find("[name='id']");
      if (el.prop("type") === "hidden") {
        Wise.cart.add(this.$el.find("[name='id'][checked='checked']").val());
      } else {
        Wise.cart.add(this.$el.find("[name='id']:checked").val());
      }
      return Wise.cart_view.show_cart();
    };

    Product.prototype.change_color = function(e) {
      this.$el.find(".js-image").attr("src", $(e.currentTarget).attr("data-img"));
      this.$el.find(".js-link").attr("href", $(e.currentTarget).attr("data-url"));
      this.current_color = $(e.currentTarget).attr("data-color");
      this.$el.find(".js-color").text(this.current_color);
      return this.update_id();
    };

    Product.prototype.change_size = function(e) {
      this.current_size = $(e.currentTarget).attr("data-size");
      return this.update_id();
    };

    Product.prototype.update_id = function() {
      var id, path, success;
      this.$el.find("[name='id']").removeAttr("checked");
      if ((this.current_size != null) && this.current_size !== "") {
        id = this.$el.find("[name='id'][data-color='" + this.current_color + "'][data-size='" + this.current_size + "']");
      } else {
        id = this.$el.find("[name='id'][data-color='" + this.current_color + "']");
      }
      if (id.length > 0) {
        path = window.location.pathname + "?variant=" + id[0].value;
        Wise.router.navigate(path, {
          replace: true
        });
        return $.get(path, success = (function(_this) {
          return function(response) {
            return _this.$el.find(".js-images").html($(response).find(".js-images").html());
          };
        })(this));
      }
    };

    Product.prototype.load_extra_image = function(e) {
      e.preventDefault();
      return this.$el.find(".js-image").attr("src", $(e.currentTarget).attr("data-url"));
    };

    Product.prototype.toggle_details = function(e) {
      e.preventDefault();
      return this.$el.find(".js-details").toggleClass("hide");
    };

    return Product;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Products = (function(superClass) {
    extend(Products, superClass);

    function Products() {
      return Products.__super__.constructor.apply(this, arguments);
    }

    Products.prototype.events = {
      "click .js-next": "load_more",
      "click .js-search_button": "toggle_search"
    };

    Products.prototype.initialize = function() {
      return this.render();
    };

    Products.prototype.render = function() {
      var next;
      next = this.$el.find(".js-next");
      return this;
    };

    Products.prototype.load_more = function(e) {
      var next;
      if (e != null) {
        e.preventDefault();
      }
      next = this.$el.find(".js-next");
      return $.ajax(next.attr("href"), {
        method: "GET",
        dataType: "html",
        success: (function(_this) {
          return function(response) {
            var response_next;
            _this.$el.find(".js-products_container").append($(response).find(".js-products_container").html());
            response_next = $(response).find(".js-next");
            if (response_next.length > 0) {
              next.attr("href", response_next.attr("href"));
            } else {
              next.remove();
            }
            _this.render();
            next.blur();
            _.each(Wise.product_views, function(view) {
              return view.undelegateEvents();
            });
            Wise.product_views = [];
            return $(".js-product").each(function(index, el) {
              return Wise.product_views.push(new Wise.Views.Product({
                el: $(el)
              }));
            });
          };
        })(this)
      });
    };

    Products.prototype.toggle_search = function(e) {
      return Wise.search_view.toggle_search(e);
    };

    return Products;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Slider = (function(superClass) {
    extend(Slider, superClass);

    function Slider() {
      return Slider.__super__.constructor.apply(this, arguments);
    }

    Slider.prototype.current_slide = 0;

    Slider.prototype.events = {
      "click [data-next-slide-button]": "next_slide",
      "click [data-previous-slide-button]": "previous_slide",
      "click [data-slide-marker]": "slide_to"
    };

    Slider.prototype.initialize = function() {
      this.slides_count = this.$el.find("[data-slide]").length;
      return this.render();
    };

    Slider.prototype.render = function() {
      this.previous_slide_height = this.$el.find("[data-slide=" + this.current_slide + "] [data-slide-content]").height();
      this.$el.find("[data-slider-container]").css("height", "-=" + (this.$el.find("[data-slide=" + this.current_slide + "]").height() - this.previous_slide_height) + "px");
      return this;
    };

    Slider.prototype.next_slide = function() {
      if (this.current_slide === this.slides_count - 1) {
        return this.slide_to(null, 0);
      } else {
        return this.slide_to(null, this.current_slide + 1);
      }
    };

    Slider.prototype.previous_slide = function() {
      if (this.current_slide === 0) {
        return this.slide_to(null, this.slides_count - 1);
      } else {
        return this.slide_to(null, this.current_slide - 1);
      }
    };

    Slider.prototype.slide_to = function(e, index) {
      var slide_height;
      if (e != null) {
        index = parseInt(e.currentTarget.getAttribute("data-slide-marker"));
        e.currentTarget.blur();
      }
      this.current_slide = index;
      this.$el.find("[data-slide-marker]").removeClass("slider__marker--active");
      this.$el.find("[data-slide-marker=" + this.current_slide + "]").addClass("slider__marker--active");
      slide_height = this.$el.find("[data-slide=" + this.current_slide + "] [data-slide-content]").height();
      this.$el.find("[data-slider-container]").css("height", "-=" + (this.previous_slide_height - slide_height) + "px");
      this.previous_slide_height = slide_height;
      return this.$el.find("[data-slide]").css("transform", "translateX(-" + this.current_slide + "00%)");
    };

    return Slider;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Routers.Router = (function(superClass) {
    extend(Router, superClass);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      "(/)": "home"
    };

    Router.prototype.views = [];

    Router.prototype.initialize = function() {};

    Router.prototype.execute = function(callback, args) {
      var i, len, ref, view;
      ref = this.views;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        view.undelegateEvents();
      }
      delete this.views;
      this.views = [];
      if (callback != null) {
        return callback.apply(this, args);
      }
    };

    Router.prototype.home = function() {};

    Router.prototype.page = function() {};

    return Router;

  })(Backbone.Router);

}).call(this);
