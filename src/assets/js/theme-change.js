document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
  
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
  
      if (currentTheme === 'dark' && toggleSwitch) {
        toggleSwitch.checked = true;
      }
    }
  
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        // switchTextColor('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        // switchTextColor('light');
      }
    }
  
    // function switchTextColor(currTheme) {
    //   const ids = [
    //     "swiper-container-h1",
    //     "details-h3-1",
    //     "details-h3-2",
    //     "details-h3-3",
    //     "details-h3-4",
    //     "details-h3-5",
    //     "details-h3-6"
    //   ];
  
    //   ids.forEach(id => {
    //     const element = document.getElementById(id);
    //     if (element) {
    //       element.style.color = currTheme === 'light' ? 'black' : 'white';
    //     }
    //   });
    // }
  
    if (toggleSwitch) {
      toggleSwitch.addEventListener('change', switchTheme, false);
    } else {
      console.error('Toggle switch element not found');
    }
  });
  