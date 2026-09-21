(function () {
  var CMS_ORIGIN = 'https://zoorepairs-payload-cms-production.up.railway.app';
  var API = CMS_ORIGIN + '/api/landing-pages?where%5Bslug%5D%5Bequals%5D=reboot-your-computer%2Fdata-ethernet-installation&depth=1';

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : String(s);
    return d.innerHTML;
  }

  function iconUrl(icon) {
    if (!icon || !icon.url) return null;
    return icon.url.indexOf('http') === 0 ? icon.url : CMS_ORIGIN + icon.url;
  }

  function render(page) {
    if (!page) return;

    if (page.hero) {
      var eyebrow = document.getElementById('de-eyebrow');
      var h1 = document.getElementById('de-h1');
      var highlight = document.getElementById('de-highlight');
      var sub = document.getElementById('de-sub');
      var cta = document.getElementById('de-cta');
      if (eyebrow && page.hero.eyebrow) eyebrow.textContent = page.hero.eyebrow;
      if (h1 && page.hero.headline) h1.childNodes[0].textContent = page.hero.headline + ' ';
      if (highlight && page.hero.highlightedText) highlight.textContent = page.hero.highlightedText;
      if (sub && page.hero.subheading) sub.textContent = page.hero.subheading;
      if (cta && page.hero.ctaText) cta.textContent = page.hero.ctaText;
    }

    if (page.infoSection) {
      var infoH = document.getElementById('de-info-heading');
      var infoB = document.getElementById('de-info-body');
      if (infoH && page.infoSection.heading) infoH.textContent = page.infoSection.heading;
      if (infoB && page.infoSection.body) infoB.textContent = page.infoSection.body;
    }

    if (page.comparisonTable) {
      var compH = document.getElementById('de-comparison-heading');
      if (compH && page.comparisonTable.heading) compH.textContent = page.comparisonTable.heading;
      var rows = document.getElementById('de-comparison-rows');
      if (rows && page.comparisonTable.rows) {
        rows.innerHTML = page.comparisonTable.rows
          .map(function (r) {
            return '<tr><td>' + esc(r.feature) + '</td><td class="good">' + esc(r.goodOption) + '</td><td class="bad">' + esc(r.badOption) + '</td></tr>';
          })
          .join('');
      }
    }

    var projectsGrid = document.getElementById('de-projects-grid');
    if (projectsGrid && page.projects) {
      projectsGrid.innerHTML = page.projects
        .map(function (p) {
          var url = iconUrl(p.icon);
          var img = url ? '<img class="service-icon" src="' + esc(url) + '" alt="' + esc(p.title) + '" loading="lazy">' : '';
          return '<div class="service-card">' + img + '<h3>' + esc(p.title) + '</h3><p>' + esc(p.description) + '</p></div>';
        })
        .join('');
    }

    var trustGrid = document.getElementById('de-trust-grid');
    if (trustGrid && page.trustFeatures) {
      trustGrid.innerHTML = page.trustFeatures
        .map(function (f) {
          return '<div class="why-us-item"><h3>' + esc(f.title) + '</h3><p>' + esc(f.description) + '</p></div>';
        })
        .join('');
    }

    var faqWrap = document.getElementById('de-faqs');
    if (faqWrap && page.faqs) {
      faqWrap.innerHTML = page.faqs
        .map(function (f) {
          return '<div class="faq-item"><h3>' + esc(f.question) + '</h3><p>' + esc(f.answer) + '</p></div>';
        })
        .join('');
    }

    var ctaH = document.getElementById('de-cta-heading');
    var ctaS = document.getElementById('de-cta-sub');
    if (page.cta) {
      if (ctaH && page.cta.heading) ctaH.textContent = page.cta.heading;
      if (ctaS && page.cta.subheading) ctaS.textContent = page.cta.subheading;
    }

    var select = document.getElementById('de-service');
    if (select && page.contactForm && page.contactForm.serviceOptions && page.contactForm.serviceOptions.length) {
      var current = select.value;
      var options = '<option value="" disabled' + (current ? '' : ' selected') + '>Choose an option</option>';
      options += page.contactForm.serviceOptions
        .map(function (o) {
          return '<option value="' + esc(o.label) + '">' + esc(o.label) + '</option>';
        })
        .join('');
      select.innerHTML = options;
      if (current) select.value = current;
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
