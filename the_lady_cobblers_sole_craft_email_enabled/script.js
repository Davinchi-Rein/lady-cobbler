const WHATSAPP_NUMBER = "2348162265796";
const BUSINESS_EMAIL = "sharon.nnanna2005@gmail.com";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll("#galleryGrid .gallery-item").forEach(item => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  });
});

document.querySelectorAll(".card-link").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("serviceChoice").value = link.dataset.service;
  });
});

const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const service = document.getElementById("serviceChoice").value;
  const details = document.getElementById("requestDetails").value.trim();
  const message = `Hello The Lady Cobbler's Sole Craft,\n\nI'd like to make an order/enquiry.\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "Not provided"}\nService: ${service}\nDetails: ${details || "Not provided"}\n\nPlease let me know the next steps.`;

  // Open WhatsApp directly from the user's click so browsers do not block the new tab.
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

  const status = document.getElementById("formStatus");
  const submitButton = document.getElementById("bookingSubmit");
  status.textContent = "Sending your enquiry by email…";
  submitButton.disabled = true;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${BUSINESS_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        service,
        details: details || "Not provided",
        _subject: `New website enquiry: ${service}`,
        _template: "table"
      })
    });
    const result = await response.json();
    if (String(result.success) !== "true") {
      throw new Error(result.message || "The email service could not accept the request.");
    }
    status.textContent = "Your enquiry has been emailed successfully. WhatsApp has also opened—tap Send there to message us.";
    bookingForm.reset();
  } catch (error) {
    status.textContent = `We couldn't confirm the email submission. Please send the message in the WhatsApp tab that opened, or try again. (${error.message})`;
  } finally {
    submitButton.disabled = false;
  }
});

// This uploader previews selected files in the current browser session only.
document.getElementById("mediaUpload").addEventListener("change", event => {
  const files = Array.from(event.target.files || []);
  const grid = document.getElementById("uploadedGrid");
  files.forEach(file => {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) return;
    const figure = document.createElement("figure");
    figure.className = "gallery-item uploaded-item";
    const url = URL.createObjectURL(file);
    let media;
    if (file.type.startsWith("video/")) {
      media = document.createElement("video");

      media.controls = true;
      media.playsInline = true;
      media.muted = true;

      // Automatically play the video
      media.autoplay = true;

      // Repeat the video continuously
      media.loop = true;
    }
    media.src = url;
    const caption = document.createElement("figcaption");
    const type = document.createElement("span");
    type.textContent = file.type.startsWith("video/") ? "VIDEO PREVIEW" : "PHOTO PREVIEW";
    const title = document.createElement("strong");
    title.textContent = file.name;
    caption.append(type, title);
    figure.append(media, caption);
    grid.prepend(figure);
  });
  event.target.value = "";
});
