self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(clients.claim()));
// TODO: Fetch eventListener to cahce requests and server cached response
