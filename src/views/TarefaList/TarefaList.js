import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TarefasToolbar, TarefasTable } from './components';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState([]);

  const headers = { 'x-tenant-id' : 'yagomilano92@gmail.com' }

  useEffect(() => {
    listarTarefas();
  }, []);

  const salvar = (tarefa) => {
    api.post('/tarefas', tarefa, { headers })
      .then(response => {
        const novaTarefa = response.data;
        setTarefas([...tarefas, novaTarefa]);
      }).catch(erro => {
        console.log(erro);
      });
  }

  const listarTarefas = () => {
    api.get('/tarefas', { headers })
      .then(response => {
        const listaDeTarefas = response.data;
        console.log(response.data);
        setTarefas(listaDeTarefas);
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefaList;
