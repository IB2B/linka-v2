export const THEME_STORAGE_KEY = "theme";

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var k="${THEME_STORAGE_KEY}";var t=localStorage.getItem(k)||"dark";var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;document.documentElement.classList.toggle("dark",r==="dark");}catch(e){}})();`;
