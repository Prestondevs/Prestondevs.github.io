function toggle(btn) {
    btn.classList.toggle('open');
    var readme = btn.nextElementSibling;
    readme.classList.toggle('open');

    if (btn.classList.contains('open') && !readme.dataset.loaded) {
        var src = btn.dataset.src;
        if (src) {
            fetch(src)
                .then(function(r) { return r.text(); })
                .then(function(html) {
                    readme.innerHTML = html;
                    readme.dataset.loaded = 'true';
                });
        }
    }
}
