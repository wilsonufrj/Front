import { Button, Fieldset } from "primereact";
import { useState } from "react";

const InfoProject = ({data}) => {
    const [state, setState] = useState(true)
    console.log(data)
    
    return (
      <Fieldset legend={data} toggleable={true} collapsed={state} onToggle={() => setState(!state)}>
        <Button onClick={() => console.log("Marcar projeto como feito")} className='p-button-success' label="Done" icon="pi pi-check" style={{ marginRight: '.25em' }} />
        <Button onClick={() => console.log("EDITAR")} className='p-button-info' icon="pi pi-pencil" style={{ marginRight: '.25em' }} />
        <Button onClick={() => console.log("Deletar um projeto")} className='p-button-danger' icon="pi pi-trash" style={{ marginRight: '.25em' }} />
  
      </Fieldset>
    )
  }

  export default InfoProject;