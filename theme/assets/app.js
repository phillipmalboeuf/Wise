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
      this.credit_card_view = new Wise.Views.CreditCard();
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
      if (this.query.credit_card != null) {
        Wise.credit_card_view.show();
      } else {
        Wise.credit_card_view.hide();
      }
      if (this.query.account != null) {
        Wise.account_view.show();
      } else {
        Wise.account_view.hide();
      }
      if ($("[data-show-cart]").length > 0) {
        return this.cart_view.show();
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

  Handlebars.registerHelper('if_equal', function(left, right, options) {
    if (left === right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('if_lower', function(left, right, options) {
    if (left < right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('if_higher', function(left, right, options) {
    if (left > right) {
      return options.fn(this);
    } else {
      return null;
    }
  });

  Handlebars.registerHelper('unless_equal', function(left, right, options) {
    if (left !== right) {
      return options.fn(this);
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

    Cart.prototype.add = function(id, quantity, data) {
      if (quantity == null) {
        quantity = 1;
      }
      if (data == null) {
        data = {};
      }
      Turbolinks.controller.adapter.progressBar.setValue(0);
      Turbolinks.controller.adapter.progressBar.show();
      data["id"] = parseInt(id);
      data["quantity"] = quantity;
      return $.ajax("/cart/add.js", {
        method: "POST",
        dataType: "json",
        data: data,
        success: (function(_this) {
          return function(response) {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            return _this.fetch();
          };
        })(this)
      });
    };

    Cart.prototype.change = function(key, quantity) {
      var post;
      Turbolinks.controller.adapter.progressBar.setValue(0);
      Turbolinks.controller.adapter.progressBar.show();
      return post = $.ajax("/cart/change.js", {
        method: "POST",
        dataType: "json",
        data: {
          quantity: quantity,
          id: key
        },
        success: (function(_this) {
          return function(response) {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
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
      _.extend(this.data, {
        lang: window.lang
      });
      return this;
    };

    Login.prototype.customer_login = function(e) {
      e.preventDefault();
      Turbolinks.controller.adapter.progressBar.setValue(0);
      Turbolinks.controller.adapter.progressBar.show();
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
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              return window.location = "?account=true";
            }
          };
        })(this)
      });
    };

    Login.prototype.create_customer = function(e) {
      e.preventDefault();
      Turbolinks.controller.adapter.progressBar.setValue(0);
      Turbolinks.controller.adapter.progressBar.show();
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
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            errors = $(response).find(".errors");
            if (errors.length > 0) {
              return $(e.currentTarget).find("[data-errors]").text(errors.text());
            } else {
              $(e.currentTarget).find("[data-errors]").text("");
              return window.location = "?account=true";
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
      "click [data-show-tab]": "show_tab",
      "click [data-remove-address]": "remove_address"
    };

    Account.prototype.initialize = function() {
      return Account.__super__.initialize.call(this);
    };

    Account.prototype.render = function() {
      _.extend(this.data, {
        lang: window.lang
      });
      Account.__super__.render.call(this);
      return this;
    };

    Account.prototype.show_tab = function(e) {
      var show;
      show = e.currentTarget.getAttribute("data-show-tab");
      this.$el.find("[data-show-tab]").removeClass("overlay__link--focus");
      this.$el.find("[data-tab]").addClass("hide");
      this.$el.find("[data-tab='" + show + "']").removeClass("hide");
      return this.$el.find("[data-show-tab='" + show + "']").addClass("overlay__link--focus");
    };

    Account.prototype.logout = function(e) {
      e.preventDefault();
      return $.ajax("/account/logout", {
        method: "GET",
        success: function(response) {
          return window.location = window.location;
        }
      });
    };

    Account.prototype.remove_address = function(e) {
      e.preventDefault();
      return $.ajax("/account/addresses/" + e.currentTarget.getAttribute("data-remove-address"), {
        method: "DELETE",
        success: function(response) {
          return $(e.currentTarget).parent().parent().remove();
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
      "click [data-decrement]": "decrement",
      "submit #cart_form": "checkout"
    };

    Cart.prototype.initialize = function() {
      this.listenTo(this.model, "sync", this.render);
      $(".main").on("click", (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this));
      return this.render();
    };

    Cart.prototype.render = function() {
      _.extend(this.data, {
        model: this.model.toJSON(),
        lang: window.lang
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

    Cart.prototype.checkout = function(e) {
      var recurring_items;
      Wise.cookies["delete"]("subscription");
      recurring_items = [];
      _.each(this.model.attributes.items, (function(_this) {
        return function(item) {
          if (item.properties && _.contains(Object.keys(item.properties), "Months")) {
            return recurring_items.push(item);
          }
        };
      })(this));
      if (recurring_items.length > 0) {
        return Wise.credit_card_view.show(e, recurring_items);
      }
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

  Wise.Views.CreditCard = (function(superClass) {
    extend(CreditCard, superClass);

    function CreditCard() {
      return CreditCard.__super__.constructor.apply(this, arguments);
    }

    CreditCard.prototype.el = $("#credit_card");

    CreditCard.prototype.template = templates["credit_card"];

    CreditCard.prototype.data = {};

    CreditCard.prototype.events = {
      "click [data-hide]": "hide",
      "submit #credit_card_form": "submit"
    };

    CreditCard.prototype.items = [];

    CreditCard.prototype.initialize = function() {
      return CreditCard.__super__.initialize.call(this);
    };

    CreditCard.prototype.render = function() {
      _.extend(this.data, {
        lang: window.lang,
        items: this.items
      });
      this.$el.html(this.template(this.data));
      this.elements = stripe.elements();
      this.card = this.elements.create("card", {
        style: {
          base: {
            color: "#a98e63",
            fontSize: "16px",
            fontFamily: "Agendatype"
          },
          invalid: {
            color: "#d20000",
            iconColor: "#d20000"
          }
        }
      });
      this.card.addEventListener("change", this.card_change.bind(this));
      this.card.mount("#credit_card_input");
      CreditCard.__super__.render.call(this);
      return this;
    };

    CreditCard.prototype.card_change = function(event) {
      if (event.complete) {
        Turbolinks.controller.adapter.progressBar.setValue(0);
        Turbolinks.controller.adapter.progressBar.show();
        return stripe.createToken(this.card).then((function(_this) {
          return function(result) {
            Turbolinks.controller.adapter.progressBar.setValue(100);
            Turbolinks.controller.adapter.progressBar.hide();
            if (result.token) {
              return _this.token = result.token.id;
            }
          };
        })(this));
      }
    };

    CreditCard.prototype.submit = function(e) {
      e.preventDefault();
      if (this.token) {
        Turbolinks.controller.adapter.progressBar.setValue(0);
        Turbolinks.controller.adapter.progressBar.show();
        return $.ajax("https://shopify.destruct.codes/subscriptions", {
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            token: this.token,
            plans: _.map(this.items, function(item) {
              return {
                "plan": item.product_id + "-" + item.properties["Months"],
                "quantity": item.quantity
              };
            })
          }),
          success: (function(_this) {
            return function(response) {
              Turbolinks.controller.adapter.progressBar.setValue(100);
              Turbolinks.controller.adapter.progressBar.hide();
              Wise.cookies.set("subscription", response._id);
              if (window.lang) {
                return window.location = "/checkout?locale=" + window.lang;
              } else {
                return window.location = "/checkout";
              }
            };
          })(this)
        });
      }
    };

    CreditCard.prototype.show = function(e, items) {
      if (e != null) {
        e.preventDefault();
      }
      this.items = items;
      this.render();
      return this.$el.removeClass("fade_out");
    };

    return CreditCard;

  })(Wise.Views.Login);

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

    Newsletter.prototype.el = $("[data-newsletter]");

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
      var recurring;
      e.preventDefault();
      e.stopImmediatePropagation();
      e.currentTarget.blur();
      recurring = this.$el.find("[name='recurring'] option:selected")[0];
      if (recurring.value > 0) {
        Wise.cart.add($(e.currentTarget).attr("data-add-to-cart"), 1, {
          "properties[Recurring]": recurring.innerText,
          "properties[Months]": recurring.value
        });
      } else {
        Wise.cart.add($(e.currentTarget).attr("data-add-to-cart"));
      }
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
      if (e != null) {
        index = parseInt(e.currentTarget.getAttribute("data-slide-marker"));
        e.currentTarget.blur();
      }
      this.current_slide = index;
      this.$el.find("[data-slide-marker]").removeClass("slider__marker--active");
      this.$el.find("[data-slide-marker=" + this.current_slide + "]").addClass("slider__marker--active");
      return this.$el.find("[data-slide]").css("transform", "translateX(-" + this.current_slide + "00%)");
    };

    return Slider;

  })(Backbone.View);

}).call(this);
