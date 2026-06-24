(() => {
  // ─── Random Data Pools ───────────────────────────────────────────────────────
  const DATA = {
    firstNames: ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah", "Ivan", "Julia"],
    lastNames:  ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Wilson", "Moore"],
    cities:     ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"],
    states:     ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "GA", "NC", "MI"],
    countries:  ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "India", "Japan"],
    streets:    ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd", "Elm Blvd", "Park Way", "Lake View Rd"],
    companies:  ["Acme Corp", "Globex Inc", "Initech", "Umbrella Ltd", "Stark Industries", "Wayne Enterprises"],
    domains:    ["gmail.com", "yahoo.com", "outlook.com", "example.com", "mail.com"],
    subjects:   ["Inquiry about your services", "Follow-up on my order", "Question regarding account", "General feedback"],
    messages:   [
      "Hello, I would like to get more information about your services.",
      "I am writing to inquire about the available options.",
      "Please send me more details at your earliest convenience.",
      "I have a question regarding my recent order. Could you help me?"
    ],
    usernames:  ["user", "john_doe", "alice99", "cool_user", "dev_person", "random_guy"],
    passwords:  ["P@ssw0rd123!", "Secure#2024", "MyPass!99", "Hello@World1"],
    websites:   ["https://example.com", "https://mysite.org", "https://portfolio.dev"],
    jobTitles:  ["Software Engineer", "Product Manager", "Designer", "Data Analyst", "Marketing Lead"],
  };

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // ─── Derived Random Values ────────────────────────────────────────────────────
  const randomFirst    = () => pick(DATA.firstNames);
  const randomLast     = () => pick(DATA.lastNames);
  const randomFullName = () => `${randomFirst()} ${randomLast()}`;
  const randomEmail    = () => `${pick(DATA.usernames)}${rand(10, 999)}@${pick(DATA.domains)}`;
  const randomPhone    = () => `+1${rand(200, 999)}${rand(1000000, 9999999)}`;
  const randomZip      = () => String(rand(10000, 99999));
  const randomDate     = () => {
    const y = rand(1970, 2005);
    const m = String(rand(1, 12)).padStart(2, "0");
    const d = String(rand(1, 28)).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const randomYear     = () => String(rand(1970, 2005));
  const randomAge      = () => String(rand(18, 65));
  const randomNumber   = () => String(rand(1, 9999));
  const randomString   = () => Math.random().toString(36).slice(2, 10);
  const randomUrl      = () => pick(DATA.websites);

  // ─── Keyword → Value Resolver ────────────────────────────────────────────────
  function resolveByHint(hint) {
    const h = hint.toLowerCase();

    if (/\b(full[_\s-]?name|fullname)\b/.test(h))   return randomFullName();
    if (/\bfirst[_\s-]?name\b/.test(h))              return randomFirst();
    if (/\blast[_\s-]?name\b/.test(h))               return randomLast();
    if (/\bname\b/.test(h))                           return randomFullName();

    if (/\bemail\b/.test(h))                          return randomEmail();

    if (/\b(mobile|cell|phone|tel)\b/.test(h))        return randomPhone();

    if (/\b(street|address[_\s]?1|addr)\b/.test(h))  return `${rand(1, 9999)} ${pick(DATA.streets)}`;
    if (/\b(address[_\s]?2|apt|suite|unit)\b/.test(h)) return `Apt ${rand(1, 200)}`;
    if (/\baddress\b/.test(h))                        return `${rand(1, 9999)} ${pick(DATA.streets)}`;

    if (/\bcity\b/.test(h))                           return pick(DATA.cities);
    if (/\b(state|province|region)\b/.test(h))        return pick(DATA.states);
    if (/\b(country|nation)\b/.test(h))               return pick(DATA.countries);
    if (/\b(zip|postal|pincode|post[_\s-]?code)\b/.test(h)) return randomZip();

    if (/\b(dob|birth[_\s-]?date|birthday|date[_\s-]?of[_\s-]?birth)\b/.test(h)) return randomDate();
    if (/\b(date)\b/.test(h))                         return randomDate();
    if (/\b(year|birth[_\s-]?year)\b/.test(h))       return randomYear();
    if (/\bage\b/.test(h))                            return randomAge();

    if (/\b(username|user[_\s-]?id|login|handle)\b/.test(h)) return `${pick(DATA.usernames)}${rand(10, 99)}`;
    if (/\b(password|pass|pwd)\b/.test(h))            return pick(DATA.passwords);

    if (/\b(company|organization|org|employer|firm)\b/.test(h)) return pick(DATA.companies);
    if (/\b(job[_\s-]?title|position|role|designation)\b/.test(h)) return pick(DATA.jobTitles);

    if (/\b(website|url|link|homepage)\b/.test(h))    return randomUrl();

    if (/\b(subject|title|topic|heading)\b/.test(h))  return pick(DATA.subjects);
    if (/\b(message|comment|feedback|description|bio|about|note|notes|details|remark)\b/.test(h)) return pick(DATA.messages);

    if (/\b(search|query|keyword|find)\b/.test(h))    return "test search query";

    return null;
  }

  // ─── Type-based Fallback ─────────────────────────────────────────────────────
  function resolveByType(type) {
    switch (type) {
      case "email":    return randomEmail();
      case "tel":      return randomPhone();
      case "url":      return randomUrl();
      case "number":   return randomNumber();
      case "date":     return randomDate();
      case "month":    return `${rand(2000, 2025)}-${String(rand(1, 12)).padStart(2, "0")}`;
      case "week":     return `${rand(2020, 2025)}-W${String(rand(1, 52)).padStart(2, "0")}`;
      case "time":     return `${String(rand(0, 23)).padStart(2, "0")}:${String(rand(0, 59)).padStart(2, "0")}`;
      case "range":    return String(rand(1, 100));
      case "color":    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
      case "password": return pick(DATA.passwords);
      case "search":   return "test query";
      default:         return randomString();
    }
  }

  // ─── Trigger Native React / Vue / Angular Change Detection ───────────────────
  function nativeInputTrigger(el, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      el.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype,
      "value"
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(el, value);
    } else {
      el.value = value;
    }
    el.dispatchEvent(new Event("input",  { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.dispatchEvent(new Event("blur",   { bubbles: true }));
  }

  // ─── Fill a Single <input> ───────────────────────────────────────────────────
  function fillInput(el) {
    const type = (el.type || "text").toLowerCase();

    // Skip submit / button / hidden / file / reset / image / checkbox / radio
    if (["submit", "button", "hidden", "file", "reset", "image"].includes(type)) return;

    if (type === "checkbox") {
      if (!el.checked) {
        el.checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }
      return;
    }

    if (type === "radio") {
      if (!el.checked) {
        el.checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      }
      return;
    }

    // Build hint from multiple sources
    const hint = [
      el.placeholder,
      el.name,
      el.id,
      el.getAttribute("aria-label"),
      el.getAttribute("data-placeholder"),
      el.closest("label")?.textContent,
      el.labels?.[0]?.textContent
    ]
      .filter(Boolean)
      .join(" ");

    const value = resolveByHint(hint) || resolveByType(type);
    nativeInputTrigger(el, value);
  }

  // ─── Fill a <textarea> ───────────────────────────────────────────────────────
  function fillTextarea(el) {
    const hint = [
      el.placeholder,
      el.name,
      el.id,
      el.getAttribute("aria-label"),
      el.closest("label")?.textContent,
      el.labels?.[0]?.textContent
    ]
      .filter(Boolean)
      .join(" ");

    const value = resolveByHint(hint) || pick(DATA.messages);
    nativeInputTrigger(el, value);
  }

  // ─── Fill a <select> ────────────────────────────────────────────────────────
  function fillSelect(el) {
    const options = Array.from(el.options).filter((o) => o.value && o.value !== "");
    if (!options.length) return;
    const chosen = pick(options);
    el.value = chosen.value;
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // ─── Main Fill Routine ───────────────────────────────────────────────────────
  function fillAllForms() {
    let count = 0;

    document.querySelectorAll("input:not([disabled]):not([readonly])").forEach((el) => {
      fillInput(el);
      count++;
    });

    document.querySelectorAll("textarea:not([disabled]):not([readonly])").forEach((el) => {
      fillTextarea(el);
      count++;
    });

    document.querySelectorAll("select:not([disabled])").forEach((el) => {
      fillSelect(el);
      count++;
    });

    showToast(count);
  }

  // ─── Toast Notification ──────────────────────────────────────────────────────
  function showToast(count) {
    const existing = document.getElementById("__fill_forms_toast__");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "__fill_forms_toast__";
    toast.textContent = count > 0
      ? `✅ Fill the Forms: ${count} field${count !== 1 ? "s" : ""} filled`
      : `ℹ️ Fill the Forms: No fillable fields found`;

    Object.assign(toast.style, {
      position:        "fixed",
      bottom:          "24px",
      right:           "24px",
      zIndex:          "2147483647",
      background:      count > 0 ? "#1a1a2e" : "#3a3a4e",
      color:           "#ffffff",
      padding:         "12px 20px",
      borderRadius:    "10px",
      fontSize:        "14px",
      fontFamily:      "system-ui, sans-serif",
      fontWeight:      "500",
      boxShadow:       "0 4px 20px rgba(0,0,0,0.35)",
      border:          "1px solid rgba(255,255,255,0.12)",
      transition:      "opacity 0.4s ease",
      opacity:         "1",
      pointerEvents:   "none",
      letterSpacing:   "0.02em",
    });

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ─── Message Listener ────────────────────────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.action === "fillForms") {
      fillAllForms();
      sendResponse({ success: true });
    }
    return true;
  });
})();
