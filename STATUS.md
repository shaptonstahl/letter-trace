# Status

Live: <https://haptonstahl.org/letter-trace/>
Repo: <https://github.com/shaptonstahl/letter-trace> (MIT)
Deployed to: `hap.org:~/public_html/letter-trace/` — `index.html`, `sw.js`, `preview.png`

Built for LucyAnn's class (1st–3rd grade). As of 2026-11-20 it has hand-built
stroke data for `A–Z`, `a–z`, `0–9`; pickers for one letter, a typed word,
A–Z, 0–9, 106 curated common words, and a teacher list; play/pause/step/replay;
a trace mode with feedback; a settings panel (pencil speed, guide lines); the
case switch on the main screen; `case`, `guides`, `speed` and `words` carried in
the URL; and offline support from service worker `letter-trace-v4`.

## Open questions

### Waiting on LucyAnn

- **T1 — devices.** Which hardware the class uses. If it includes iPads, do a
  WebKit pass before students touch it (all iOS browsers are WebKit; this has
  only been tested in Chromium).
- **D2 — handwriting program.** D'Nealian/pre-cursive, Zaner-Bloser, Handwriting
  Without Tears, or generic print? Would retune the `e`, `a`, `G`, `K` shapes and
  some stroke orders. Highest-value pedagogical answer.
- **D3 — word list.** Swap the 106 curated common words for her curriculum's list
  (Fundations trick words, Dolch, Fry, CKLA)?
- **D4 — print worksheet.** A printable tracing page for the current word.
  Deliberately left out of v1; add if she wants paper.
- **D6 — A–Z capitals.** Should the A–Z tab always show capitals instead of
  following the `abc`/`Abc`/`ABC` switch?

### Stephen's calls

- **D1 — default speed.** After a classroom trial: keep `normal` (≈6 s for
  "cat"), or make `slow` (≈8.5 s) the default?
- **D5 — audio.** A letter-name voice toggle, off by default, or stay silent?
- **D8 — shared-link semantics.** A `?words=` link overwrites the receiver's
  saved "My words" list and leaves the link's settings on the device. Keep that
  (a link is a complete setup), or apply link values for the session only?
- **D7 — attribution.** Add an explicit kid-texto line to the README for where
  the vocabulary came from.
- **D9 — discoverability.** Link the tool from haptonstahl.org or the kid-texto
  page so it can be found without the URL.

## Deploy

```sh
rsync -av --delete index.html sw.js preview.png hap.org:public_html/letter-trace/
```

Bump `CACHE` in `sw.js` whenever `index.html` changes.
