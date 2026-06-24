# Fill the Forms — Chrome Extension

A Chrome Extension (Manifest V3) that intelligently fills all form fields on any web page with a single right-click.

---

## Features

- **Right-click → "Fill the Forms"** — available on any page or frame
- **Smart placeholder detection** — reads `placeholder`, `name`, `id`, `aria-label`, and `<label>` text to pick contextually appropriate data
- **Covers 20+ field types** — name, email, phone, address, city, state, zip, country, DOB, username, password, company, job title, website, subject, message, and more
- **Type-based fallback** — if no hint is found, uses the HTML `type` attribute (`email`, `tel`, `date`, `url`, `number`, `color`, etc.)
- **Framework-compatible** — fires `input`, `change`, and `blur` events so React, Vue, and Angular apps pick up the changes
- **Fills all form elements** — `<input>`, `<textarea>`, `<select>`, checkboxes, and radio buttons
- **Toast notification** — a non-intrusive toast confirms how many fields were filled
- **No external dependencies** — pure vanilla JS, zero npm packages

---

## File Structure

```
Fill_The_Forms/
├── manifest.json      # Manifest V3 config
├── background.js      # Service worker — registers context menu, relays messages
├── content.js         # Core logic — finds and fills form fields
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked**
5. Select the `Fill_The_Forms` folder
6. The extension is now installed

---

## Usage

1. Navigate to any webpage that has a form
2. **Right-click** anywhere on the page
3. Select **"Fill the Forms"** from the context menu
4. All fillable fields will be populated instantly
5. A toast notification at the bottom-right confirms how many fields were filled

---

## Smart Field Detection

The extension resolves field values by scanning multiple hint sources in priority order:

| Source | Example |
|--------|---------|
| `placeholder` | `placeholder="Enter your email"` |
| `name` attribute | `name="phone_number"` |
| `id` attribute | `id="first-name"` |
| `aria-label` | `aria-label="Date of Birth"` |
| Associated `<label>` text | `<label for="city">City</label>` |

### Supported Keywords → Generated Data

| Keyword match | Data generated |
|---|---|
| `name`, `full name` | Random full name (e.g. *Alice Johnson*) |
| `first name` | Random first name |
| `last name` | Random last name |
| `email` | Random email (e.g. *user42@gmail.com*) |
| `phone`, `mobile`, `tel` | Random US phone number |
| `address`, `street` | Random street address |
| `city` | Random US city |
| `state`, `province` | Random state abbreviation |
| `country` | Random country name |
| `zip`, `postal`, `pincode` | Random 5-digit ZIP |
| `dob`, `birth date`, `date of birth` | Random date (1970–2005) |
| `age` | Random age (18–65) |
| `username`, `user id` | Random username + number |
| `password` | Strong random password |
| `company`, `organization` | Random company name |
| `job title`, `position`, `role` | Random job title |
| `website`, `url` | Sample website URL |
| `subject`, `title` | Sample subject line |
| `message`, `comment`, `bio`, `description` | Sample message text |

---

## Permissions

| Permission | Reason |
|---|---|
| `contextMenus` | Register the right-click "Fill the Forms" menu item |
| `activeTab` | Access the current tab's DOM to fill form fields |
| `scripting` | Inject content script on-the-fly on pages where it wasn't pre-loaded |

---

## Contributing

Pull requests are welcome. To suggest new field keyword mappings or data pools, edit the `DATA` object and `resolveByHint()` function in `content.js`.

---

## License

MIT
