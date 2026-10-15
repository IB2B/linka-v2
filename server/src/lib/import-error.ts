// An import failure whose message is written for the user (bad link, page
// unreadable). Anything else thrown during an import is internal and must not
// reach the browser.
export class ImportError extends Error {}
