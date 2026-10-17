/**
 * Opens a link in a new tab the way a real click would, which mobile browsers and
 * WhatsApp deep links handle more reliably than window.open().
 */
export function openExternal(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
