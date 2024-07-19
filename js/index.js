(() => {
  let posicion = 0;
  let siguiente = document.querySelector(".carrousel__siguiente");
  let anterior = document.querySelector(".carrousel__anterior");
  const carrouselBtn = document.querySelectorAll(".carrousel__btn");
  let carrouselContainer = document.querySelector(".carrousel__elementos");

  const desplazarContainer = () => {
    carrouselContainer.style.transform = `translateX(-${
      posicion * (100 / 3)
    }%)`;
    carrouselBtn.forEach(activeBtnSliderdHandler);
  };

  const positionMove = (movimiento) => {
    if (movimiento === 1) {
      posicion++;
      if (posicion >= 3) {
        posicion = 0;
      }
    }
    if (movimiento === -1) {
      posicion--;
      if (posicion < 0) {
        posicion = 2;
      }
    }

    desplazarContainer();
  };

  siguiente.addEventListener("click", function () {
    positionMove(1);
  });

  anterior.addEventListener("click", function () {
    positionMove(-1);
  });

  carrouselBtn.forEach(function (each, i) {
    carrouselBtn[i].addEventListener("click", function () {
      posicion = i;
      desplazarContainer();
    });
  });

  setInterval(() => {
    //positionMove(1)
  }, 3000);

  const activeBtnSliderdHandler = (item, index) => {
    console.log("posicion:" + posicion);
    console.log("index:" + index);
    index !== posicion
      ? carrouselBtn[index].classList.remove("carrousel__btn--active")
      : carrouselBtn[index].classList.add("carrousel__btn--active");
  };

  /* MENU RESPONSIVE */

  const headerMenuIcon = document.querySelector(".header__menu--icon")
  const headerNav = document.querySelector(".header__nav")

  headerMenuIcon.addEventListener("click", function () {
    if (headerNav.classList.contains("isActive")) {
     
        headerNav.classList.remove("isActive")
        
      
      headerNav.classList.add("closed")
    } else {
      headerNav.classList.remove("closed")
      headerNav.classList.add("isActive")
    }

    headerMenuIcon.classList.toggle("change")
})



 /* Boton de ir arriba */
const goTopBtn = document.getElementById("goTopBtn")

// Cuando el usuario se desplaza hacia abajo 20px desde la parte superior de la página, muestra el botón
window.onscroll = function() {
    scrollFunction()
}

const scrollFunction=()=> {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        goTopBtn.style.display = "block"
    } else {
        goTopBtn.style.display = "none"
    }
}

// Cuando el usuario hace clic en el botón, desplázate hacia arriba de la página
goTopBtn.addEventListener("click",  ()=>  topFunction())

const topFunction=()=> {
    document.body.scrollTop = 0 // Para Safari
    document.documentElement.scrollTop = 0 // Para Chrome, Firefox, IE y Opera
}


    /* Tabs */
    const tabsBtns=document.querySelectorAll('.descripcion__btn')
    const tabsPs=document.querySelectorAll('.descripcion__p')
    tabsBtns.forEach(function(eachBtn,index){
        tabsBtns[index].addEventListener('click',function(){
            tabsPs.forEach(function(eachP,index){
                tabsPs[index].classList.remove('isActive')
                tabsBtns[index].classList.remove('isActive')
            })
            tabsPs[index].classList.add('isActive')
            tabsBtns[index].classList.add('isActive')
        })
    })


  
})()
