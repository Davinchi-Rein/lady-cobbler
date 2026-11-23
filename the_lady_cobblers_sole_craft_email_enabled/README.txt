# The Lady Cobbler's Sole Craft website

## Open the website
1. Download and extract this project folder.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Keep `styles.css`, `script.js` and the `assets` folder in the same project folder.

## Brand details already added
- Logo: `assets/lady-cobblers-logo.jpeg`
- WhatsApp: +234 816 226 5796
- TikTok: @the.lady.cobbler
- Colours: cream `#FDFBF7`, chestnut `#8B5A2B`, charcoal `#1A1A1A`
- Locations: Ogba, Lagos and Bishop's Court Junction, near Imo State University, Imo State.

## Add your own gallery photos and videos permanently
The gallery is intended to showcase the shoes, palms and sandals you make. The gallery upload button currently previews selected photos/videos in the browser session. It does not upload files to a public server, so visitors on other devices will not see those previews.

To add media permanently to the website:
1. Copy your photos and short videos into `assets/gallery/`.
2. Open `index.html` in VS Code.
3. Find the `<div class="gallery-grid" id="galleryGrid">` section.
4. Duplicate one of the `<figure class="gallery-item"...>` blocks and change the image path and caption. For a video, use a `<video controls playsinline>` element instead of `<img>`.

Example image:
```html
<figure class="gallery-item" data-category="shoes">
  <img src="assets/gallery/my-shoe-photo.jpg" alt="Description of the shoe">
  <figcaption><span>FOOTWEAR</span><strong>My new design</strong></figcaption>
</figure>
```

Example short video:
```html
<figure class="gallery-item" data-category="process">
  <video src="assets/gallery/my-work-video.mp4" controls playsinline muted></video>
  <figcaption><span>BEHIND THE CRAFT</span><strong>Watch the process</strong></figcaption>
</figure>
```

Use category values `shoes`, `leather`, or `process`. Uploading new media for all website visitors requires publishing the updated files to your hosting service. A true public upload dashboard needs a backend or a connected media-storage service.

## Important before publishing
- Replace the sample stock photos in the gallery and hero with the business's own work where possible.
- Confirm the exact branch address details and opening hours.
- Add a business email address if you want one displayed.
- The contact/booking form opens WhatsApp with a pre-filled message; it does not store bookings in a database.


EMAIL + WHATSAPP FORM SETUP
The booking form sends enquiries to sharon.nnanna2005@gmail.com using FormSubmit's AJAX endpoint and opens WhatsApp to +2348162265796.
IMPORTANT FIRST-TIME ACTIVATION: After the site is running from a web server, submit one test enquiry. Check the inbox for sharon.nnanna2005@gmail.com (and Spam/Junk) for FormSubmit's activation email, then click its activation/confirm link. Email delivery will not work until this is confirmed.
For local testing, open the project folder in Visual Studio Code and use the Live Server extension; do not open index.html as a file:// page. Test the form again after activation.
The email form uses a third-party service (FormSubmit); review its privacy terms before publishing.
