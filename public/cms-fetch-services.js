(function () {
  var CMS_ORIGIN = 'https://zoorepairs-payload-cms-production.up.railway.app';
  var API = CMS_ORIGIN + '/api/landing-pages?where%5Bslug%5D%5Bequals%5D=reboot-your-computer%2Fservices&depth=0';

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function render(page) {
    if (!page) return;

    var h1 = document.getElementById('services-h1');
    var sub = document.getElementById('services-sub');
    if (page.servicesList) {
      if (h1 && page.servicesList.heading) h1.textContent = page.servicesList.heading;
      if (sub && page.servicesList.intro) sub.textContent = page.servicesList.intro;
    }

    var grid = document.getElementById('services-grid');
    if (grid && page.servicesList && page.servicesList.items && page.servicesList.items.length) {
      grid.innerHTML = page.servicesList.items
        .map(function (s) {
          var link = '';
          var titleLower = (s.title || '').toLowerCase();
          if (titleLower.indexOf('security') !== -1 || titleLower.indexOf('camera') !== -1) {
            link = '/services/cctv-security-camera-brisbane/';
          } else if (titleLower.indexOf('ethernet') !== -1 || titleLower.indexOf('data cabling') !== -1) {
            link = '/data-ethernet-installation/';
          }
          if (link) {
            return '<a href="' + link + '" class="service-card service-card-link" style="text-decoration: none; color: inherit; display: block;"><h3>' + esc(s.title) + '</h3><p>' + esc(s.description) + '</p></a>';
          } else {
            return '<div class="service-card"><h3>' + esc(s.title) + '</h3><p>' + esc(s.description) + '</p></div>';
          }
        })
        .join('');
    }

    var ctaH2 = document.getElementById('services-cta-h2');
    var ctaSub = document.getElementById('services-cta-sub');
    if (page.cta) {
      if (ctaH2 && page.cta.heading) ctaH2.textContent = page.cta.heading;
      if (ctaSub && page.cta.subheading) ctaSub.textContent = page.cta.subheading;
    }
  }

  fetch(API)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      if (data && data.docs && data.docs[0]) render(data.docs[0]);
    })
    .catch(function () {
      /* keep the static fallback content already on the page */
    });
})();

