import { Button, Calendar, Dialog, Fieldset, InputMask, InputNumber, InputText } from "primereact";
import { useState } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { connect } from 'react-redux'
import { deleteProject } from "../actions/actionProject";
import api from "../services/api";



const InfoProject = ({ data, username,deleteProject}) => {
  const [state, setState] = useState(true)
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ title: data.title })

  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');


  const onSubmit = (e) => {
    e.preventDefault()
    api.put(`projects/${info.id}`, info,
      {
        headers: {
          'username': username
        }
      }).then((response) => {
        setInfo({ ...info, ...response.data })
        setLoading(false)
      })
    setLoading(true)
    setDisplayResponsive(false)
  };

  const getInfo = async (id) => {

    setState(!state)
    setLoading(true)
    await api.get(`/projects/${id}`)
      .then(response => {
        setInfo({...response.data})
        setLoading(false)
      })

  }

  const formatDate = (date) => {
    let auxDate = new Date(date)
    return `${auxDate.toLocaleString('pt-br')}`
  }

  const onHide = (name) => {
    setDisplayResponsive(false);
  }


  const onClick = (name, position) => {
    setDisplayResponsive(true);

    if (position) {
      setPosition(position);
    }
  }

  const completeProject = (id,username)=>{
    api.patch(`/projects/${id}/done`,{...info,done:true},{
      headers:{
        "username":username
      }
    })
    .then((response)=>{
      if(response.status == 200){
        setInfo({...info,done:response.data})
      }
    })
  }

  return (
    <>
      <Dialog visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '27vw' }}>
        <div>
          <div className="form-demo">
            <div className="flex justify-content-center">
              <div className="card">
                <h1 className="text-center">Create Project</h1>
                <form onSubmit={onSubmit} className="p-fluid">
                  <div className="field">
                    <span className="p-float-label">
                      <InputText autoFocus value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} />
                      <label htmlFor="title">Title</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <InputMask mask="99999999" value={info.zip_code} onChange={(e) => setInfo({ ...info, zip_code: e.target.value })} />
                      <label htmlFor="zipCode" />
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <InputNumber inputId="currency-us" mode="currency" currency="BRL" locale="pt-BR" value={info.cost} onChange={(e) => setInfo({ ...info, cost: e.value })} />
                      <label htmlFor="cost">Cost</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Calendar value={info.deadline} onChange={(e) => setInfo({ ...info, deadline: e.target.value })} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                      <label htmlFor="deadline">Deadline</label>
                    </span>
                  </div>

                  <Button type="submit" label="Salvar" className="mt-2" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Fieldset legend={info.title} toggleable={true} collapsed={state} onToggle={() => getInfo(data.id)}>
        {loading ?<ProgressSpinner/> : <div>
          <div>
            <span className="font-bold text-5xl">{info.city}-{info.state}</span>
            <p className="font-medium text-3xl mt-0 mb-2">
              {
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(info.cost)
              }
            </p>
          </div>
          <div>
            <p className="mt-0 mb-0 text-500"><span className="font-bold text-900">Created:</span>  {formatDate(info.created_at)}</p>
            <p className="mt-0 mb-0 text-500"><span className="font-bold text-900">Updated:</span>  {formatDate(info.updated_at)}</p>
            <p className="mt-0 mb-0 text-500"><span className="font-bold text-900">Deadline:</span> {formatDate(info.deadline)}</p>
          </div>
          <div className="mt-2 mb-0 line-height-3">
            {info.done?<div className="grid bt-2 ">
              <div className="mb-0 bg-green-500 border-round mr-2 col-10 ">
                <span className="font-bold text-900">Project Complete </span>
              </div>
              <Button onClick={() => deleteProject(info.id,username)} className='p-button-danger col-1' icon="pi pi-trash" style={{ marginRight: '.25em' }} />
            </div>:<>
            <Button onClick={() => completeProject(info.id,username)} className='p-button-success' label="Done" icon="pi pi-check" style={{ marginRight: '.25em' }} />
            <Button onClick={() => onClick()} className='p-button-info' icon="pi pi-pencil" style={{ marginRight: '.25em' }} />
            <Button onClick={() => deleteProject(info.id,username)} className='p-button-danger' icon="pi pi-trash" style={{ marginRight: '.25em' }} />
            </>}
          </div>
        </div>
        }
      </Fieldset>
    </>
  )
}

const mapStateProps = (state) => {
  return {
    
  }
}

const mapDispacthToProps = {
  deleteProject
}


export default connect(mapStateProps,mapDispacthToProps)(InfoProject);