/*
 * mirk.js — runtime for the mirk UI kit (https://github.com/davidmiranda/mirk-ui-kit)
 * Pure native APIs, no dependencies. Safe to include twice.
 * Drop this script in once at the bottom of your page.
 */
(function () {
  if (window.__mirk_init) return;
  window.__mirk_init = true;

  function init() {
    // Number stepper — custom ▲▼ buttons fire stepUp / stepDown on the input.
    document.querySelectorAll('[data-number] [data-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('[data-number]').querySelector('input[type=number]');
        if (btn.dataset.step === 'up') input.stepUp(); else input.stepDown();
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

    // Slider — mirror the native range value into a --value CSS var on the wrapper.
    document.querySelectorAll('[data-slider]').forEach(wrapper => {
      const input = wrapper.querySelector('[data-slider-input]');
      if (!input) return;
      const update = () => wrapper.style.setProperty('--value', `${input.value}%`);
      input.addEventListener('input', update);
      update();
    });

    // File picker — display the chosen filename next to / inside the button.
    document.querySelectorAll('[data-file-picker]').forEach(picker => {
      const input = picker.querySelector('[data-file-input]');
      const display = picker.querySelector('[data-filename]');
      if (!input || !display) return;
      input.addEventListener('change', () => {
        if (input.files.length > 0) {
          display.textContent = input.files[0].name;
          display.classList.remove('text-[var(--placeholder-color)]');
          display.classList.add('text-[var(--bevel-fg)]');
        } else {
          display.textContent = 'No file chosen';
          display.classList.remove('text-[var(--bevel-fg)]');
          display.classList.add('text-[var(--placeholder-color)]');
        }
      });
    });

    // Image input — FileReader thumbnail preview.
    document.querySelectorAll('[data-image-picker]').forEach(picker => {
      const input = picker.querySelector('[data-image-input]');
      const preview = picker.querySelector('[data-image-preview]');
      const placeholder = picker.querySelector('[data-image-placeholder]');
      if (!input || !preview) return;
      input.addEventListener('change', () => {
        if (input.files.length > 0) {
          const reader = new FileReader();
          reader.onload = e => {
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
          };
          reader.readAsDataURL(input.files[0]);
        }
      });
    });

    // Auto-add a copy button to any [data-copy] element that doesn't have one.
    // Lets showcase pages mark a section copyable with no per-instance markup.
    document.querySelectorAll('[data-copy]').forEach(el => {
      if (el.querySelector('[data-copy-btn]')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.copyBtn = '';
      btn.className = 'text-[10px] uppercase tracking-[0.2em] self-start mt-2 opacity-60 hover:opacity-100 data-[copied]:opacity-100 cursor-pointer';
      btn.textContent = 'copy';
      el.appendChild(btn);
    });

    // Tags — Enter or comma adds, Backspace on empty removes last, × removes chip.
    document.querySelectorAll('[data-tags]').forEach(tags => {
      const input = tags.querySelector('[data-tag-input]');
      const variant = tags.dataset.tagsVariant || 'rect';
      if (!input) return;

      const makeChip = (value) => {
        const chip = document.createElement('span');
        if (variant === 'round') {
          chip.className = 'inline-flex items-center p-[2px] rounded-[12px] bg-gradient-to-t from-[var(--bevel-br)] to-[var(--bevel-tl)] text-[14px] leading-normal';
          const inner = document.createElement('span');
          inner.className = 'inline-flex items-center gap-2 pl-3 pr-2 py-[1px] bg-[var(--bevel-bg)] text-[var(--bevel-fg)] rounded-[10px] bg-gradient-to-t from-[var(--bevel-bg)] to-[var(--pill-inner-top)]';
          const text = document.createElement('span');
          text.textContent = value;
          const hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.name = 'tags[]';
          hidden.value = value;
          const close = document.createElement('button');
          close.type = 'button';
          close.dataset.tagRemove = '';
          close.className = 'cursor-pointer hover:text-[var(--destructive)] text-[14px] leading-none';
          close.textContent = '×';
          inner.append(text, hidden, close);
          chip.append(inner);
        } else {
          chip.className = 'inline-flex items-center gap-2 pl-3 pr-2 py-[2px] border-[2px] border-t-[var(--bevel-tl)] border-r-[var(--bevel-br)] border-b-[var(--bevel-br)] border-l-[var(--bevel-tl)] bg-[var(--bevel-bg)] text-[var(--bevel-fg)] text-[14px] leading-normal';
          const text = document.createElement('span');
          text.textContent = value;
          const hidden = document.createElement('input');
          hidden.type = 'hidden';
          hidden.name = 'tags[]';
          hidden.value = value;
          const close = document.createElement('button');
          close.type = 'button';
          close.dataset.tagRemove = '';
          close.className = 'cursor-pointer hover:text-[var(--destructive)] text-[14px] leading-none';
          close.textContent = '×';
          chip.append(text, hidden, close);
        }
        return chip;
      };

      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ',') {
          const value = input.value.trim();
          if (value) {
            e.preventDefault();
            tags.insertBefore(makeChip(value), input);
            input.value = '';
          }
        } else if (e.key === 'Backspace' && !input.value) {
          const chips = tags.querySelectorAll(':scope > span');
          if (chips.length) chips[chips.length - 1].remove();
        }
      });

      tags.addEventListener('click', e => {
        const remove = e.target.closest('[data-tag-remove]');
        if (remove) {
          let walker = remove.closest('span');
          while (walker && walker.parentElement !== tags) walker = walker.parentElement;
          if (walker) walker.remove();
          return;
        }
        if (e.target === tags) input.focus();
      });
    });
  }

  // Copy button — delegated so dynamically-added buttons work too.
  // [data-copy]              copies innerHTML (default — component markup).
  // [data-copy="text"]       copies textContent (for <pre>/<code> blocks
  //                          whose displayed source contains HTML that must
  //                          paste as raw characters, not re-escaped entities).
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy-btn]');
    if (!btn) return;
    const copyable = btn.closest('[data-copy]');
    if (!copyable) return;

    const clone = copyable.cloneNode(true);
    clone.querySelectorAll('[data-copy-btn]').forEach(b => b.remove());

    const mode = copyable.getAttribute('data-copy');
    const payload = mode === 'text'
      ? clone.textContent.replace(/^\s+|\s+$/g, '')
      : clone.innerHTML
          .replace(/\s+data-copy(="[^"]*")?/g, '')
          .replace(/^\s*\n/gm, '')
          .trim();

    navigator.clipboard.writeText(payload).then(() => {
      const original = btn.textContent;
      btn.textContent = 'copied';
      btn.dataset.copied = '';
      setTimeout(() => {
        btn.textContent = original;
        delete btn.dataset.copied;
      }, 1200);
    }).catch(() => {
      btn.textContent = 'error';
      setTimeout(() => { btn.textContent = 'copy'; }, 1200);
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
