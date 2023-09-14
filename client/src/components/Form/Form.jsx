import style from "./Form.module.css"

const Form = () => {
    return (
      <>
      <div className={style.create}> 
      <h3>Crear actividades.</h3>
        <form action="" onSubmit={(e) => {e.preventDefault()}}>
          <label htmlFor="gameName">Nombre: </label>
          <input type="text" id="gameName" placeholder="Una actividad..." />
          <label htmlFor=""></label>
          <button>Crear actividad</button>
        </form>
     </div>
      </>
    );
  };
  
  export default Form;