(() => {
  /* Tabs */
  const descripcion=document.querySelector('.descripcion')
  const tabsBtns = descripcion.querySelectorAll(".descripcion__btn");
  const tabsPs = descripcion.querySelectorAll(".descripcion__texto");
  const tabWrapper=descripcion.querySelector('.descripcion__wrapper')
  const titulo_receta=descripcion.querySelector('.descripcion__titulo')
  tabsBtns.forEach(function (eachBtn, index) {
    tabsBtns[index].addEventListener("click", function () {
      tabsPs.forEach(function (eachP, index) {
        tabsPs[index].classList.remove("isActive");
        tabsBtns[index].classList.remove("isActive");

      });
      tabWrapper.scrollTo({
        top: 0,
        behavior: 'smooth' // El scroll será suave
      });
      
      tabsPs[index].classList.add("isActive");
      tabsBtns[index].classList.add("isActive");
    });
  });

  // JSON con las recetas (por ejemplo, Hamburguesas Caseras y Enchiladas de Pollo)

  /* CArga datos ddel Json */
  document.addEventListener("DOMContentLoaded", () => {
    loadData();
  });

  let jsonData = [];
  let dataFiltrada = [];
  let contenido = "";
  let itemsList;
 

  const loadData = async () => {
    try {
      const response = await fetch("../js/data/recetas-y-preparacion.json");
      jsonData = await response.json();
      dataFiltrada = await filterData();
      await displayData();
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };

  const desplegaContenidoHandler = (item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item}`;
    itemsList.appendChild(listItem);
  }

  const displayData = () => {    
      if(typeof dataFiltrada === 'object'){
        titulo_receta.innerHTML=dataFiltrada.title
        itemsList = document.getElementById('descripcion__receta');
        itemsList.innerHTML = "";    
        dataFiltrada.ingredientes.forEach(desplegaContenidoHandler);
        itemsList = document.getElementById('descripcion__preparacion');
        itemsList.innerHTML = "";      
        dataFiltrada.preparacion.forEach(desplegaContenidoHandler);
        itemsList = document.getElementById('descripcion__tips');
        itemsList.innerHTML = "";      
        dataFiltrada.tips.forEach(desplegaContenidoHandler);
      }else{
        itemsList = document.getElementById('descripcion__receta');
        itemsList.innerHTML = "<li>No se encontró la información de la receta, preparación y tips, consulte en unos minutos</li>";    
      }
     
  }

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
  

  /* Filtra por el nombre de la receta para obtener los demas datos de la receta */
  const filterData = () => {
    const searchReceta = getNombreReceta();
    return jsonData.find(
      (recipe) => recipe.title.toLowerCase() === searchReceta.replace(/-/g, " ")
    );
  };

  /* retorna valor del nombre de la receta de la URL */
  const getNombreReceta = () => {
    const url = window.location.href;
    const urlObjecto = new URL(url);
    // Obtener los parámetros de consulta
    const params = new URLSearchParams(urlObjecto.search);
    // Acceder a los valores de los parámetros

    return params.get("plato");
  };

  /* EL siguiente es evento con el que se calcula el ancho de la pantalla y a partir de esta informacion se carga la imagen que corresponde segun la resolucion */

  document.addEventListener("DOMContentLoaded", () => {
    const picture = document.getElementById('descripcion__picture');
    const sourceWebp = document.getElementById('descripcion__webp');
    const sourceJpg = document.getElementById('descripcion__jpg');
    const mainImg = document.getElementById('descripcion__img');
    const nameReceta = getNombreReceta();
    console.log(nameReceta)
    

    // Define las resoluciones de la pantalla
    const images = {
        webp: {
            small: '../../assets/recetas/'+nameReceta+'-400px.webp',
            medium: '../../assets/recetas/'+nameReceta+'-600px.webp',
            large: '../../assets/recetas/'+nameReceta+'-800px.webp',
            xLarge: '../../assets/recetas/'+nameReceta+'.webp'
        },
        jpg: {
            small: '../../assets/recetas/'+nameReceta+'-400px.jpg',
            medium: '../../assets/recetas/'+nameReceta+'-600px.jpg',
            large: '../../assets/recetas/'+nameReceta+'-800px.jpg',
            xLarge: '../../assets/recetas/'+nameReceta+'.jpg'
        }
    };

    // Selecciona la Imagen que corresponde segun la resolucion de la pantalla
    const setImageSource = () => {
        let screenWidth = window.innerWidth;

        if (screenWidth < 600) {
            sourceWebp.srcset = images.webp.small;
            sourceJpg.srcset = images.jpg.small;
            mainImg.src = images.jpg.small;
        } else if (screenWidth < 1200) {
            sourceWebp.srcset = images.webp.medium;
            sourceJpg.srcset = images.jpg.medium;
            mainImg.src = images.jpg.medium;
        } else {
            sourceWebp.srcset = images.webp.large;
            sourceJpg.srcset = images.jpg.large;
            mainImg.src = images.jpg.large;
        }
    };

    // Setea la resolucion inicial de la pantalla
    setImageSource();

    // Actualiza la imagen al hacer rezise
    window.addEventListener('resize', setImageSource);
});



})();
