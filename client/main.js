document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      const response = await fetch("http://localhost:6000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        alert("Thank you for contacting us. We’ll get back to you soon!");
        this.reset();
      } else {
        const data = await response.json();
        alert(
          "Failed to send message: " + (data.error || "Please try again later.")
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  });
