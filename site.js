(function () {
  var form = document.getElementById("note-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      status.textContent = "Thanks. We got your note.";
      form.reset();
      status.focus();
    });
  }

  var headerMap = {
    checklist: "checklist",
    posting: "checklist",
    pay: "checklist",
    hours: "checklist",
    location: "checklist",
    market: "market",
    updates: "updates",
    feedback: "feedback"
  };

  var sections = document.querySelectorAll("[data-section]");
  var headerLinks = document.querySelectorAll(".site-nav a[data-nav]");
  var railLinks = document.querySelectorAll(".rail a[data-section-link]");

  if (!sections.length || !("IntersectionObserver" in window)) return;

  var current = "";
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      current = entry.target.getAttribute("data-section");
      var headerKey = headerMap[current] || current;
      headerLinks.forEach(function (link) {
        var on = link.getAttribute("data-nav") === headerKey;
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      railLinks.forEach(function (link) {
        var on = link.getAttribute("data-section-link") === current;
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 });

  sections.forEach(function (section) { observer.observe(section); });
})();
