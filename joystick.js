let joystick = document.createElement('div');
joystick.id = 'joystick';
document.body.appendChild(joystick);

let joyX = 0, joyY = 0;
joystick.addEventListener('touchmove', function(e) {
  const touch = e.touches[0];
  const rect = joystick.getBoundingClientRect();
  joyX = (touch.clientX - rect.left - 50) / 50;
  joyY = (touch.clientY - rect.top - 50) / 50;
});

setInterval(() => {
  const speed = 0.07;
  player.position.x += joyX * speed;
  player.position.z += joyY * speed;
}, 16);
