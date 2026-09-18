// yt-stub.js (include before /leanback/tv-html5.js)
window.yt = window.yt || {};
window.yt.config_ = window.yt.config_ || {};

(function () {
  // Simple pubsub that supports subscribe(event, fn, opt_ctx), publish(event, ...args),
  // and unsubscribe(token) or unsubscribe(event, fn).
  function PubSub() {
    this.handlers = {}; // event -> [{fn, ctx, id}]
    this.nextId = 1;
  }

  PubSub.prototype.subscribe = function (event, fn, ctx) {
    if (!event || typeof fn !== "function") return null;
    this.handlers[event] = this.handlers[event] || [];
    var id = "t_" + (this.nextId++);
    this.handlers[event].push({ id: id, fn: fn, ctx: ctx });
    return id;
  };

  PubSub.prototype.unsubscribe = function (eventOrToken, fn) {
    // If first arg looks like a token, remove by id
    if (typeof eventOrToken === "string" && eventOrToken.indexOf("t_") === 0) {
      var token = eventOrToken;
      for (var ev in this.handlers) {
        var arr = this.handlers[ev];
        for (var i = arr.length - 1; i >= 0; --i) {
          if (arr[i].id === token) arr.splice(i, 1);
        }
      }
      return;
    }
    // Otherwise treat as unsubscribe(event, fn)
    var event = eventOrToken;
    if (!this.handlers[event]) return;
    if (!fn) {
      this.handlers[event] = [];
      return;
    }
    var list = this.handlers[event];
    for (var j = list.length - 1; j >= 0; --j) {
      if (list[j].fn === fn) list.splice(j, 1);
    }
  };

  PubSub.prototype.publish = function (event /*, ...args */) {
    var args = Array.prototype.slice.call(arguments, 1);
    var list = this.handlers[event];
    if (!list || !list.length) return;
    // copy to avoid mutation while dispatching
    list = list.slice();
    for (var i = 0; i < list.length; i++) {
      try {
        list[i].fn.apply(list[i].ctx || null, args);
      } catch (err) {
        // swallow errors in stub to avoid breaking the app; optionally log
        if (window.console) console.error("yt.pubsub handler error:", err);
      }
    }
  };

  // install into window.yt
  window.yt.pubsub = window.yt.pubsub || {};
  // some code expects an instance_ object with subscribe/publish on it
  window.yt.pubsub.instance_ = window.yt.pubsub.instance_ || new PubSub();

  // convenience top-level helpers (some code might call yt.pubsub.subscribe directly)
  window.yt.pubsub.subscribe = window.yt.pubsub.subscribe || function () {
    return window.yt.pubsub.instance_.subscribe.apply(window.yt.pubsub.instance_, arguments);
  };
  window.yt.pubsub.unsubscribe = window.yt.pubsub.unsubscribe || function () {
    return window.yt.pubsub.instance_.unsubscribe.apply(window.yt.pubsub.instance_, arguments);
  };
  window.yt.pubsub.publish = window.yt.pubsub.publish || function () {
    return window.yt.pubsub.instance_.publish.apply(window.yt.pubsub.instance_, arguments);
  };
})();
