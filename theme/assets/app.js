(function() {
  var Backbone, Wise, _;

  window.Wise = {
    Collections: {},
    Models: {},
    Views: {},
    Routers: {},
    views: [],
    init: function() {
      this.cart = new Wise.Models.Cart();
      this.cart_view = new Wise.Views.Cart({
        model: this.cart
      });
      this.login_view = new Wise.Views.Login();
      this.account_view = new Wise.Views.Account();
      this.newsletter_view = new Wise.Views.Newsletter();
      this.render_views();
      return document.addEventListener("turbolinks:render", this.render_views.bind(this));
    },
    render_views: function() {
      var i, len, ref, view;
      ref = this.views;
      for (i = 0, len = ref.length; i < len; i++) {
        view = ref[i];
        view.undelegateEvents();
      }
      delete this.views;
      this.views = [];
      $("[data-product-id]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Wise.Views.Product({
            el: element
          }));
        };
      })(this));
      $("[data-navigation]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Wise.Views.Nav({
            el: element
          }));
        };
      })(this));
      $("[data-slider]").each((function(_this) {
        return function(index, element) {
          return _this.views.push(new Wise.Views.Slider({
            el: element
          }));
        };
      })(this));
      this.query = Wise.helpers.get_query_string();
      if (this.query.cart != null) {
        Wise.cart_view.show();
      } else {
        Wise.cart_view.hide();
      }
      if (this.query.login != null) {
        Wise.login_view.show();
      } else {
        Wise.login_view.hide();
      }
      if (this.query.account != null) {
        return Wise.account_view.show();
      } else {
        return Wise.account_view.hide();
      }
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
  Wise.cookies = {
    set: function(name, value, expiry_days) {
      var d, expires;
      d = new Date();
      d.setTime(d.getTime() + (expiry_days * 24 * 60 * 60 * 1000));
      expires = "expires=" + d.toGMTString();
      return document.cookie = "X-" + name + "=" + value + "; " + expires + "; path=/";
    },
    set_for_a_session: function(name, value) {
      return document.cookie = "X-" + name + "=" + value + "; path=/";
    },
    get: function(name) {
      var cookie, cookies, fn, i, len, value;
      name = "X-" + name + "=";
      value = false;
      cookies = document.cookie.split(';');
      fn = function(cookie) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
          return value = cookie.substring(name.length, cookie.length);
        }
      };
      for (i = 0, len = cookies.length; i < len; i++) {
        cookie = cookies[i];
        fn(cookie);
      }
      if (!value) {
        value = null;
      }
      return value;
    },
    "delete": function(name) {
      return document.cookie = 'X-' + name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
  };

}).call(this);

(function() {
  Wise.helpers = {
    get_query_string: function() {
      var m, query_string, regex, result;
      result = {};
      query_string = location.search.slice(1);
      regex = /([^&=]+)=([^&]*)/g;
      m = null;
      while ((m = regex.exec(query_string))) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      return result;
    }
  };

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
      if (response.item_count > 0) {
        $("[data-item-count]").text(response.item_count);
      } else {
        $("[data-item-count]").text("");
      }
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
      return post = $.ajax("/cart/change.js", {
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

    Cart.prototype.remove = function(id) {
      return this.change(id, 0);
    };

    return Cart;

  })(Backbone.Model);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Login = (function(superClass) {
    extend(Login, superClass);

    function Login() {
      return Login.__super__.constructor.apply(this, arguments);
    }

    Login.prototype.el = $("#login");

    Login.prototype.data = {};

    Login.prototype.events = {
      "click [data-hide]": "hide",
      "submit #customer_login": "customer_login",
      "submit #create_customer": "create_customer",
      "click [data-submit]": "submit_form"
    };

    Login.prototype.initialize = function() {
      return this.render();
    };

    Login.prototype.render = function() {
      return this;
    };

    Login.prototype.customer_login = function(e) {
      e.preventDefault();
      return $.ajax(e.currentTarget.getAttribute("action"), {
        method: "POST",
        dataType: "html",
        data: {
          "customer[email]": e.currentTarget["customer[email]"].value,
          "customer[password]": e.currentTarget["customer[password]"].value,
          form_type: "customer_login",
          utf8: "✓"
        },
        success: (function(_this) {
          return function(response) {
            var errors;
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              return Turbolinks.visit("?account=true");
            }
          };
        })(this)
      });
    };

    Login.prototype.create_customer = function(e) {
      e.preventDefault();
      return $.ajax(e.currentTarget.getAttribute("action"), {
        method: "POST",
        data: {
          "customer[email]": e.currentTarget["customer[email]"].value,
          "customer[password]": e.currentTarget["customer[password]"].value,
          "customer[first_name]": e.currentTarget["customer[first_name]"].value,
          "customer[last_name]": e.currentTarget["customer[last_name]"].value,
          form_type: "create_customer",
          utf8: "✓"
        },
        success: (function(_this) {
          return function(response) {
            var errors;
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              return Turbolinks.visit("?account=true");
            }
          };
        })(this)
      });
    };

    Login.prototype.submit_form = function(e) {
      if (this.$el.find("#customer_login [name='customer[email]']").val() !== "") {
        return this.$el.find("#customer_login").submit();
      } else if (this.$el.find("#create_customer [name='customer[email]']").val() !== "") {
        return this.$el.find("#create_customer").submit();
      }
    };

    Login.prototype.toggle = function(e) {
      if (this.$el.hasClass("fade_out")) {
        return this.show(e);
      } else {
        return this.hide(e);
      }
    };

    Login.prototype.show = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      this.$el.removeClass("fade_out");
      return this.$el.find("#login_email").focus();
    };

    Login.prototype.hide = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.addClass("fade_out");
    };

    return Login;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Account = (function(superClass) {
    extend(Account, superClass);

    function Account() {
      return Account.__super__.constructor.apply(this, arguments);
    }

    Account.prototype.el = $("#account");

    Account.prototype.data = {};

    Account.prototype.events = {
      "click [data-hide]": "hide",
      "click [data-logout]": "logout",
      "click [data-show-tab]": "show_tab"
    };

    Account.prototype.initialize = function() {
      return Account.__super__.initialize.call(this);
    };

    Account.prototype.render = function() {
      Account.__super__.render.call(this);
      return this;
    };

    Account.prototype.show_tab = function(e) {
      var show;
      show = e.currentTarget.getAttribute("data-show-tab");
      this.$el.find("[data-tab]").addClass("fade_out");
      this.$el.find("[data-show-tab]").removeClass("overlay__link--focus");
      return setTimeout((function(_this) {
        return function() {
          _this.$el.find("[data-tab]").addClass("hide");
          _this.$el.find("[data-tab='" + show + "']").removeClass("hide");
          _this.$el.find("[data-show-tab='" + show + "']").addClass("overlay__link--focus");
          return setTimeout(function() {
            return _this.$el.find("[data-tab='" + show + "']").removeClass("fade_out");
          }, 10);
        };
      })(this), 500);
    };

    Account.prototype.logout = function(e) {
      return $.ajax("/account/logout", {
        method: "GET",
        success: function(response) {
          return Turbolinks.visit("/");
        }
      });
    };

    Account.prototype.show = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.removeClass("fade_out");
    };

    return Account;

  })(Wise.Views.Login);

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
      "click [data-remove-from-cart]": "remove_from_cart",
      "click [data-increment]": "increment",
      "click [data-decrement]": "decrement"
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
      return this;
    };

    Cart.prototype.toggle = function(e) {
      if (this.$el.hasClass("fade_out")) {
        return this.show(e);
      } else {
        return this.hide(e);
      }
    };

    Cart.prototype.show = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.removeClass("fade_out");
    };

    Cart.prototype.hide = function(e) {
      if (e != null) {
        e.preventDefault();
      }
      return this.$el.addClass("fade_out");
    };

    Cart.prototype.remove_from_cart = function(e) {
      e.preventDefault();
      return Wise.cart.remove($(e.currentTarget).attr("data-remove-from-cart"));
    };

    Cart.prototype.increment = function(e) {
      e.preventDefault();
      return Wise.cart.change($(e.currentTarget).attr("data-increment"), parseInt($(e.currentTarget).attr("data-current-quantity")) + 1);
    };

    Cart.prototype.decrement = function(e) {
      e.preventDefault();
      return Wise.cart.change($(e.currentTarget).attr("data-decrement"), parseInt($(e.currentTarget).attr("data-current-quantity")) - 1);
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

  Wise.Views.Nav = (function(superClass) {
    extend(Nav, superClass);

    function Nav() {
      return Nav.__super__.constructor.apply(this, arguments);
    }

    Nav.prototype.events = {
      "click [data-toggle-cart]": "toggle_cart",
      "click [data-toggle-login]": "toggle_login",
      "click [data-toggle-account]": "toggle_account"
    };

    Nav.prototype.initialize = function() {
      return this.render();
    };

    Nav.prototype.render = function() {
      return this;
    };

    Nav.prototype.toggle_cart = function(e) {
      e.preventDefault();
      return Wise.cart_view.toggle();
    };

    Nav.prototype.toggle_login = function(e) {
      e.preventDefault();
      return Wise.login_view.toggle();
    };

    Nav.prototype.toggle_account = function(e) {
      e.preventDefault();
      return Wise.account_view.toggle();
    };

    return Nav;

  })(Backbone.View);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Wise.Views.Newsletter = (function(superClass) {
    extend(Newsletter, superClass);

    function Newsletter() {
      return Newsletter.__super__.constructor.apply(this, arguments);
    }

    Newsletter.prototype.el = $("#newsletter");

    Newsletter.prototype.data = {};

    Newsletter.prototype.events = {
      "click [data-hide]": "hide",
      "submit [data-newsletter-form]": "signup"
    };

    Newsletter.prototype.initialize = function() {
      return Newsletter.__super__.initialize.call(this);
    };

    Newsletter.prototype.render = function() {
      var delay;
      if (Wise.cookies.get("newsletter_hidden") == null) {
        delay = this.$el.attr("data-newsletter-delay");
        if (delay !== "never") {
          setTimeout((function(_this) {
            return function() {
              return _this.show();
            };
          })(this), this.$el.attr("data-newsletter-delay") * 1000);
        }
      }
      return Newsletter.__super__.render.call(this);
    };

    Newsletter.prototype.signup = function(e) {
      e.preventDefault();
      return $.ajax("https://shopify.destruct.codes/_newsletter/signup", {
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          email: e.currentTarget["email"].value,
          shop: e.currentTarget["shop"].value
        }),
        success: (function(_this) {
          return function(response) {
            Wise.cookies.set("newsletter_hidden", true);
            return $(e.currentTarget).text(e.currentTarget.getAttribute("data-succes-text"));
          };
        })(this),
        error: (function(_this) {
          return function(response) {
            return $(e.currentTarget).find("[data-errors]").text(response.responseJSON.error);
          };
        })(this)
      });
    };

    Newsletter.prototype.hide = function(e) {
      Wise.cookies.set("newsletter_hidden", true);
      return Newsletter.__super__.hide.call(this, e);
    };

    return Newsletter;

  })(Wise.Views.Login);

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
      "click [data-add-to-cart]": "add_to_cart"
    };

    Product.prototype.initialize = function() {
      return this.render();
    };

    Product.prototype.render = function() {
      return this;
    };

    Product.prototype.add_to_cart = function(e) {
      e.preventDefault();
      Wise.cart.add($(e.currentTarget).attr("data-add-to-cart"));
      return Wise.cart_view.show();
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
      return setTimeout((function(_this) {
        return function() {
          return _this.render();
        };
      })(this), 1000);
    };

    Slider.prototype.render = function() {
      this.$el.find("[data-slider-container]").css("width", this.slides_count + "00%");
      this.$el.find("[data-slide]").css("width", (100 / this.slides_count) + "%");
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
