
# Eduardo Portfolio (Static)

Open the HTML files in a browser (or use VS Code Live Server).

## Replace placeholders
- Put your real PDF at `assets/resume.pdf` (overwriting the placeholder).
- Replace images in `assets/images/` with your real assets (filenames kept the same),
  or update paths used in `script.js`.

## Add more slides
In `script.js`, extend the `galleries` object for each project key.

## Update Featured Work (Graphic Design)

The Featured Work rail on `graphic.html` is driven by:

- `assets/data/graphic-featured-projects.json`

Edit that JSON to add, remove, or reorder projects.

### Project fields

Each entry in `projects` supports:

- `id` (string)
- `title` (string)
- `tag` (string)
- `thumb` (string) – image used for the rail card
- `alt` (string) – alt text for the rail image (defaults to `title`)
- `images` (string[]) – optional modal gallery; if omitted, the modal uses `thumb`

Paths are relative to the site root (same level as `graphic.html`), e.g. `assets/images/my_project_1.jpg`.

## Preview locally

Run a local static server and open `http://localhost:8000/graphic.html`.

```sh
python3 -m http.server 8000
