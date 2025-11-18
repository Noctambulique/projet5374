const images = [
      'assets/images/D hiver/A1.png',
      'assets/images/D hiver/A2.png',
      'assets/images/D hiver/A3.png',
      'assets/images/D hiver/A4.png',
      'assets/images/D hiver/A5.png'
    ];

    const display = document.getElementById('display');
    const dots    = document.querySelectorAll('.dot');

    function showImage(n){
      if(images[n-1]) display.src = images[n-1];
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const n = Number(dot.dataset.img);
        showImage(n);
      });
    });

    // image initiale
    showImage(1);
