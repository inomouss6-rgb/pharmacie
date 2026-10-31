/**
 * VitalGLP Vivami Pro 2.0 - Core Theme Engine
 * Connects Shopify Online Store 2.0 AJAX Cart, Bundle Pricing, and Live UI
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Live Flash Sale Countdown
  initFlashSaleCountdowns();

  // 2. Interactive Bundle Tier Buttons
  initBundleTierSelectors();

  // 3. Transformation Gallery Filtering
  initTransformationFilters();

  // 4. Shopify AJAX Cart Drawer Handling
  initCartDrawer();
});

/* Flash Sale Countdown (Ticks down seconds realistically) */
function initFlashSaleCountdowns() {
  var timers = document.querySelectorAll('.flash-sale-timer-wrap');
  if (!timers.length) return;

  var totalSeconds = 14 * 60 + 38; // 14 mins 38 seconds start

  setInterval(function () {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 15 * 60; // reset
    }

    var mins = Math.floor(totalSeconds / 60);
    var secs = totalSeconds % 60;
    var formatted = (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;

    timers.forEach(function (el) {
      var display = el.querySelector('.flash-sale-display');
      if (display) {
        display.textContent = formatted;
      }
    });
  }, 1000);
}

/* Bundle Tier Selectors (1, 2, or 5 boxes with quantity adjustment) */
function initBundleTierSelectors() {
  document.querySelectorAll('.product-bundle-card, #MainProductForm').forEach(function (container) {
    var tierButtons = container.querySelectorAll('.bundle-tier-btn');
    var qtyInput = container.querySelector('.bundle-quantity-input');

    tierButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tierButtons.forEach(function (b) {
          b.classList.remove('active-tier', 'border-emerald-600', 'bg-emerald-50/70', 'ring-2', 'ring-emerald-600/20');
        });

        btn.classList.add('active-tier', 'border-emerald-600', 'bg-emerald-50/70', 'ring-2', 'ring-emerald-600/20');

        var qty = btn.getAttribute('data-qty') || '1';
        if (qtyInput) {
          qtyInput.value = qty;
        }
      });
    });
  });
}

/* Transformation Gallery Filter (11 cases: all, wegovy, mounjaro, zepbound) */
function initTransformationFilters() {
  var filterContainer = document.getElementById('TransformationFilters');
  var grid = document.getElementById('TransformationsGrid');
  if (!filterContainer || !grid) return;

  var buttons = filterContainer.querySelectorAll('.filter-tab');
  var cards = grid.querySelectorAll('.case-card');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var category = btn.getAttribute('data-filter');

      buttons.forEach(function (b) {
        b.classList.remove('bg-slate-900', 'text-white', 'shadow-sm', 'active');
        b.classList.add('text-slate-700', 'hover:bg-slate-100');
      });

      btn.classList.add('bg-slate-900', 'text-white', 'shadow-sm', 'active');
      btn.classList.remove('text-slate-700', 'hover:bg-slate-100');

      cards.forEach(function (card) {
        var cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Shopify Cart Drawer AJAX handling */
function initCartDrawer() {
  var drawer = document.getElementById('CartDrawer');
  var drawerContent = document.getElementById('CartDrawerContent');
  var openBtn = document.getElementById('OpenCartDrawerBtn');
  var closeBtn = document.getElementById('CloseCartDrawer');
  var overlay = document.getElementById('CartDrawerOverlay');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
    drawerContent.classList.remove('translate-x-full');
    fetchAndRenderCart();
  }

  function closeDrawer() {
    drawer.classList.add('opacity-0', 'invisible', 'pointer-events-none');
    drawerContent.classList.add('translate-x-full');
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Intercept all Shopify Add To Cart Forms to submit via AJAX and open drawer
  document.querySelectorAll('form[action="/cart/add"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('.add-to-cart-ajax-btn');
      var originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>⏳ Ajout en cours...</span>';
        submitBtn.disabled = true;
      }

      var formData = new FormData(form);

      fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      })
        .then(function (res) {
          return res.json();
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
          }
          openDrawer();
        })
        .catch(function (err) {
          console.error('Error adding to cart:', err);
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
          }
          // Fallback to native submission if running in demo or if fetch fails
          form.submit();
        });
    });
  });
}

/* Fetch cart state from Shopify /cart.js and render into Drawer */
function fetchAndRenderCart() {
  fetch('/cart.js')
    .then(function (res) {
      return res.json();
    })
    .then(function (cart) {
      updateCartUI(cart);
    })
    .catch(function (e) {
      console.warn('Shopify /cart.js call simulated or unavailable in preview environment');
    });
}

function updateCartUI(cart) {
  var countBadge = document.getElementById('HeaderCartBadge');
  if (countBadge) countBadge.textContent = cart.item_count || 0;

  var subtotalEl = document.getElementById('CartDrawerSubtotal');
  if (subtotalEl) {
    var formattedPrice = (cart.total_price / 100).toFixed(2).replace('.', ',') + ' €';
    subtotalEl.textContent = formattedPrice;
  }

  var itemsContainer = document.getElementById('CartDrawerItems');
  var emptyState = document.getElementById('CartEmptyState');

  if (!itemsContainer) return;

  if (!cart.items || cart.items.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  var html = '';
  cart.items.forEach(function (item) {
    var itemPrice = (item.final_line_price / 100).toFixed(2).replace('.', ',') + ' €';
    html +=
      '<div class="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">' +
      '<img src="' +
      (item.image || '') +
      '" class="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-100" alt="' +
      item.title +
      '">' +
      '<div class="flex-1 min-w-0">' +
      '<h4 class="font-extrabold text-xs text-slate-900 truncate">' +
      item.product_title +
      '</h4>' +
      '<p class="text-[10px] text-slate-500">' +
      (item.variant_title || '') +
      ' &bull; Qté: ' +
      item.quantity +
      '</p>' +
      '</div>' +
      '<div class="font-black text-xs text-slate-900">' +
      itemPrice +
      '</div>' +
      '</div>';
  });

  itemsContainer.innerHTML = html;
}
