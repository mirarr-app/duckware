// PostHog Analytics Initialization for DuckWare
!(function (t, e) {
  var o, n, p, r;
  e.__SV ||
    ((window.posthog = e),
    (e._i = []),
    (e.init = function (i, s, a) {
      function g(t, e) {
        var o = e.split('.');
        2 == o.length && ((t = t[o[0]]), (e = o[1])),
          (t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          });
      }
      var l = e;
      for (
        'undefined' != typeof a ? (l = e[a] = []) : (a = 'posthog'),
          l.people = l.people || [],
          l.toString = function () {
            var t = 'posthog';
            return 'undefined' !== a && (t += '.' + a), t;
          },
          l.toString = function (t) {
            var e = 'posthog';
            return 'undefined' !== a && (e += '.' + a), t ? e : e + ' (stub)';
          },
          l.people.toString = function () {
            return l.toString(1) + '.people (stub)';
          },
          p =
            'capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify_group opt_in_capturing_v2 opt_out_capturing_v2 setup_daily_event_properties set_config'.split(
              ' '
            ),
          r = 0;
        r < p.length;
        r++
      )
        g(l, p[r]);
      e._i.push([i, s, a]);
    }),
    (e.__SV = 1.0),
    (o = t.createElement('script')),
    (n = t.getElementsByTagName('script')[0]),
    (o.async = 1),
    (o.src =
      s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') +
      '/static/array.js'),
    (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(o, r));
})(document, window.posthog || []);

posthog.init('phc_PPhGfg5Kf5N0ZRAGHi9OPPx2roAnQjGRqBaKjAUBblR', {
  api_host: 'https://pos.parsaoo.ir',
  ui_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: true,
});
