// joystick.js

class VirtualJoystick {
  constructor(containerId, callback) {
    this.container = document.getElementById(containerId);
    this.callback = callback;
    this.active = false;
    this.center = { x: 0, y: 0 };
    this.touchId = null;

    this.stick = document.createElement("div");
    this.stick.style.width = "60px";
    this.stick.style.height = "60px";
    this.stick.style.background = "rgba(255,255,255,0.6)";
    this.stick.style.borderRadius = "50%";
    this.stick.style.position = "absolute";
    this.stick.style.left = "20px";
    this.stick.style.top = "20px";
    this.stick.style.transform = "translate(-50%, -50%)";
    this.container.appendChild(this.stick);

    this.container.addEventListener("touchstart", this.start.bind(this));
    this.container.addEventListener("touchmove", this.move.bind(this));
    this.container.addEventListener("touchend", this.end.bind(this));
  }

  start(event) {
    const touch = event.changedTouches[0];
    this.touchId = touch.identifier;
    this.center = { x: touch.clientX, y: touch.clientY };
    this.stick.style.left = `${touch.clientX}px`;
    this.stick.style.top = `${touch.clientY}px`;
    this.active = true;
  }

  move(event) {
    if (!this.active) return;
    for (let touch of event.changedTouches) {
      if (touch.identifier === this.touchId) {
        const dx = touch.clientX - this.center.x;
        const dy = touch.clientY - this.center.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 40;

        const angle = Math.atan2(dy, dx);
        const limitedX = Math.cos(angle) * Math.min(maxDist, dist);
        const limitedY = Math.sin(angle) * Math.min(maxDist, dist);

        this.stick.style.left = `${this.center.x + limitedX}px`;
        this.stick.style.top = `${this.center.y + limitedY}px`;

        this.callback({ x: limitedX / maxDist, y: limitedY / maxDist });
      }
    }
  }

  end(event) {
    for (let touch of event.changedTouches) {
      if (touch.identifier === this.touchId) {
        this.stick.style.left = `20px`;
        this.stick.style.top = `20px`;
        this.callback({ x: 0, y: 0 });
        this.active = false;
      }
    }
  }
}

// Export class (optional)
window.VirtualJoystick = VirtualJoystick;
