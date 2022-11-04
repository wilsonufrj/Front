import { Button, Card, Calendar, InputText, Menubar, classNames, Fieldset } from 'primereact'
import { Dialog } from 'primereact/dialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import React, { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form';

import api from '../../services/api';
import { useEffect } from 'react';
import { logout } from '../../actions/actionLogin.js';
import { getProjects, createProject, getInfoProject } from '../../actions/actionProject';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import InfoProject from '../../components/InfoProject';

const Home = (props) => {
  const navigate = useNavigate();
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');
  const [coast, setCoast] = useState('');
  const [formData, setFormData] = useState({});
  const defaultValues = {
    title: '',
    zipCode: '',
    cost: coast,
    deadline: null,
  }


  useEffect(() => {
    if (props.loginState.username === null && props.loginState.authenticated === false) {
      navigate("/")
    }else{
      props.getProjects(props.loginState.username)
    }
  }, [props.loginState])


  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setFormData(data);
    setDisplayResponsive(false)
    let dataRequest = {
      title: data.title,
      zip_code: data.zipCode,
      cost: data.cost,
      done: false,
      deadline: new Date(data.deadline).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    props.createProject(props.loginState.username, dataRequest)
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
        props.logout()
      }
    }
  ];



  const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;


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
                          <InputMask mask="99999999" id={field.zipCode} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
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

        <div className='grid'>
          {props.projectState.loading === true ? <p>Loading...</p>
            : props.projectState.listProject.map((value, index) => {
              return (
                <div className='col-12 md:col6 lg:col-3' key={index}>
                  <InfoProject data={value}/>
                </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateProps = (state) => {
  return {
    loginState: state.loginReducer,
    projectState: state.projectReducer
  }
}

const mapDispacthToProps = {
  logout,
  getProjects,
  createProject,
  getInfoProject
}

export default connect(mapStateProps, mapDispacthToProps)(Home)

