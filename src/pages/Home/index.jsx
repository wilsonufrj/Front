import axios from 'axios'
import { Button, Card, Calendar, InputText, Menubar, classNames } from 'primereact'
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import React, { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form';

import api from '../../services/api';
import { useEffect } from 'react';

export default function Home() {
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');
  const [coast, setCoast] = useState('');
  const op = useRef(null);
  const [formData, setFormData] = useState({});
  const defaultValues = {
    title: '',
    zipCode: '',
    cost: coast,
    deadline: null,
  }


  useEffect(() => {
    getProjects()
  }, [])


  const getProjects = () => {
    api.get("/projects")
      .then(response => {
        setMainData(response.data)
        setLoading(false)
      })
  }
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setFormData(data);
    setDisplayResponsive(false)
    let dataRequest = {
      title: data.title,
      zip_code: data.zipCode,
      cost: data.cost,
      done: false,
      username: 'waramos97',
      deadline: new Date(data.deadline).toISOString(),
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString()
    }
    api.post('/projects', dataRequest, {
      headers: {
        Authorization: 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYWluZG9jZSIsImV4cCI6MTY2NjI0OTI5N30.2f1DMZryiP9u597dcO3acOBeYOfA-eFf1wfIEU6PQOlH4Dw9yCmB-HqARdxPCo6THEvlRXTFjlcdnXCSMY3LzA')
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e)
      })
    reset();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const formatDate = (date) => {
    let dateFormated = new Date(date);
    return `${dateFormated.getDay()} / ${dateFormated.getUTCMonth()} / ${dateFormated.getFullYear()} `;
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


  const items = [
    {
      label: 'Project',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            onClick('displayModal')
          }
        },
      ]
    },

    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        //Fazer logout
      }
    }
  ];

  const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;


  const footer = (id) => {
    return (
      <span>
        <Button onClick={() => console.log("Marcar projeto como feito")} className='p-button-success' label="Done" icon="pi pi-check" style={{ marginRight: '.25em' }} />
        <Button onClick={() => console.log("Pegar informacao")} className='p-button-info' icon="pi pi-pencil" style={{ marginRight: '.25em' }} />
        <Button onClick={() => console.log("Deletar um projeto")} className='p-button-danger' icon="pi pi-trash" style={{ marginRight: '.25em' }} />
      </span>
    )
  }

  const markDone = (id) => {
    api.patch(`${id}/done`)
      .then(response => {
        console.log(response.data)
      })
  }


  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} />
      </div>
      <div className='mainDashboard'>
        <Dialog visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '27vw' }}>
          <div>
            <div className="form-demo">
              <div className="flex justify-content-center">
                <div className="card">
                  <h1 className="text-center">Create Project</h1>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="field">
                      <span className="p-float-label">
                        <Controller name="title" control={control} rules={{ required: 'Title is required.' }} render={({ field, fieldState }) => (
                          <InputText id={field.title} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="title" className={classNames({ 'p-error': errors.name })}>Title</label>
                      </span>
                      {getFormErrorMessage('title')}
                    </div>

                    <div className="field">
                      <span className="p-float-label">
                        <Controller name="zipCode" control={control} rules={{ required: 'Zip code is required.' }} render={({ field, fieldState }) => (
                          <InputMask mask="99999-999" id={field.zipCode} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="zipCode" className={classNames({ 'p-error': errors.name })}>Zip Code</label>
                      </span>
                      {getFormErrorMessage('name')}
                    </div>

                    <div className="field">
                      <span className="p-float-label">
                        <Controller name="cost" control={control} rules={{ required: 'Cost is required.' }} render={({ field, fieldState }) => (
                          <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" value={field.cost} onChange={(e) => field.onChange(e.value)} className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )} />
                        <label htmlFor="cost" className={classNames({ 'p-error': errors.name })}>Cost</label>
                      </span>

                      {getFormErrorMessage('cost')}
                    </div>

                    <div className="field">
                      <span className="p-float-label">
                        <Controller name="deadline" control={control} render={({ field }) => (
                          <Calendar id={field.deadline} baseZIndex={1101} value={field.deadline} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                        )} />
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
        {loading === true ? <p>Loading...</p>
          : mainData.map((value, index) => {
            let tempData = {
              title: "",
              zip_code: "",
              deadline: "",
            }
            return (
              <div key={index}>
                <Card title={value.title}
                  subTitle={value.username}
                  style={{ margin: "2rem 1rem 2rem 1rem", width: '15rem', marginBottom: '2em' }} footer={footer(value.id)}>
                  {formatDate(value.deadline)}
                </Card>
              </div>)
          })
        }
      </div>
    </div>
  )
}
