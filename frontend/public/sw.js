// public/sw.js
//
// Corre aparte de la pestaña del navegador — por eso puede mostrar
// notificaciones aunque la pestaña esté cerrada o la pantalla apagada
// (con el navegador corriendo en segundo plano).

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { title: "Nuevo pedido", body: event.data.text() };
  }

  const title = payload.title || "Nuevo pedido";
  const options = {
    body: payload.body || "",
    icon: payload.icon || "/images/logo-galana.jpeg",
    badge: payload.badge || "/images/logo-galana.jpeg",
    data: payload.data || {},
    tag: "nuevo-pedido", // agrupa notificaciones seguidas en una sola
    renotify: true, // pero sí vibra/suena de nuevo cada vez
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(title, options),
      // Avisa a las pestañas abiertas del panel para que suene la alerta al instante
      self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((list) =>
          list.forEach((c) => c.postMessage({ type: "nuevo-pedido" })),
        ),
    ]),
  );
});

// Al tocar la notificación, abre (o enfoca) el panel de pedidos
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/admin/pedidos";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsList) => {
        for (const client of clientsList) {
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      }),
  );
});
