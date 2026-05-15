// ==========================
// WHATSAPP COM MENSAGEM AUTOMÁTICA
// ==========================
function openWhatsApp(type) {

  const base = "https://wa.me/5545998257629?text=";

  const messages = {
    simples: "Olá! Quero um site Starter (R$150).",
    completo: "Olá! Quero um site Business (R$350).",
    saas: "Olá! Quero um sistema SaaS completo (R$650)."
  };

  const msg = encodeURIComponent(messages[type] || "Olá! Quero um orçamento.");

  window.open(base + msg, "_blank");
}

// ==========================
// HOVER SUAVE NOS CARDS
// ==========================
document.querySelectorAll(".card").forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });

});

// ==========================
// SCROLL SUAVE (MENU)
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });

});

// ==========================
// FEEDBACK VISUAL EM LINKS SOCIAIS
// ==========================
document.querySelectorAll(".social-card").forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });

});