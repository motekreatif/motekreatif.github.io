/* =========================================================
   Brand Questionnaire - page-only JS
   - Required validation UI
   - "Other" reveal
   - Conditional blocks
   - Max checkbox limiter
   - POST to Google Apps Script (Google Sheet)
   ========================================================= */

   (function () {
    const form = document.getElementById("brandProjectForm");
    if (!form) return;
  
    // >>> GANTI INI dengan URL Web App Apps Script kamu <<<
    const SHEET_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE";
  
    const hint = document.getElementById("bqHint");
    const btn = document.getElementById("bqSubmit");
  
    // meta
    const ts = new Date().toISOString();
    const tsEl = document.getElementById("meta_timestamp");
    const uaEl = document.getElementById("meta_userAgent");
    if (tsEl) tsEl.value = ts;
    if (uaEl) uaEl.value = navigator.userAgent || "";
  
    // helper: show/hide "other" inputs
    const otherInputs = form.querySelectorAll("[data-other-checkbox], [data-other-radio]");
    otherInputs.forEach((el) => {
      const isRadio = el.hasAttribute("data-other-radio");
      const otherName = isRadio ? el.getAttribute("data-other-radio") : el.getAttribute("data-other-checkbox");
      const otherField = form.querySelector(`[name="${otherName}"]`);
      if (!otherField) return;
  
      const toggleOther = () => {
        if (isRadio) {
          const group = el.name;
          const checked = form.querySelector(`input[name="${group}"]:checked`);
          const show = checked && checked === el;
          otherField.style.display = show ? "block" : "none";
          if (!show) otherField.value = "";
        } else {
          const show = el.checked;
          otherField.style.display = show ? "block" : "none";
          if (!show) otherField.value = "";
        }
      };
  
      el.addEventListener("change", toggleOther);
      toggleOther();
    });
  
    // Conditional blocks (e.g. naming)
    const conditionalBlocks = form.querySelectorAll(".bq-conditional[data-condition]");
    const evaluateConditions = () => {
      conditionalBlocks.forEach((block) => {
        const cond = block.getAttribute("data-condition") || "";
        // format: fieldName:Value
        const [field, value] = cond.split(":");
        if (!field || !value) return;
  
        const chosen = form.querySelector(`input[name="${field}"]:checked`);
        const show = chosen && chosen.value === value;
  
        block.style.display = show ? "block" : "none";
        // If hidden, clear inputs inside
        if (!show) {
          block.querySelectorAll("input, textarea, select").forEach((inp) => {
            if (inp.type === "checkbox" || inp.type === "radio") inp.checked = false;
            else inp.value = "";
          });
        }
      });
    };
    form.addEventListener("change", evaluateConditions);
    evaluateConditions();
  
    // Max checkbox limiter
    const maxGroups = form.querySelectorAll("[data-max-check]");
    maxGroups.forEach((wrap) => {
      const max = parseInt(wrap.getAttribute("data-max-check") || "0", 10);
      if (!max) return;
      const boxes = Array.from(wrap.querySelectorAll('input[type="checkbox"]'));
      wrap.addEventListener("change", () => {
        const checked = boxes.filter((b) => b.checked);
        if (checked.length <= max) return;
        // uncheck the last toggled one
        const last = boxes.find((b) => b === document.activeElement);
        if (last) last.checked = false;
        // fallback: uncheck last in list
        else checked[checked.length - 1].checked = false;
        if (hint) hint.textContent = `Maksimal ${max} pilihan untuk bagian ini.`;
        setTimeout(() => { if (hint) hint.textContent = ""; }, 2200);
      });
    });
  
    // Simple required validation UI
    const markValidity = (field) => {
      const host = field.closest(".bq-field") || field.closest(".bq-fieldset");
      if (!host) return;
  
      // clear
      host.classList.remove("bq-invalid");
  
      // validity checks
      if (field.type === "radio") {
        const group = field.name;
        const any = form.querySelector(`input[name="${group}"]:checked`);
        if (!any) host.classList.add("bq-invalid");
        return;
      }
  
      if (field.hasAttribute("required")) {
        const ok = field.value && field.value.toString().trim().length > 0;
        if (!ok) host.classList.add("bq-invalid");
      }
    };
  
    // On blur: mark invalid
    form.querySelectorAll("input, textarea, select").forEach((el) => {
      el.addEventListener("blur", () => markValidity(el), true);
    });
  
    const validateAll = () => {
      let ok = true;
  
      // inputs/textarea required
      const reqFields = Array.from(form.querySelectorAll("input[required], textarea[required], select[required]"));
      reqFields.forEach((f) => {
        if (f.type === "radio") {
          const group = f.name;
          const host = f.closest(".bq-fieldset");
          const any = form.querySelector(`input[name="${group}"]:checked`);
          if (!any) {
            ok = false;
            if (host) host.classList.add("bq-invalid");
          } else if (host) host.classList.remove("bq-invalid");
        } else {
          const host = f.closest(".bq-field");
          const good = f.value && f.value.toString().trim().length > 0;
          if (!good) {
            ok = false;
            if (host) host.classList.add("bq-invalid");
          } else if (host) host.classList.remove("bq-invalid");
        }
      });
  
      return ok;
    };
  
    // Serialize form data (include multi-checkbox as comma list)
    const toPayload = () => {
      const fd = new FormData(form);
      const obj = {};
  
      // collect keys and handle duplicates
      for (const [k, v] of fd.entries()) {
        if (obj[k] === undefined) obj[k] = v;
        else if (Array.isArray(obj[k])) obj[k].push(v);
        else obj[k] = [obj[k], v];
      }
  
      // normalize arrays to comma-separated
      Object.keys(obj).forEach((k) => {
        if (Array.isArray(obj[k])) obj[k] = obj[k].join(", ");
      });
  
      // add server-friendly sheetName (optional)
      obj.meta_form = "Kickoff Brand Project";
      return obj;
    };
  
    // Submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (hint) hint.textContent = "";
  
      const ok = validateAll();
      if (!ok) {
        if (hint) hint.textContent = "Masih ada field wajib yang belum diisi. Cek yang berwarna merah.";
        const firstInvalid = form.querySelector(".bq-invalid");
        if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
  
      if (!SHEET_ENDPOINT || SHEET_ENDPOINT.includes("PASTE_YOUR")) {
        if (hint) hint.textContent = "Endpoint Google Sheet belum di-set. Tempel URL Web App Apps Script di brand-questionnaire.js";
        return;
      }
  
      const payload = toPayload();
  
      if (btn) btn.disabled = true;
      if (hint) hint.textContent = "Mengirim jawaban...";
  
      fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
        keepalive: true,
      })
        .then(() => {
          if (hint) hint.textContent = "Terkirim ✅ Terima kasih! Kami akan gunakan ini untuk kickoff meeting.";
          form.reset();
          evaluateConditions();
          // hide all "other" inputs after reset
          form.querySelectorAll(".bq-input--other").forEach((i) => (i.style.display = "none"));
          // refresh meta timestamp
          if (tsEl) tsEl.value = new Date().toISOString();
        })
        .catch(() => {
          if (hint) hint.textContent = "Gagal mengirim. Coba lagi atau kirim via WA.";
        })
        .finally(() => {
          if (btn) btn.disabled = false;
          // clear hint later (optional)
          setTimeout(() => { if (hint) hint.textContent = ""; }, 5000);
        });
    });
  })();